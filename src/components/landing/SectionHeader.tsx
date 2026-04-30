type EyebrowTone = "primary" | "accent" | "destructive" | "secondary";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  id?: string;
  actions?: React.ReactNode;
  eyebrowTone?: EyebrowTone;
}

const toneClass: Record<EyebrowTone, string> = {
  primary: "text-primary",
  accent: "text-accent",
  destructive: "text-destructive",
  secondary:
    "inline-block rounded bg-secondary/30 px-2 py-0.5 text-secondary-foreground",
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  id,
  actions,
  eyebrowTone = "primary",
}: SectionHeaderProps) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:mb-7 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow && (
          <p
            className={`mb-2 text-xs font-semibold uppercase tracking-[0.18em] ${toneClass[eyebrowTone]}`}
          >
            {eyebrow}
          </p>
        )}
        <h2 id={id} className="text-2xl font-bold text-foreground sm:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  );
}
