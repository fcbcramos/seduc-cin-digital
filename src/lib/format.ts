export const formatNumber = (value: number): string =>
  new Intl.NumberFormat("pt-BR").format(value);

export const formatPercent = (value: number, fractionDigits = 1): string =>
  `${value.toLocaleString("pt-BR", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })}%`;

export type CoverageStatus = "success" | "warning" | "danger";

export const getCoverageStatus = (percent: number): CoverageStatus => {
  if (percent >= 70) return "success";
  if (percent >= 40) return "warning";
  return "danger";
};

export const coverageStatusLabel: Record<CoverageStatus, string> = {
  success: "Adequado",
  warning: "Atenção",
  danger: "Crítico",
};
