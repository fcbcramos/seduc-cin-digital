import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

interface SectionProps {
  id?: string;
  background?: "default" | "muted";
  className?: string;
  containerClassName?: string;
  size?: "narrow" | "base" | "wide";
  children: ReactNode;
}

/**
 * Section única — aplica padding vertical padronizado e envolve em Container.
 *
 * Padding vertical: var(--section-padding-y) = clamp(3rem, 5vw, 5rem)
 *
 * REGRA: toda seção da landing page deve usar <Section>. Não usar
 * <section className="py-X"> ad-hoc.
 */
export function Section({
  id,
  background = "default",
  className,
  containerClassName,
  size = "base",
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "section-y",
        background === "muted" && "bg-muted/40 border-y border-border",
        className,
      )}
    >
      <Container size={size} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}
