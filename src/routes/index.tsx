import { createFileRoute } from "@tanstack/react-router";
import { InstitutionalHeader } from "@/components/landing/InstitutionalHeader";
import { Hero } from "@/components/landing/Hero";
import { KpiStrip } from "@/components/landing/KpiStrip";
import { AboutCIN } from "@/components/landing/AboutCIN";
import { TerritorialDiagnosis } from "@/components/landing/TerritorialDiagnosis";
import { MunicipalityTable } from "@/components/landing/MunicipalityTable";
import { ExecutionRoadmap } from "@/components/landing/ExecutionRoadmap";
import { SecondaryIndicators } from "@/components/landing/SecondaryIndicators";
import { Footer } from "@/components/landing/Footer";
import { SectionHeader } from "@/components/landing/SectionHeader";

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

function Section({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="mx-auto w-full max-w-[1280px] px-6 py-16 lg:px-10 lg:py-20"
    >
      {children}
    </section>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <InstitutionalHeader />
      <Hero />
      <KpiStrip />

      <main>
        <Section id="sobre-cin">
          <SectionHeader
            eyebrow="Sobre o documento"
            title="O que é a Carteira de Identidade Nacional"
            description="Documento único, padronizado e seguro, com validade em todo o Brasil e nos países do Mercosul. Substitui o antigo RG e usa o CPF como número único."
          />
          <AboutCIN />
        </Section>

        <div className="border-t border-border bg-muted/40">
          <Section id="diagnostico">
            <SectionHeader
              eyebrow="Diagnóstico territorial"
              title="Cobertura por Gerência Regional de Educação"
              description="Comparativo entre as 21 GREs do Piauí — destaque para as melhores e as prioritárias para mobilização imediata."
            />
            <TerritorialDiagnosis />
          </Section>
        </div>

        <Section id="municipios">
          <SectionHeader
            eyebrow="Plano de ação"
            title="224 municípios da rede estadual"
            description="Tabela operacional com filtros por GRE, status e ordenação por gap. Use para identificar prioridades."
          />
          <MunicipalityTable />
        </Section>

        <div className="border-t border-border bg-muted/40">
          <Section id="roadmap">
            <SectionHeader
              eyebrow="Roadmap de execução"
              title="Plano em 7 ondas mensais — junho a dezembro de 2026"
              description="Sequência operacional das 21 GREs, priorizando primeiro as de menor cobertura e maior distância da capital, e fechando o ciclo na Região Metropolitana de Teresina."
            />
            <ExecutionRoadmap />
          </Section>
        </div>

        <Section id="secundarios">
          <SectionHeader
            eyebrow="Adesão da rede"
            title="Docentes, administrativo e responsáveis"
            description="Cobertura entre os profissionais da rede e as famílias dos estudantes — base de credibilidade institucional para a campanha."
          />
          <SecondaryIndicators />
        </Section>
      </main>

      <Footer />
    </div>
  );
}
