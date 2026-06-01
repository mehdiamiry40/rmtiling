export function Logo({
  className = "",
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const wordClass = tone === "light" ? "text-white" : "text-ink";
  const placeClass = tone === "light" ? "text-white/65" : "text-ink";

  return (
    <span className={`inline-flex items-center gap-4 ${className}`}>
      <LogoMark className="h-12 w-12 shrink-0" />
      <span className="flex flex-col leading-tight">
        <span className={`font-display text-2xl font-semibold ${wordClass}`}>
          RM Tiling
        </span>
        <span className={`text-sm font-medium sm:text-base ${placeClass}`}>
          Tiling | Bathroom Renovations
        </span>
      </span>
    </span>
  );
}

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <g transform="rotate(45 32 32)">
        <rect x="11" y="11" width="18" height="18" fill="#8f1710" />
        <rect x="35" y="11" width="18" height="18" fill="#a62218" />
        <rect x="11" y="35" width="18" height="18" fill="#a62218" />
        <rect x="35" y="35" width="18" height="18" fill="#4b0507" />
        <path d="M11 32h42M32 11v42" stroke="#ffffff" strokeWidth="3" />
      </g>
    </svg>
  );
}
