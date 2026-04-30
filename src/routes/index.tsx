import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/landing/TopBar";
import { InstitutionalHeader } from "@/components/landing/InstitutionalHeader";
import { Hero } from "@/components/landing/Hero";
import { KpiSummary } from "@/components/landing/KpiSummary";
import { TerritorialDiagnosis } from "@/components/landing/TerritorialDiagnosis";
import { MunicipalityTable } from "@/components/landing/MunicipalityTable";
import { RoadmapTimeline } from "@/components/landing/RoadmapTimeline";
import { ActionPlanTable } from "@/components/landing/ActionPlanTable";
import { MilestonesGrid } from "@/components/landing/MilestonesGrid";
import { RisksGrid } from "@/components/landing/RisksGrid";
import { NextStepsList } from "@/components/landing/NextStepsList";
import { Footer } from "@/components/landing/Footer";
import { SectionHeader } from "@/components/landing/SectionHeader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Projeto CIN nas Escolas — SEDUC-PI" },
      {
        name: "description",
        content:
          "Painel executivo do Projeto CIN nas Escolas da Secretaria de Estado da Educação do Piauí: cobertura da Carteira de Identidade Nacional entre estudantes e familiares da rede estadual.",
      },
      { property: "og:title", content: "Projeto CIN nas Escolas — SEDUC-PI" },
      {
        property: "og:description",
        content:
          "Indicadores executivos, diagnóstico territorial e plano de ação do Projeto CIN nas Escolas — SEDUC-PI.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: LandingPage,
});

function Section({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 ${className ?? ""}`}
    >
      {children}
    </section>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <InstitutionalHeader />
      <Hero />

      <main>
        <Section id="resumo">
          <SectionHeader
            eyebrow="Resumo executivo"
            title="Indicadores consolidados"
            description="Cobertura atual da Carteira de Identidade Nacional entre estudantes e familiares da rede estadual do Piauí."
          />
          <KpiSummary />
        </Section>

        <div className="bg-muted/40">
          <Section id="diagnostico">
            <SectionHeader
              eyebrow="Diagnóstico territorial"
              title="Cobertura por Gerência Regional de Educação"
              description="Comparativo do percentual de estudantes e parentes com CIN nas 21 GREs do Piauí."
            />
            <TerritorialDiagnosis />
          </Section>
        </div>

        <Section id="municipios">
          <SectionHeader
            eyebrow="Plano de ação por município"
            title="Municípios priorizados pelo gap de cobertura"
            description="Tabela com os 224 municípios da rede estadual, ordenada pelo gap absoluto (estudantes + parentes sem CIN). Use os filtros para focar por GRE ou status."
          />
          <MunicipalityTable />
        </Section>

        <div className="bg-muted/40">
          <Section id="roadmap">
            <SectionHeader
              eyebrow="Roadmap"
              title="Fases do projeto"
              description="Linha do tempo das fases previstas. Conteúdo de prazos e entregas será preenchido a partir da planilha de gestão."
            />
            <RoadmapTimeline />
          </Section>
        </div>

        <Section id="plano-acao">
          <SectionHeader
            eyebrow="Plano de ação"
            title="Ações operacionais do projeto"
            description="Tabela executiva com ações, responsáveis, prazos, status e prioridade."
          />
          <ActionPlanTable />
        </Section>

        <div className="bg-muted/40">
          <Section id="marcos">
            <SectionHeader
              eyebrow="Marcos e entregáveis"
              title="Principais marcos do projeto"
              description="Entregas-chave que materializam o avanço do projeto."
            />
            <MilestonesGrid />
          </Section>
        </div>

        <Section id="riscos">
          <SectionHeader
            eyebrow="Riscos e pontos de atenção"
            title="Itens críticos do projeto"
            description="Riscos identificados, severidade, ações de mitigação e responsáveis."
          />
          <RisksGrid />
        </Section>

        <div className="bg-muted/40">
          <Section id="proximos-passos">
            <SectionHeader
              eyebrow="Próximos passos"
              title="Encaminhamentos imediatos"
              description="Próximas decisões e ações operacionais do projeto."
            />
            <NextStepsList />
          </Section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
