import { createFileRoute } from "@tanstack/react-router";
import { InstitutionalHeader } from "@/components/landing/InstitutionalHeader";
import { Hero } from "@/components/landing/Hero";
import { KpiSummary } from "@/components/landing/KpiSummary";
import { AboutCIN } from "@/components/landing/AboutCIN";
import { UniversalizationGoal } from "@/components/landing/UniversalizationGoal";
import { TerritorialDiagnosis } from "@/components/landing/TerritorialDiagnosis";
import { MunicipalityTable } from "@/components/landing/MunicipalityTable";
import { ExecutionRoadmap } from "@/components/landing/ExecutionRoadmap";
import { HardwareKit } from "@/components/landing/HardwareKit";
import { SecondaryIndicators } from "@/components/landing/SecondaryIndicators";
import { CallToAction } from "@/components/landing/CallToAction";
import { Footer } from "@/components/landing/Footer";
import { SectionHeader } from "@/components/landing/SectionHeader";
import { Section } from "@/components/layout/Section";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Painel CIN nas Escolas — SEDUC-PI" },
      {
        name: "description",
        content:
          "Painel executivo do Projeto CIN nas Escolas da SEDUC-PI: cobertura da Carteira de Identidade Nacional entre estudantes da rede estadual, com indicadores por GRE e município.",
      },
      { property: "og:title", content: "Painel CIN nas Escolas — SEDUC-PI" },
      {
        property: "og:description",
        content:
          "Indicadores executivos e diagnóstico territorial da cobertura CIN entre estudantes — SEDUC-PI.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <InstitutionalHeader />
      <Hero />

      <main>
        <Section id="kpis">
          <SectionHeader
            eyebrow="Visão geral"
            title="Indicadores principais da cobertura CIN"
            description="Síntese dos números que orientam o planejamento e a execução do projeto na rede estadual."
          />
          <KpiSummary />
        </Section>

        <Section id="sobre-cin" background="muted">
          <SectionHeader
            eyebrow="Sobre o documento"
            title="O que é a Carteira de Identidade Nacional"
            description="Documento único, padronizado e seguro, com validade em todo o Brasil e nos países do Mercosul. Substitui o antigo RG e usa o CPF como número único."
          />
          <AboutCIN />
        </Section>

        <Section id="meta">
          <SectionHeader
            eyebrow="Meta institucional"
            title="Compromisso de universalização"
            description="Síntese da meta da SEDUC-PI até dezembro de 2026."
          />
          <UniversalizationGoal />
        </Section>

        <Section id="diagnostico" background="muted">
          <SectionHeader
            eyebrow="Diagnóstico territorial"
            title="Cobertura por Gerência Regional de Educação"
            description="Comparativo entre as 21 GREs do Piauí — destaque para as melhores e as prioritárias para mobilização imediata."
          />
          <TerritorialDiagnosis />
        </Section>

        <Section id="municipios">
          <SectionHeader
            eyebrow="Plano de ação"
            title="224 municípios da rede estadual"
            description="Tabela operacional com filtros por GRE, status e ordenação por gap. Use para identificar prioridades."
          />
          <MunicipalityTable />
        </Section>

        <Section id="roadmap" background="muted">
          <SectionHeader
            eyebrow="Roadmap de execução"
            title="Plano em 7 ondas mensais — junho a dezembro de 2026"
            description="Sequência operacional das 21 GREs, priorizando primeiro as de menor cobertura e maior distância da capital, e fechando o ciclo na Região Metropolitana de Teresina."
          />
          <ExecutionRoadmap />
        </Section>

        <Section id="kit-hardware">
          <SectionHeader
            eyebrow="Infraestrutura"
            title="Kit de hardware para atendimento"
            description="Composição padrão do ponto de captura biométrica e fotográfica utilizado nas operações da CIN nas escolas. Serão mobilizados 10 kits para cobrir as ondas do roadmap."
          />
          <HardwareKit />
        </Section>

        <Section id="secundarios" background="muted">
          <SectionHeader
            eyebrow="Adesão da rede"
            title="Docentes, administrativo e responsáveis"
            description="Cobertura entre os profissionais da rede e as famílias dos estudantes — base de credibilidade institucional para a campanha."
          />
          <SecondaryIndicators />
        </Section>

        <CallToAction />
      </main>

      <Footer />
    </div>
  );
}
