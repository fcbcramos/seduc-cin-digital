import { Container } from "@/components/layout/Container";
import { ShieldCheck } from "lucide-react";
import ctaImage from "@/assets/alunos-evento-pi.jpg";
import { getStudentTotals } from "@/lib/cin-data";
import { formatNumber } from "@/lib/format";

export function CallToAction() {
  const t = getStudentTotals();
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-0" aria-hidden>
        <img
          src={ctaImage}
          alt=""
          className="h-full w-full object-cover object-[30%_center] opacity-30"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/40" />
      </div>

      <Container size="base" className="relative section-y">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/80">
              Mobilização institucional
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
              Garantir identidade documental para cada estudante
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-foreground/90">
              A SEDUC-PI conduz a mobilização integrada com GREs, escolas, famílias e
              parceiros estaduais para assegurar a emissão da CIN a todos os estudantes da
              rede até dezembro de 2026.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-md border border-primary-foreground/30 bg-primary-foreground/10 px-3 py-2 text-xs font-medium">
              <ShieldCheck className="h-4 w-4" aria-hidden />
              Identidade · Cidadania · Inclusão
            </div>
          </div>

          <dl className="grid grid-cols-3 gap-4 rounded-lg border border-primary-foreground/20 bg-primary-foreground/10 p-5 backdrop-blur-sm">
            <Stat label="Sem CIN" value={formatNumber(t.semCIN)} />
            <Stat label="Meta" value="100%" />
            <Stat label="Municípios" value={String(t.totalMunicipios)} />
          </dl>
        </div>
      </Container>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <dt className="text-[10px] font-semibold uppercase tracking-wider text-primary-foreground/75">
        {label}
      </dt>
      <dd className="mt-1 text-xl font-bold tabular-nums">{value}</dd>
    </div>
  );
}
