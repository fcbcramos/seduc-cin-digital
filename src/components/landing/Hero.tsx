import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/aluno-rede-estadual-pi.jpg";

export function Hero() {
  return (
    <section className="border-b border-border bg-card">
      <Container size="base" className="section-y">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">Painel executivo · 2026</p>

            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
              Projeto CIN nas Escolas
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              A Secretaria de Estado da Educação do Piauí mobiliza a rede para garantir
              que <span className="font-semibold text-foreground">todos os estudantes</span> do
              Ensino Fundamental e Ensino Médio obtenham a Carteira de Identidade
              Nacional, eliminando a subidentificação documental no estado.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-positive" aria-hidden />
                Em execução
              </Badge>
              <Badge variant="outline" className="border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                Meta dez/2026
              </Badge>
              <Badge variant="outline" className="border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                Rede estadual · Piauí
              </Badge>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[16/11] overflow-hidden rounded-lg border border-border">
              <img
                src={heroImage}
                alt="Estudantes da rede estadual do Piauí em sala de aula com uniforme oficial do Governo do Estado"
                className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
                loading="eager"
              />
              <div
                className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-5"
                aria-hidden
              >
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/85">
                  Identidade · Cidadania · Educação
                </p>
                <p className="mt-1 text-base font-semibold text-white sm:text-lg">
                  Cada estudante com sua identidade garantida.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
