import { createRequire } from "node:module";
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  CSP_HASH_PLACEHOLDER,
  assertProductionScriptSrc,
  buildContentSecurityPolicy,
  missingScriptHashes,
} from "./csp-policy";
import { requiredScriptHashes, stripPreviewToolbar } from "./csp-inline";

/** Stay under common proxy header limits. A larger union is split per route. */
export const CSP_HEADER_LIMIT = 7500;

const require = createRequire(path.join(process.cwd(), "package.json"));

const SKIP_DIRS = new Set(["cache", "dev", "node_modules"]);

export type HashCollection = {
  files: { file: string; hashes: string[] }[];
  hashList: string[];
  policy: string;
};

async function walk(dir: string, visit: (file: string) => Promise<void>): Promise<void> {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return;
    throw err;
  }
  for (const entry of entries) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, visit);
    else if (entry.isFile()) await visit(full);
  }
}

export async function collectInlineHashes(distDir: string): Promise<HashCollection> {
  const serverDir = path.join(distDir, "server");
  const html: string[] = [];
  await walk(serverDir, async (file) => {
    if (file.endsWith(".html")) html.push(file);
  });
  html.sort();
  if (html.length === 0) {
    throw new Error(`no prerendered HTML under ${serverDir}`);
  }

  const required = new Set<string>();
  const files: { file: string; hashes: string[] }[] = [];
  for (const file of html) {
    const body = await readFile(file, "utf8");
    const hashes = requiredScriptHashes(body);
    if (hashes.length === 0) throw new Error(`${file} has no executable inline script to hash`);
    files.push({ file, hashes });
    for (const hash of hashes) required.add(hash);
  }

  const hashList = [...required].sort();
  const policy = buildContentSecurityPolicy(hashList);
  assertProductionScriptSrc(policy);
  if (policy.includes(CSP_HASH_PLACEHOLDER)) {
    throw new Error("built policy still contains the placeholder");
  }
  return { files, hashList, policy };
}

/** Replace the placeholder in place. Returns true when a string changed. */
export function replacePlaceholder(value: unknown, hashList: string): boolean {
  const replacement = hashList;
  let changed = false;
  const visit = (current: unknown): unknown => {
    if (typeof current === "string") {
      if (!current.includes(CSP_HASH_PLACEHOLDER)) return current;
      changed = true;
      return current.split(CSP_HASH_PLACEHOLDER).join(replacement);
    }
    if (Array.isArray(current)) {
      for (let index = 0; index < current.length; index += 1) current[index] = visit(current[index]);
      return current;
    }
    if (current && typeof current === "object") {
      const record = current as Record<string, unknown>;
      for (const key of Object.keys(record)) record[key] = visit(record[key]);
    }
    return current;
  };
  visit(value);
  return changed;
}

export function policiesIn(value: unknown, found: string[] = []): string[] {
  if (typeof value === "string") {
    if (value.includes("script-src ") && value.includes("default-src ")) found.push(value);
    return found;
  }
  if (Array.isArray(value)) {
    for (const item of value) policiesIn(item, found);
    return found;
  }
  if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      if (key.toLowerCase() === "content-security-policy" && typeof item === "string") found.push(item);
      else policiesIn(item, found);
    }
  }
  return found;
}

function isSitePolicy(value: string): boolean {
  return value.includes("default-src 'self'") && value.includes("script-src ") && value.includes("frame-ancestors ");
}

/** Overwrite every copy of this site's CSP. Returns how many strings changed. */
export function rewriteSitePolicies(value: unknown, policy: string): number {
  let rewritten = 0;
  const visit = (current: unknown): unknown => {
    if (typeof current === "string") {
      if (!isSitePolicy(current) || current === policy) return current;
      rewritten += 1;
      return policy;
    }
    if (Array.isArray(current)) {
      for (let index = 0; index < current.length; index += 1) current[index] = visit(current[index]);
      return current;
    }
    if (current && typeof current === "object") {
      const record = current as Record<string, unknown>;
      for (const key of Object.keys(record)) record[key] = visit(record[key]);
    }
    return current;
  };
  visit(value);
  return rewritten;
}

