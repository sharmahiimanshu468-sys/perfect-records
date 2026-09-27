import { Reveal } from "@/components/Reveal";
import { PORTFOLIO } from "@/lib/site";
import type { PortfolioItem } from "@/types";
import { ArrowUpRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export function Portfolio() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex === null ? null : PORTFOLIO[activeIndex];
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setActiveIndex(null);
    lastTriggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex, close]);

  return (
    <section
      id="portfolio"
      data-ocid="portfolio.section"
      className="border-b border-border py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                Selected work
              </p>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-foreground">
                Records, videos and artwork.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={2}>
            <a
              href="#contact"
              data-ocid="portfolio.cta"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-smooth hover:text-muted-foreground"
            >
              Commission a project
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PORTFOLIO.map((item, index) => (
            <Reveal
              key={item.id}
              delay={((index % 3) + 1) as 1 | 2 | 3}
              className="h-full"
            >
              <button
                type="button"
                data-ocid={`portfolio.item.${index + 1}`}
                aria-label={`Open details for ${item.title}`}
                onClick={(event) => {
                  lastTriggerRef.current = event.currentTarget;
                  setActiveIndex(index);
                }}
                className="hover-lift group flex h-full w-full flex-col overflow-hidden rounded-lg border border-border bg-card text-left"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-cinematic group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/70 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-border bg-background/85 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground backdrop-blur">
                    {item.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {item.meta}
                  </p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {active ? (
        <PortfolioLightbox item={active} closeRef={closeRef} onClose={close} />
      ) : null}
    </section>
  );
}

type PortfolioLightboxProps = {
  item: PortfolioItem;
  closeRef: React.RefObject<HTMLButtonElement | null>;
  onClose: () => void;
};

function PortfolioLightbox({
  item,
  closeRef,
  onClose,
}: PortfolioLightboxProps) {
  return (
    <dialog
      open
      data-ocid="portfolio.modal"
      aria-label={`${item.title} details`}
      className="fixed inset-0 z-50 m-0 flex h-full max-h-none w-full max-w-none items-center justify-center border-0 bg-transparent p-4 sm:p-8"
    >
      <button
        type="button"
        aria-label="Close details"
        data-ocid="portfolio.close_button"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-foreground/25 backdrop-blur-sm"
      />
      <div className="relative z-10 grid w-full max-w-4xl overflow-hidden rounded-lg border border-border bg-card shadow-elevated-lg md:grid-cols-2">
        <div className="relative aspect-[4/3] md:aspect-auto md:h-full">
          <img
            src={item.image}
            alt={item.imageAlt}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-between gap-8 p-6 sm:p-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
              {item.category}
            </p>
            <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {item.title}
            </h3>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {item.meta}
            </p>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              {item.imageAlt}. Produced end-to-end in the Perfect Records studio
              — from the first session to the final delivery.
            </p>
          </div>
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              data-ocid="portfolio.modal_cta"
              onClick={() => {
                onClose();
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-smooth hover:text-muted-foreground"
            >
              Start a project like this
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </button>
            <button
              ref={closeRef}
              type="button"
              data-ocid="portfolio.close_button"
              onClick={onClose}
              aria-label="Close details"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-smooth hover:border-foreground/25 hover:text-foreground"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
