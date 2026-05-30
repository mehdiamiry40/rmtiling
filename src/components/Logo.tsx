/**
 * RM Tiling logo: a minimal monochrome tile mark + wordmark.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-6 w-6 shrink-0" />
      <span className="font-display text-lg font-semibold tracking-tight text-ink">
        RM Tiling
      </span>
    </span>
  );
}

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect width="24" height="24" rx="5" fill="#1c1917" />
      <g fill="#ffffff">
        <rect x="5" y="5" width="6" height="6" rx="1.5" />
        <rect x="13" y="5" width="6" height="6" rx="1.5" opacity="0.45" />
        <rect x="5" y="13" width="6" height="6" rx="1.5" opacity="0.45" />
        <rect x="13" y="13" width="6" height="6" rx="1.5" />
      </g>
    </svg>
  );
}