export function deploymentConfigPaths(projectRoot: string, distDir: string): string[] {
  return [
    path.join(distDir, "output", "config.json"),
    path.join(projectRoot, ".vercel", "output", "config.json"),
    "/vercel/output/config.json",
  ];
}

async function patchFiles(distDir: string, hashList: string): Promise<string[]> {
  const placeholder = Buffer.from(CSP_HASH_PLACEHOLDER);
  const patched: string[] = [];
  await walk(distDir, async (file) => {
    const body = await readFile(file);
    if (!body.includes(placeholder)) return;
    const next = Buffer.from(body.toString("utf8").split(CSP_HASH_PLACEHOLDER).join(hashList));
    if (next.includes(placeholder)) throw new Error(`placeholder survived replacement in ${file}`);
    await writeFile(file, next);
    patched.push(file);
  });
  return patched;
}

/**
 * Remove the unconditional preview injector. Cookie-gated toolbar code is left in place.
 * Preview builds turn immutable assets off, so these files are deployment-scoped and the
 * stripped bytes are what gets uploaded. Renaming them would change the content hash the
 * deployer checks.
 */
export async function stripUnconditionalPreviewToolbar(root: string): Promise<string[]> {
  const strippedFiles: string[] = [];
  await walk(root, async (file) => {
    if (!file.endsWith(".js") && !file.endsWith(".html")) return;
    const body = await readFile(file, "utf8");
    if (!body.includes("https://vercel.live/_next-live/feedback/feedback.js")) return;
    const stripped = stripPreviewToolbar(body);
    if (stripped === body) return;
    await writeFile(file, stripped);
    strippedFiles.push(file);
  });
  return strippedFiles;
}

export type RoutePolicy = {
  source: string;
  regex: string;
  policy: string;
  hashes: string[];
  fallback: boolean;
};

type PathToRegexp = {
  pathToRegexp: (source: string, keys: unknown[], opts: object) => { source: string };
};

function nextSourceRegex(source: string): string {
  const ptr = require("next/dist/compiled/path-to-regexp") as PathToRegexp;
  const { modifyRouteRegex } = require("next/dist/lib/redirect-status") as {
    modifyRouteRegex: (regex: string) => string;
  };
  const { normalizeRouteRegex } = require("next/dist/lib/load-custom-routes") as {
    normalizeRouteRegex: (regex: string) => string;
  };
  const compiled = ptr.pathToRegexp(source, [], { strict: true, sensitive: false, delimiter: "/" });
  return normalizeRouteRegex(modifyRouteRegex(compiled.source));
}

/** Public pathname for a prerendered App Router HTML file, or null for error documents. */
export function pathnameForHtml(distDir: string, file: string): string | null {
  const rel = path.relative(path.join(distDir, "server"), file).replaceAll("\\", "/");
  if (!rel.startsWith("app/") || !rel.endsWith(".html")) return null;
  let route = rel.slice("app/".length, -".html".length);
  if (route === "index") return "/";
  if (route.endsWith("/index")) route = route.slice(0, -"/index".length);
  if (route.startsWith("_") || route.split("/").some((part) => part.startsWith("_"))) return null;
  return `/${route}`;
}

function excludingRegex(pathnames: string[]): string {
  const parts = pathnames.map((pathname) => {
    if (pathname === "/") return "/(?:/)?";
    return `${pathname.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/?`;
  });
  return `^(?!(?:${parts.join("|")})$)(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$`;
}

/**
 * One policy when the union fits. Otherwise each public page gets only the
 * hashes in its HTML plus the not-found and error documents, and the catch-all
 * keeps the error documents for every other URL.
 */
