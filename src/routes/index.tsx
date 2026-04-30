import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/landing/TopBar";
import { InstitutionalHeader } from "@/components/landing/InstitutionalHeader";
import { Hero } from "@/components/landing/Hero";
import { KpiSummary } from "@/components/landing/KpiSummary";
import { UniversalizationGoal } from "@/components/landing/UniversalizationGoal";
import { TerritorialDiagnosis } from "@/components/landing/TerritorialDiagnosis";
import { MunicipalityTable } from "@/components/landing/MunicipalityTable";
import { SecondaryIndicators } from "@/components/landing/SecondaryIndicators";
import { Footer } from "@/components/landing/Footer";
import { SectionHeader } from "@/components/landing/SectionHeader";
import { CallToAction } from "@/components/landing/CallToAction";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Projeto CIN nas Escolas — SEDUC-PI" },
      {
        name: "description",
        content:
          "Painel executivo do Projeto CIN nas Escolas da SEDUC-PI: cobertura da Carteira de Identidade Nacional entre estudantes da rede estadual, com indicadores por GRE e município.",
      },
      { property: "og:title", content: "Projeto CIN nas Escolas — SEDUC-PI" },
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
      className={`mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 ${className ?? ""}`}
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
        <Section id="prioritarios">
          <SectionHeader
            eyebrow="Indicadores prioritários"
            title="Alunos da rede estadual — ano letivo 2026"
            description="Totalizadores macro de estudantes da rede estadual do Piauí com enturmação 2026: quem já tem a Carteira de Identidade Nacional e quem ainda precisa ser atendido."
            eyebrowTone="primary"
          />
          <KpiSummary />
          <div className="mt-5">
            <UniversalizationGoal />
          </div>
        </Section>

        <div className="bg-muted/40">
          <Section id="diagnostico">
            <SectionHeader
              eyebrow="Diagnóstico por GRE"
              title="Quem tem mais e quem tem menos cobertura"
              description="Comparativo entre as 21 Gerências Regionais de Educação — destaque para as melhores e as prioritárias."
              eyebrowTone="accent"
            />
            <TerritorialDiagnosis />
          </Section>
        </div>

        <Section id="municipios">
          <SectionHeader
            eyebrow="Plano de ação por município"
            title="224 municípios da rede estadual"
            description="Tabela operacional com filtros por GRE, status e ordenação por gap. Use para identificar prioridades."
            eyebrowTone="destructive"
          />
          <MunicipalityTable />
        </Section>

        <div className="bg-muted/40">
          <Section id="secundarios">
            <SectionHeader
              eyebrow="Indicadores secundários"
              title="Adesão da rede e responsáveis"
              description="Cobertura entre docentes em sala de aula, quadro administrativo e famílias dos estudantes — base de credibilidade institucional para a campanha."
              eyebrowTone="secondary"
            />
            <SecondaryIndicators />
          </Section>
        </div>

        <CallToAction />
      </main>

      <Footer />
    </div>
  );
}
