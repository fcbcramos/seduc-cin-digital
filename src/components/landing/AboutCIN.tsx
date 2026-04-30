import { ShieldCheck, Fingerprint, Smartphone, Globe2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ExternalLink } from "lucide-react";

interface PillarProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const pillars: PillarProps[] = [
  {
    icon: Globe2,
    title: "Identidade nacional única",
    description:
      "Padrão único válido em todo o Brasil e nos países do Mercosul.",
  },
  {
    icon: Fingerprint,
    title: "Mesmo número do CPF",
    description:
      "Substitui o antigo RG e adota o CPF como número único, eliminando duplicidades.",
  },
  {
    icon: ShieldCheck,
    title: "Mais segura e confiável",
    description:
      "QR Code, padrões anti-fraude e integração com a conta gov.br nível Ouro.",
  },
  {
    icon: Smartphone,
    title: "Físico e digital",
    description:
      "Disponível em papel, cartão e versão digital no aplicativo gov.br.",
  },
];

function Pillar({ icon: Icon, title, description }: PillarProps) {
  return (
    <div className="border-t border-border pt-6">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-muted text-primary">
        <Icon className="h-4.5 w-4.5" aria-hidden />
      </span>
      <h3 className="mt-4 font-display text-base font-semibold leading-snug text-foreground">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

export function AboutCIN() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((p) => (
          <Pillar key={p.title} {...p} />
        ))}
      </div>

      <div className="mt-8 border-t border-border pt-4">
        <a
          href="https://www.gov.br/governodigital/pt-br/identidade/identificacao-do-cidadao-e-carteira-de-identidade-nacional/carteira-de-identidade-nacional-cin"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary"
        >
          Fonte: Portal oficial da Carteira de Identidade Nacional — gov.br
          <ExternalLink className="h-3 w-3" aria-hidden />
        </a>
      </div>
    </div>
  );
}
