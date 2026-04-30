interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  id?: string;
  actions?: React.ReactNode;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  id,
  actions,
}: SectionHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 border-b border-border pb-6 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2
          id={id}
          className="font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl"
        >
          {title}
        </h2>
        {description && (
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  );
}
