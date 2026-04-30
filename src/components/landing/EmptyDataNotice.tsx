import { Info } from "lucide-react";

interface EmptyDataNoticeProps {
  message?: string;
  className?: string;
}

export function EmptyDataNotice({
  message = "Campo sem origem identificada — aguardando dados de gestão do projeto.",
  className,
}: EmptyDataNoticeProps) {
  return (
    <div
      role="note"
      aria-live="polite"
      className={`flex items-start gap-3 rounded-lg border border-dashed border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground ${className ?? ""}`}
    >
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}
