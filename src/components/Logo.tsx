import { site } from "@/lib/site";

/**
 * RM Tiling logo: a tile-grid monogram mark + wordmark.
 * `tone` switches the wordmark colour for light vs. dark backgrounds.
 */
export function Logo({
  tone = "dark",
  className = "",
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-9 w-9 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-lg font-extrabold tracking-tight ${
            tone === "light" ? "text-white" : "text-ink"
          }`}
        >
          RM <span className="text-brand-600">Tiling</span>
        </span>
        <span
          className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${
            tone === "light" ? "text-white/60" : "text-slate-400"
          }`}
        >
          Melbourne
        </span>
      </span>
    </span>
  );
}

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      role="img"
      aria-label={`${site.name} logo`}
      className={className}
    >
      <defs>
        <linearGradient id="rm-mark" x1="0" y1="0" x2="40" y2="40">
          <stop offset="0" stopColor="#14b8a6" />
          <stop offset="1" stopColor="#0f766e" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="10" fill="url(#rm-mark)" />
      {/* tile grid */}
      <g fill="#ffffff">
        <rect x="8" y="8" width="10" height="10" rx="2.5" opacity="0.92" />
        <rect x="22" y="8" width="10" height="10" rx="2.5" opacity="0.55" />
        <rect x="8" y="22" width="10" height="10" rx="2.5" opacity="0.55" />
        <rect x="22" y="22" width="10" height="10" rx="2.5" fill="#fbbf24" />
      </g>
    </svg>
  );
}
