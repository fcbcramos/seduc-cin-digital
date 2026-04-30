import { Sparkles, Users, Target } from "lucide-react";
import { getStudentTotals } from "@/lib/cin-data";
import { formatNumber } from "@/lib/format";

const BG_IMAGE =
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1800&q=80";

export function CallToAction() {
  const t = getStudentTotals();
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${BG_IMAGE})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.32_0.12_252)]/95 via-primary/85 to-accent/80" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-wider text-secondary-foreground">
              <Sparkles className="h-3 w-3" aria-hidden /> Missão do projeto
            </p>
            <h2 className="text-3xl font-bold leading-tight text-primary-foreground sm:text-4xl lg:text-5xl">
              Garantir identidade documental para
              <span className="block text-secondary">
                cada estudante do Piauí
              </span>
            </h2>
            <p className="mt-4 max-w-2xl text-base text-primary-foreground/90 sm:text-lg">
              A CIN é a porta de entrada para serviços públicos, programas sociais e o
              pleno exercício da cidadania. Reduzir o gap atual significa transformar
              vidas em larga escala.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1">
            <Stat
              icon={<Users className="h-5 w-5" aria-hidden />}
              label="Atender"
              value={formatNumber(t.semCIN)}
              caption="estudantes ainda sem CIN"
            />
            <Stat
              icon={<Target className="h-5 w-5" aria-hidden />}
              label="Meta"
              value="100%"
              caption="cobertura na rede estadual"
            />
            <Stat
              icon={<Sparkles className="h-5 w-5" aria-hidden />}
              label="Alcance"
              value={`${t.totalMunicipios}`}
              caption="municípios mobilizados"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  icon,
  label,
  value,
  caption,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  caption: string;
}) {
  return (
    <div className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 p-5 backdrop-blur">
      <div className="flex items-center gap-2 text-secondary">
        {icon}
        <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
      </div>
      <p className="mt-2 text-3xl font-bold text-primary-foreground sm:text-4xl">
        {value}
      </p>
      <p className="mt-1 text-sm text-primary-foreground/80">{caption}</p>
    </div>
  );
}
