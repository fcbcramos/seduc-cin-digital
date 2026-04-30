import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerSize = "narrow" | "base" | "wide";

interface ContainerProps {
  size?: ContainerSize;
  className?: string;
  children: ReactNode;
  as?: "div" | "section" | "header" | "footer" | "main" | "nav";
}

const sizeClass: Record<ContainerSize, string> = {
  narrow: "container-narrow",
  base: "container-base",
  wide: "container-wide",
};

/**
 * Container único — define a largura máxima do conteúdo.
 *
 * Tokens: --container-narrow (960) / --container-base (1280) / --container-wide (1440)
 *
 * REGRA: nenhum componente de página deve usar `max-w-*` diretamente.
 * Sempre envolver em <Container> com o tamanho apropriado.
 */
export function Container({
  size = "base",
  className,
  children,
  as: Tag = "div",
}: ContainerProps) {
  return <Tag className={cn(sizeClass[size], className)}>{children}</Tag>;
}
