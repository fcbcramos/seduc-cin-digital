import { getStudentTotals } from "@/lib/cin-data";
import { formatNumber, formatPercent } from "@/lib/format";

interface KpiItem {
  label: string;
  value: string;
  helper: string;
  emphasis?: "default" | "critical";
}

export function KpiStrip() {
  const t = getStudentTotals();

  const items: KpiItem[] = [
    {
      label: "Estudantes na rede",
      value: formatNumber(t.estudantes),
      helper: `${t.totalMunicipios} municípios · ${t.totalGREs} GREs`,
    },
    {
      label: "Cobertura atual",
      value: formatPercent(t.pctComCIN, 1),
      helper: `Faltam ${formatPercent(100 - t.pctComCIN, 1)} para a meta`,
    },
    {
      label: "Estudantes sem CIN",
      value: formatNumber(t.semCIN),
      helper: "Público prioritário até dez/2026",
      emphasis: "critical",
    },
    {
      label: "Municípios críticos",
      value: formatNumber(t.municipiosCriticos),
      helper: "Cobertura abaixo de 40%",
      emphasis: "critical",
    },
  ];

  return (
    <section
      aria-label="Indicadores executivos"
      className="border-b border-border bg-background"
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <dl className="grid grid-cols-2 divide-y divide-border border-x border-border bg-card lg:grid-cols-4 lg:divide-x lg:divide-y-0">
          {items.map((item) => (
            <div key={item.label} className="px-6 py-7">
              <dt className="eyebrow">{item.label}</dt>
              <dd
                className={`mt-3 font-display text-4xl font-semibold tabular-nums leading-none ${
                  item.emphasis === "critical" ? "text-critical" : "text-foreground"
                }`}
              >
                {item.value}
              </dd>
              <dd className="mt-2 text-xs text-muted-foreground">{item.helper}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
