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
          className="text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl"
        >
          {title}
        </h2>
        {description && (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  );
}
