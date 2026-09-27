import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

type ParallaxProps = {
  children: React.ReactNode;
  /** Pixels of vertical travel across the element's full scroll range. */
  speed?: number;
  className?: string;
};

/**
 * Scroll-linked depth layer. Writes `--parallax-y` on the wrapper, which the
 * `.parallax-layer` utility consumes. Uses rAF-throttled scroll reads and is
 * disabled entirely under `prefers-reduced-motion`.
 */
export function Parallax({ children, speed = 60, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      // -1 (below viewport) .. 1 (above viewport)
      const progress =
        (viewport / 2 - (rect.top + rect.height / 2)) /
        (viewport / 2 + rect.height / 2);
      setOffset(Math.max(-1, Math.min(1, progress)) * speed);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed]);

  return (
    <div
      ref={ref}
      className={cn("parallax-layer", className)}
      style={{ "--parallax-y": `${offset}px` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
