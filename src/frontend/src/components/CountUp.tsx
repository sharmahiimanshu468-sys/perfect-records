import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  value: number;
  suffix?: string;
  duration?: number;
  /** Decimal places to render while counting. Defaults to 0. */
  decimals?: number;
  className?: string;
};

/**
 * Counts from 0 to `value` every time it enters the viewport, and resets when
 * it leaves so the animation replays on each scroll pass in both directions.
 */
export function CountUp({
  value,
  suffix = "",
  duration = 1600,
  decimals = 0,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setActive(entry.isIntersecting);
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active) {
      setDisplay(0);
      return;
    }

    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      // easeOutExpo for a premium settle
      const eased = progress === 1 ? 1 : 1 - 2 ** (-10 * progress);
      const raw = eased * value;
      setDisplay(
        decimals > 0 ? Number(raw.toFixed(decimals)) : Math.round(raw),
      );
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [active, value, duration, decimals]);

  return (
    <span ref={ref} className={className}>
      {decimals > 0 ? display.toFixed(decimals) : display}
      {suffix}
    </span>
  );
}
