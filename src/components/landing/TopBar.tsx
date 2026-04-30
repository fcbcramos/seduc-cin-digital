import { Phone, Mail } from "lucide-react";

export function TopBar() {
  return (
    <div className="bg-[oklch(0.32_0.12_252)] text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <a
            href="https://seduc.pi.gov.br/ouvidoria"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-secondary"
          >
            Ouvidoria
          </a>
          <span className="hidden h-3 w-px bg-primary-foreground/30 sm:inline-block" aria-hidden />
          <a
            href="https://seduc.pi.gov.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden transition-colors hover:text-secondary sm:inline"
          >
            Portal SEDUC-PI
          </a>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden items-center gap-1.5 sm:inline-flex">
            <Mail className="h-3 w-3" aria-hidden />
            seduc@seduc.pi.gov.br
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Phone className="h-3 w-3" aria-hidden />
            (86) 3216-3200
          </span>
        </div>
      </div>
    </div>
  );
}