export function buildRoutePolicies(distDir: string, collected: HashCollection, headerLimit: number): RoutePolicy[] {
  const fallback = new Set<string>();
  const pages = new Map<string, Set<string>>();
  for (const file of collected.files) {
    const source = pathnameForHtml(distDir, file.file);
    if (!source) {
      for (const hash of file.hashes) fallback.add(hash);
      continue;
    }
    const existing = pages.get(source) ?? new Set<string>();
    for (const hash of file.hashes) existing.add(hash);
    pages.set(source, existing);
  }

  const fallbackHashes = [...fallback].sort();
  const union = new Set<string>(fallbackHashes);
  for (const hashes of pages.values()) for (const hash of hashes) union.add(hash);
  const unionPolicy = buildContentSecurityPolicy([...union].sort());
  if (Buffer.byteLength(unionPolicy) <= headerLimit) {
    return [
      {
        source: "/:path*",
        regex: nextSourceRegex("/:path*"),
        policy: unionPolicy,
        hashes: [...union].sort(),
        fallback: true,
      },
    ];
  }

  if (fallbackHashes.length === 0) {
    throw new Error("per-route CSP needs the prerendered not-found document so unknown URLs still have hashes");
  }
  const fallbackPolicy = buildContentSecurityPolicy(fallbackHashes);
  if (Buffer.byteLength(fallbackPolicy) > headerLimit) {
    throw new Error(`Content-Security-Policy fallback is ${Buffer.byteLength(fallbackPolicy)} bytes, over ${headerLimit}.`);
  }

  const rules: RoutePolicy[] = [
    {
      source: "/:path*",
      regex: nextSourceRegex("/:path*"),
      policy: fallbackPolicy,
      hashes: fallbackHashes,
      fallback: true,
    },
  ];
  for (const [source, pageHashes] of [...pages.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    const hashes = [...new Set([...pageHashes, ...fallbackHashes])].sort();
    const policy = buildContentSecurityPolicy(hashes);
    const bytes = Buffer.byteLength(policy);
    if (bytes > headerLimit) {
      throw new Error(
        `Content-Security-Policy for ${source} is ${bytes} bytes. Split hashes per route before it exceeds proxy header limits.`,
      );
    }
    rules.push({ source, regex: nextSourceRegex(source), policy, hashes, fallback: false });
  }
  return rules;
}

function cspHeaderKey(headers: Record<string, unknown>): string | null {
  for (const [key, value] of Object.entries(headers)) {
    if (key.toLowerCase() !== "content-security-policy" || typeof value !== "string") continue;
    if (value.includes(CSP_HASH_PLACEHOLDER) || isSitePolicy(value)) return key;
  }
  return null;
}

async function writeManifestPolicies(distDir: string, rules: RoutePolicy[]): Promise<void> {
  const manifestPath = path.join(distDir, "routes-manifest.json");
  const manifest = JSON.parse(await readFile(manifestPath, "utf8")) as {
    headers?: { source?: string; headers?: { key?: string; value?: string }[]; regex?: string }[];
  };
  if (!Array.isArray(manifest.headers)) throw new Error(`${manifestPath} has no headers`);
  let updated = 0;
  for (const rule of manifest.headers) {
    if (!Array.isArray(rule.headers)) continue;
    for (const header of rule.headers) {
      if (String(header.key).toLowerCase() !== "content-security-policy" || typeof header.value !== "string") continue;
      if (!header.value.includes(CSP_HASH_PLACEHOLDER) && !isSitePolicy(header.value)) continue;
      const match = rules.find((item) => item.source === rule.source) ?? (rules.length === 1 ? rules[0] : undefined);
      if (!match) throw new Error(`no CSP route policy for existing header source ${rule.source}`);
      header.value = match.policy;
      updated += 1;
    }
  }
  if (updated === 0) throw new Error(`${manifestPath} does not contain a Content-Security-Policy`);
  for (const rule of rules) {
    if (rule.fallback) continue;
    manifest.headers.push({
      source: rule.source,
      headers: [{ key: "Content-Security-Policy", value: rule.policy }],
      regex: rule.regex,
    });
  }
  const serialised = JSON.stringify(manifest);
  if (serialised.includes(CSP_HASH_PLACEHOLDER)) throw new Error(`CSP placeholder is still in ${manifestPath}`);
  await writeFile(manifestPath, serialised);
}

function publishRouting(routing: unknown, rules: RoutePolicy[]): void {
  if (!routing || typeof routing !== "object") throw new Error("Deployment routing has no script-src policy to publish");
  const before = (routing as { beforeMiddleware?: unknown }).beforeMiddleware;
  if (!Array.isArray(before)) throw new Error("Deployment routing has no script-src policy to publish");
  const headerKey = before.reduce<string | null>((found, route) => {
    if (found || !route || typeof route !== "object") return found;
    const headers = (route as { headers?: unknown }).headers;
    if (!headers || typeof headers !== "object" || Array.isArray(headers)) return found;
    return cspHeaderKey(headers as Record<string, unknown>);
  }, null);
  if (!headerKey) throw new Error("Deployment routing has no script-src policy to publish");

  let updated = 0;
  for (const route of before) {
    if (!route || typeof route !== "object") continue;
    const record = route as { source?: string; sourceRegex?: string; headers?: Record<string, string> };
    if (!record.headers) continue;
    const key = cspHeaderKey(record.headers);
    if (!key) continue;
    const match = rules.find((item) => item.source === record.source) ?? (rules.length === 1 ? rules[0] : rules.find((item) => item.fallback));
    if (!match) throw new Error(`no CSP route policy for routing source ${record.source ?? "(none)"}`);
    record.headers[key] = match.policy;
    if (match.fallback && rules.some((item) => !item.fallback)) {
      record.sourceRegex = excludingRegex(rules.filter((item) => !item.fallback).map((item) => item.source));
    }
    updated += 1;
  }
  if (updated === 0) throw new Error("Deployment routing has no script-src policy to publish");

  const extras = rules
    .filter((rule) => !rule.fallback)
    .map((rule) => ({
      source: rule.source,
      sourceRegex: rule.regex,
      headers: { [headerKey]: rule.policy },
    }));
  const catchAll = before.findIndex((route) => route && typeof route === "object" && (route as { source?: string }).source === "/:path*");
  before.splice(catchAll === -1 ? before.length : catchAll + 1, 0, ...extras);
  if (JSON.stringify(routing).includes(CSP_HASH_PLACEHOLDER)) {
    throw new Error("CSP placeholder is still in the deployment routing");
  }
}

function rulesFromManifest(manifest: { headers?: { source?: string; regex?: string; headers?: { key?: string; value?: string }[] }[] }): RoutePolicy[] {
  const rules: RoutePolicy[] = [];
  for (const rule of manifest.headers ?? []) {
    const header = rule.headers?.find((item) => String(item.key).toLowerCase() === "content-security-policy" && typeof item.value === "string");
    if (!header?.value || !rule.source) continue;
    rules.push({
      source: rule.source,
      regex: rule.regex || nextSourceRegex(rule.source),
      policy: header.value,
      hashes: [],
      fallback: rule.source === "/:path*",
    });
  }
  return rules;
}

function policyForPath(pathname: string, rules: RoutePolicy[]): string {
  let policy: string | null = null;
  for (const rule of rules) {
    if (new RegExp(rule.regex).test(pathname)) policy = rule.policy;
  }
  if (!policy) throw new Error(`no Content-Security-Policy matches ${pathname}`);
  return policy;
}

function assertRoutesCover(distDir: string, collected: HashCollection, rules: RoutePolicy[], label: string): void {
  if (rules.length === 0) throw new Error(`${label} does not contain a Content-Security-Policy`);
  for (const rule of rules) {
    try {
      assertProductionScriptSrc(rule.policy);
    } catch (err) {
      throw new Error(`${label} ${rule.source}: ${err instanceof Error ? err.message : String(err)}`);
    }
    if (Buffer.byteLength(rule.policy) > CSP_HEADER_LIMIT) {
      throw new Error(`${label} ${rule.source} Content-Security-Policy is ${Buffer.byteLength(rule.policy)} bytes`);
    }
  }
  const fallback = rules.find((rule) => rule.fallback) ?? rules[0];
  for (const file of collected.files) {
    const source = pathnameForHtml(distDir, file.file);
    const policy = source ? policyForPath(source, rules) : fallback!.policy;
    const missing = missingScriptHashes(policy, file.hashes);
    if (missing.length) {
      throw new Error(`${file.file} hash ${missing[0]} is not in ${label}`);
    }
  }
}

function matchRule(src: string | undefined, rules: RoutePolicy[]): RoutePolicy | null {
  if (rules.length === 1) return rules[0]!;
  if (!src) return null;
  const pages = rules.filter((rule) => !rule.fallback);
  let matched: RoutePolicy[] = [];
  let regex: RegExp;
  try {
    regex = new RegExp(src);
    matched = pages.filter((rule) => regex.test(rule.source) || regex.test(`${rule.source}/`));
  } catch {
    return null;
  }
  if (matched.length === 1) return matched[0]!;
  if (pages.length > 0 && matched.length === pages.length) return rules.find((rule) => rule.fallback) ?? null;
  if (matched.length === 0 && regex.test("/__csp_unknown_path__")) return rules.find((rule) => rule.fallback) ?? null;
  const exact = rules.find((rule) => rule.regex === src || rule.source === src);
  return exact ?? null;
}

function alignConfigPolicies(value: unknown, rules: RoutePolicy[]): void {
  if (rules.length === 1) {
    rewriteSitePolicies(value, rules[0]!.policy);
    return;
  }
  const visit = (current: unknown): void => {
    if (Array.isArray(current)) {
      for (const item of current) visit(item);
      return;
    }
    if (!current || typeof current !== "object") return;
    const record = current as Record<string, unknown>;
    const headers = record.headers;
    if (headers && typeof headers === "object" && !Array.isArray(headers)) {
      const headerRecord = headers as Record<string, unknown>;
      for (const [key, item] of Object.entries(headerRecord)) {
        if (key.toLowerCase() !== "content-security-policy" || typeof item !== "string") continue;
        if (!isSitePolicy(item) && !item.includes(CSP_HASH_PLACEHOLDER)) continue;
        const src = typeof record.src === "string" ? record.src : typeof record.sourceRegex === "string" ? record.sourceRegex : undefined;
        const match = matchRule(src, rules);
        if (!match) throw new Error(`deployment config has a CSP with no matching route (${src ?? "no src"})`);
        headerRecord[key] = match.policy;
      }
    }
    if (Array.isArray(headers) && typeof record.source === "string") {
      const match = rules.find((rule) => rule.source === record.source) ?? (record.source === "/:path*" ? rules.find((rule) => rule.fallback) : undefined);
      for (const header of headers) {
        if (!header || typeof header !== "object") continue;
        const item = header as { key?: string; value?: string };
        if (String(item.key).toLowerCase() !== "content-security-policy" || typeof item.value !== "string") continue;
        if (!match) continue;
        if (isSitePolicy(item.value) || item.value.includes(CSP_HASH_PLACEHOLDER)) item.value = match.policy;
      }
    }
    for (const item of Object.values(record)) {
      if (item && typeof item === "object") visit(item);
    }
  };
  visit(value);
}

export async function publishInlineScriptHashes(options: {
  distDir: string;
  routing?: unknown;
  headerLimit?: number;
}): Promise<HashCollection & { patchedFiles: string[]; routePolicies: RoutePolicy[]; maxPolicyBytes: number }> {
  const collected = await collectInlineHashes(options.distDir);
  const rules = buildRoutePolicies(options.distDir, collected, options.headerLimit ?? CSP_HEADER_LIMIT);
  const hashList = collected.hashList.join(" ");
  await writeManifestPolicies(options.distDir, rules);
  if (options.routing) publishRouting(options.routing, rules);

  const patchedFiles = await patchFiles(options.distDir, hashList);
  if (rules.length > 1 && patchedFiles.length) {
    throw new Error(
      `CSP placeholder remains outside the route manifest after splitting policies: ${patchedFiles.join(", ")}`,
    );
  }
  const manifestPath = path.join(options.distDir, "routes-manifest.json");
  const manifestText = await readFile(manifestPath, "utf8");
  if (manifestText.includes(CSP_HASH_PLACEHOLDER)) throw new Error(`CSP placeholder is still in ${manifestPath}`);
  assertRoutesCover(options.distDir, collected, rulesFromManifest(JSON.parse(manifestText)), manifestPath);

  if (options.routing) {
    const policiesInRouting = policiesIn(options.routing);
    if (policiesInRouting.length === 0) throw new Error("Deployment routing lost its script-src policy");
    for (const policy of policiesInRouting) {
      if (!rules.some((rule) => rule.policy === policy)) {
        throw new Error("Deployment routing has a CSP that is not one of the published route policies");
      }
    }
  }

  const maxPolicyBytes = Math.max(...rules.map((rule) => Buffer.byteLength(rule.policy)));
  return {
    ...collected,
    policy: rules.find((rule) => rule.fallback)?.policy ?? rules[0]!.policy,
    patchedFiles,
    routePolicies: rules,
    maxPolicyBytes,
  };
}

/**
 * Vercel serialises the routing object into `.next/output/config.json` during
 * onBuildComplete. Rewrite that policy from the routes manifest and refuse to
 * finish when the placeholder or a missing hash would be what production serves.
 */
export async function assertDeploymentOutput(options: {
  projectRoot: string;
  distDir: string;
  routing?: unknown;
  requireDeploymentOutput: boolean;
}): Promise<{ configs: string[] }> {
  const collected = await collectInlineHashes(options.distDir);
  const manifestPath = path.join(options.distDir, "routes-manifest.json");
  const manifestText = await readFile(manifestPath, "utf8");
  if (manifestText.includes(CSP_HASH_PLACEHOLDER)) {
    throw new Error(`CSP placeholder is still in ${manifestPath}`);
  }
  const rules = rulesFromManifest(JSON.parse(manifestText));
  assertRoutesCover(options.distDir, collected, rules, manifestPath);

  if (options.routing) {
    if (JSON.stringify(options.routing).includes(CSP_HASH_PLACEHOLDER)) {
      throw new Error("CSP placeholder is still in the deployment routing");
    }
    for (const published of policiesIn(options.routing)) {
      if (!rules.some((rule) => rule.policy === published)) {
        throw new Error("deployment routing has a CSP that is not one of the published route policies");
      }
    }
  }

  const configs: string[] = [];
  for (const file of deploymentConfigPaths(options.projectRoot, options.distDir)) {
    try {
      await readFile(file, "utf8");
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === "ENOENT") continue;
      throw err;
    }
    configs.push(file);
  }

  if (options.requireDeploymentOutput && configs.length === 0) {
    throw new Error(
      `Vercel adapter did not write a deployment config. Looked for ${deploymentConfigPaths(options.projectRoot, options.distDir).join(", ")}.`,
    );
  }

  for (const file of configs) {
    const data = JSON.parse(await readFile(file, "utf8")) as unknown;
    alignConfigPolicies(data, rules);
    const serialised = JSON.stringify(data);
    if (serialised.includes(CSP_HASH_PLACEHOLDER)) {
      throw new Error(`CSP placeholder is still in ${file}`);
    }
    await writeFile(file, serialised);
    const policies = policiesIn(JSON.parse(serialised)).filter((published) => published.includes("frame-ancestors "));
    if (policies.length === 0) throw new Error(`Content-Security-Policy is missing from ${file}`);
    for (const published of policies) {
      if (!rules.some((rule) => rule.policy === published)) {
        throw new Error(`${file} has a CSP that is not one of the published route policies`);
      }
    }
  }

  return { configs };
}
