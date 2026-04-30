import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/aluno-rede-estadual-pi.jpg";

export function Hero() {
  return (
    <section className="border-b border-border bg-card">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-6 py-14 lg:grid-cols-12 lg:gap-14 lg:px-10 lg:py-20">
        <div className="flex flex-col justify-center lg:col-span-7">
          <p className="eyebrow">Painel executivo · 2026</p>

          <h1 className="mt-4 font-display text-[40px] font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[56px]">
            Projeto CIN nas Escolas
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            A Secretaria de Estado da Educação do Piauí mobiliza a rede para garantir
            que <span className="font-semibold text-foreground">todos os estudantes</span> da
            educação básica obtenham a Carteira de Identidade Nacional, eliminando a
            subidentificação documental no estado.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className="border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              <span
                className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-positive"
                aria-hidden
              />
              Em execução
            </Badge>
            <Badge
              variant="outline"
              className="border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              Meta dez/2026
            </Badge>
            <Badge
              variant="outline"
              className="border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              Rede estadual · Piauí
            </Badge>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-lg border border-border">
            <img
              src={heroImage}
              alt="Estudantes da rede estadual do Piauí em sala de aula com uniforme oficial do Governo do Estado"
              className="h-[280px] w-full object-cover object-[center_30%] sm:h-[360px] lg:h-[440px]"
              loading="eager"
            />
            <div
              className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-5"
              aria-hidden
            >
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/85">
                Identidade · Cidadania · Educação
              </p>
              <p className="mt-1 font-display text-lg font-semibold text-white">
                Cada estudante com sua identidade garantida.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
