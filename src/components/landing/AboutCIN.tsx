import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Fingerprint, Smartphone, Globe2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import cinCidadao from "@/assets/cin-campanha-cidadao.png";
import cinLosango from "@/assets/cin-campanha-losango.png";

interface PillarProps {
  icon: LucideIcon;
  title: string;
  description: string;
  tone: "primary" | "accent" | "secondary" | "destructive";
}

const toneMap: Record<PillarProps["tone"], { bg: string; fg: string; bar: string }> = {
  primary: { bg: "bg-primary/10", fg: "text-primary", bar: "bg-primary" },
  accent: { bg: "bg-accent/10", fg: "text-accent", bar: "bg-accent" },
  secondary: { bg: "bg-secondary/20", fg: "text-foreground", bar: "bg-secondary" },
  destructive: { bg: "bg-destructive/10", fg: "text-destructive", bar: "bg-destructive" },
};

const pillars: PillarProps[] = [
  {
    icon: Globe2,
    title: "Uma identidade para todo o Brasil",
    description:
      "Padrão nacional único, com validade em todo o território brasileiro e nos países do Mercosul.",
    tone: "primary",
  },
  {
    icon: Fingerprint,
    title: "Mesmo número do CPF",
    description:
      "Substitui o antigo RG e adota o CPF como número único, eliminando duplicidades de cadastro.",
    tone: "accent",
  },
  {
    icon: ShieldCheck,
    title: "Mais segura e confiável",
    description:
      "QR Code, padrões modernos contra fraude e integração com a conta gov.br (nível Ouro).",
    tone: "destructive",
  },
  {
    icon: Smartphone,
    title: "Físico e digital",
    description:
      "Disponível em papel, cartão e versão digital no aplicativo gov.br — sempre à mão do cidadão.",
    tone: "secondary",
  },
];

function Pillar({ icon: Icon, title, description, tone }: PillarProps) {
  const t = toneMap[tone];
  return (
    <Card className="relative overflow-hidden shadow-card">
      <span className={`absolute inset-x-0 top-0 h-0.5 ${t.bar}`} aria-hidden />
      <CardContent className="flex gap-3 p-4">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${t.bg} ${t.fg}`}
        >
          <Icon className="h-4 w-4" aria-hidden />
        </span>
        <div className="min-w-0">
          <h3 className="text-sm font-bold leading-tight text-foreground">{title}</h3>
          <p className="mt-1 text-xs leading-snug text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function AboutCIN() {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
      <div className="lg:col-span-7">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {pillars.map((p) => (
            <Pillar key={p.title} {...p} />
          ))}
        </div>
        <p className="mt-3 text-[11px] text-muted-foreground">
          Fonte: Portal oficial da Carteira de Identidade Nacional — Governo Federal (gov.br).
        </p>
      </div>

      <div className="relative lg:col-span-5">
        <div className="relative overflow-hidden rounded-2xl shadow-card-hover">
          <img
            src={cinCidadao}
            alt="Campanha oficial Nova Carteira de Identidade Nacional do Governo Federal — cidadão segurando a CIN"
            className="h-[220px] w-full object-cover sm:h-[280px] lg:h-[320px]"
            loading="lazy"
          />
        </div>
        <div className="mt-3 flex items-center gap-3 rounded-xl border border-border bg-card p-3">
          <img
            src={cinLosango}
            alt="Selo institucional Nova Carteira de Identidade Nacional"
            className="h-16 w-auto sm:h-20"
            loading="lazy"
          />
          <p className="text-xs leading-snug text-muted-foreground">
            Campanha oficial do <strong className="text-foreground">Governo Federal</strong>.
            A SEDUC-PI executa o esforço estadual de universalização junto à rede.
          </p>
        </div>
      </div>
    </div>
  );
}
