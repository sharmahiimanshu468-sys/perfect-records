import { useEffect, useRef, useState } from "react";

/**
 * Re-arming scroll reveal.
 *
 * Returns a ref to attach to the element and a boolean that flips to `true`
 * every time the element enters the viewport and back to `false` when it
 * leaves. Because the observer un-observes nothing and simply toggles state on
 * both entry and exit, the reveal replays on every scroll pass in both
 * directions.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(options?: {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}) {
  const {
    threshold = 0.18,
    rootMargin = "0px 0px -10% 0px",
    once = false,
  } = options ?? {};
  const ref = useRef<T | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setRevealed(false);
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, revealed };
}
