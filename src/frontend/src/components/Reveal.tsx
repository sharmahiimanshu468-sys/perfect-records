import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";
import type { RevealDirection } from "@/types";
import type { ElementType, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  direction?: RevealDirection;
  /** Stagger slot 1-6, mapped to the .stagger-* utilities. */
  delay?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  threshold?: number;
};

/**
 * Wraps content in the design system's reveal primitive. The element carries
 * `data-reveal` (initial state) and flips `data-revealed` on every viewport
 * entry, so the animation replays on each scroll pass in both directions.
 */
export function Reveal({
  children,
  as: Tag = "div",
  direction = "up",
  delay,
  className,
  threshold,
}: RevealProps) {
  const { ref, revealed } = useReveal<HTMLDivElement>({ threshold });

  return (
    <Tag
      ref={ref}
      data-reveal={direction}
      data-revealed={revealed ? "true" : "false"}
      className={cn(delay ? `stagger-${delay}` : undefined, className)}
    >
      {children}
    </Tag>
  );
}
