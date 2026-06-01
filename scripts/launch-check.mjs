import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const siteFile = resolve(root, "src/lib/site.ts");
const siteSource = readFileSync(siteFile, "utf8");

const failures = [];
const warnings = [];

function fail(message) {
  failures.push(message);
}

function warn(message) {
  warnings.push(message);
}

function valueFor(key) {
  const match = siteSource.match(new RegExp(`${key}:\\s*"([^"]*)"`));
  return match?.[1]?.trim() ?? "";
}

function nestedValueFor(section, key) {
  const sectionMatch = siteSource.match(
    new RegExp(`${section}:\\s*{([\\s\\S]*?)\\n\\s*},`),
  );
  if (!sectionMatch) return "";
  const match = sectionMatch[1].match(new RegExp(`${key}:\\s*"([^"]*)"`));
  return match?.[1]?.trim() ?? "";
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function digits(value) {
  return value.replace(/\D/g, "");
}

function isValidAbn(value) {
  const nums = digits(value).split("").map(Number);
  if (nums.length !== 11) return false;

  nums[0] -= 1;
  const weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  const sum = nums.reduce((total, number, index) => {
    return total + number * weights[index];
  }, 0);

  return sum % 89 === 0;
}

function env(name) {
  return process.env[name]?.trim() ?? "";
}

function isHttpsUrl(value) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" && !/localhost|127\.0\.0\.1|example\.com/i.test(parsed.hostname);
  } catch {
    return false;
  }
}

const phoneDisplay = nestedValueFor("phone", "display");
const phoneHref = nestedValueFor("phone", "href");
const email = valueFor("email");
const abn = valueFor("abn");
const siteUrl = valueFor("url");
const heroImage = nestedValueFor("heroImage", "src");

if (!phoneDisplay || !phoneHref) {
  warn("No phone number configured; the site will launch as email-first.");
} else if (!phoneHref.startsWith("tel:")) {
  fail("Phone href must use a tel: link.");
} else if (digits(phoneHref).length < 8 || digits(phoneHref).length > 15) {
  fail("Phone tel: link does not look like a valid phone number.");
}

if (!isEmail(email)) {
  fail("Add a valid contact email in src/lib/site.ts.");
}

if (!abn) {
  warn("No ABN configured; add it in src/lib/site.ts if the business wants it shown publicly.");
} else if (!isValidAbn(abn)) {
  fail("The ABN in src/lib/site.ts does not pass the Australian ABN checksum.");
}

try {
  const parsedUrl = new URL(siteUrl);
  if (parsedUrl.protocol !== "https:") {
    fail("site.url must be an https:// URL.");
  }
  if (/localhost|127\.0\.0\.1|example\.com/i.test(parsedUrl.hostname)) {
    fail("site.url must be the production domain, not a placeholder host.");
  }
} catch {
  fail("site.url must be a valid production URL.");
}

if (!heroImage || !existsSync(resolve(root, "public", heroImage.slice(1)))) {
  fail("Hero image referenced by site.heroImage.src is missing from public/.");
}

if (/0411 123 456|12 345 678 901|Rated 5\.0|120\+ reviews|1,000\+/i.test(siteSource)) {
  fail("Remove placeholder phone, ABN, review or project-count claims.");
}

const hasWebhook = Boolean(env("CONTACT_WEBHOOK_URL"));
const hasResend = Boolean(env("RESEND_API_KEY"));

if (!hasWebhook && !hasResend) {
  warn("No webhook or Resend delivery configured; production enquiries will use the mailto fallback.");
}

if (hasWebhook && !isHttpsUrl(env("CONTACT_WEBHOOK_URL"))) {
  fail("CONTACT_WEBHOOK_URL must be a valid production https:// URL.");
}

if (hasResend) {
  if (!isEmail(env("CONTACT_TO_EMAIL"))) {
    fail("CONTACT_TO_EMAIL must be set to a valid email when using Resend.");
  }
  if (!/<[^@\s]+@[^@\s]+\.[^@\s]+>$|^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(env("CONTACT_FROM_EMAIL"))) {
    fail("CONTACT_FROM_EMAIL must be a verified sender email when using Resend.");
  }
}

for (const network of ["facebook", "instagram", "google"]) {
  const url = nestedValueFor("social", network);
  if (!url) {
    warn(`No ${network} URL configured; it will be hidden.`);
  } else if (!url.startsWith("https://")) {
    fail(`${network} URL must start with https://.`);
  }
}

if (failures.length > 0) {
  console.error("Launch check failed:");
  for (const message of failures) console.error(`- ${message}`);
  if (warnings.length > 0) {
    console.error("\nWarnings:");
    for (const message of warnings) console.error(`- ${message}`);
  }
  process.exit(1);
}

console.log("Launch check passed.");
if (warnings.length > 0) {
  console.log("\nWarnings:");
  for (const message of warnings) console.log(`- ${message}`);
}
