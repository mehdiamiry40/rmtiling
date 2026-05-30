import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "dark",
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
  tone?: "dark" | "light";
}) {
  const isLight = tone === "light";
  return (
    <Reveal
      className={
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"
      }
    >
      <span
        className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] ${
          isLight ? "text-brand-300" : "text-brand-600"
        }`}
      >
        <span
          className={`h-px w-6 ${isLight ? "bg-brand-300" : "bg-brand-400"}`}
        />
        {eyebrow}
      </span>
      <h2
        className={`mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl ${
          isLight ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            isLight ? "text-brand-100/80" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
