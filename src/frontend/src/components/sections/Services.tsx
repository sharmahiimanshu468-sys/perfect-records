import { Reveal } from "@/components/Reveal";
import { SERVICES } from "@/lib/site";
import {
  Check,
  Globe2,
  Headphones,
  type LucideIcon,
  Music4,
  PenLine,
  Sparkles,
  Timer,
} from "lucide-react";

const SERVICE_ICONS: Record<string, LucideIcon> = {
  "full-track-production": Music4,
  "devotional-spiritual": Sparkles,
  "custom-compositions": PenLine,
  "mixing-mastering": Headphones,
};

const GLOBAL_POINTS: { id: string; icon: LucideIcon; label: string }[] = [
  { id: "remote", icon: Globe2, label: "Remote-first, worldwide" },
  { id: "turnaround", icon: Timer, label: "Quick turnaround" },
  { id: "delivery", icon: Check, label: "Streaming-ready delivery" },
];

export function Services() {
  return (
    <section
      id="services"
      data-ocid="services.section"
      className="relative border-b border-border py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              What we do
            </p>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-foreground">
              Four services, one finished release.
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Bring us a rough idea or a finished vocal — we take it through
              production, mix, master and the visuals that put it in front of
              people.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {SERVICES.map((service, index) => {
            const Icon = SERVICE_ICONS[service.id] ?? Music4;
            return (
              <Reveal
                key={service.id}
                delay={((index % 2) + 1) as 1 | 2}
                className="h-full"
              >
                <article
                  data-ocid={`services.card.${index + 1}`}
                  className="hover-lift group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.imageAlt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-cinematic group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />
                    <span className="absolute left-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/85 text-foreground backdrop-blur transition-colors duration-300 group-hover:border-foreground/25">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <h3 className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {service.blurb}
                    </p>
                    <ul className="mt-5 space-y-2.5">
                      {service.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-center gap-2.5 text-sm text-foreground/85"
                        >
                          <Check
                            className="h-4 w-4 shrink-0 text-foreground/50"
                            strokeWidth={2}
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={1} className="mt-16">
          <div
            data-ocid="services.global_block"
            className="glow-edge relative overflow-hidden rounded-lg border border-border bg-gradient-subtle p-8 sm:p-12"
          >
            <div className="glow-orb -right-16 -top-24 h-72 w-72" />
            <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                  Global Services
                </p>
                <h3 className="mt-4 font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-foreground">
                  Your studio, wherever you are.
                </h3>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
                  We produce remotely for creators across the world — send your
                  stems, voice notes or a rough demo from any timezone and get
                  back a finished, release-ready record. Clear milestones, quick
                  turnaround and no studio visit required.
                </p>
              </div>
              <ul className="space-y-3">
                {GLOBAL_POINTS.map((point) => (
                  <li
                    key={point.id}
                    className="flex items-center gap-3 rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground/90"
                  >
                    <point.icon
                      className="h-4 w-4 shrink-0 text-foreground/50"
                      strokeWidth={1.75}
                    />
                    {point.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
