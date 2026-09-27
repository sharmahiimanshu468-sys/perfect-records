import { CountUp } from "@/components/CountUp";
import { Reveal } from "@/components/Reveal";
import { SITE } from "@/lib/site";
import { ArrowUpRight, Youtube } from "lucide-react";

type StudioStat = {
  id: string;
  value: number;
  suffix: string;
  label: string;
  /** Rendered verbatim instead of a count-up when the value is not numeric. */
  literal?: string;
};

const STUDIO_STATS: StudioStat[] = [
  { id: "subscribers", value: 2.31, suffix: "K", label: "Subscribers" },
  { id: "videos", value: 52, suffix: "", label: "Videos" },
  { id: "views", value: 251357, suffix: "", label: "Total views" },
  {
    id: "joined",
    value: 0,
    suffix: "",
    label: "Joined",
    literal: "24 Aug 2023",
  },
];

export function Stats() {
  return (
    <section
      id="stats"
      data-ocid="stats.section"
      aria-label="Studio statistics"
      className="relative overflow-hidden border-b border-border bg-background py-20 sm:py-24"
    >
      <div
        aria-hidden="true"
        className="glow-orb -left-24 top-1/2 h-72 w-72 -translate-y-1/2"
      />
      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            The numbers so far
          </p>
        </Reveal>

        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {STUDIO_STATS.map((stat, index) => (
            <Reveal
              key={stat.id}
              delay={((index % 4) + 1) as 1 | 2 | 3 | 4}
              className="border-t border-border pt-6"
            >
              <dd
                data-ocid={`stats.value.${index + 1}`}
                className="font-mono text-[clamp(2.25rem,6vw,3.5rem)] font-semibold leading-none tracking-[-0.03em] text-foreground"
              >
                {stat.literal ? (
                  <span className="text-[clamp(1.5rem,3.4vw,2.25rem)]">
                    {stat.literal}
                  </span>
                ) : (
                  <CountUp
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.value % 1 === 0 ? 0 : 2}
                  />
                )}
              </dd>
              <dt className="mt-3 text-sm text-muted-foreground">
                {stat.label}
              </dt>
            </Reveal>
          ))}
        </dl>

        <Reveal delay={2} className="mt-14">
          <a
            href={SITE.youtubeUrl}
            target="_blank"
            rel="noreferrer noopener"
            data-ocid="stats.youtube_link"
            className="group flex flex-col gap-6 rounded-lg border border-border bg-card p-6 transition-smooth hover:border-foreground/20 sm:flex-row sm:items-center sm:justify-between sm:p-8"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-foreground">
                <Youtube className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                  Featured release
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  Watch the latest on YouTube
                </h3>
                <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                  New records, music videos and behind-the-scenes cuts land on{" "}
                  {SITE.youtubeHandle} first.
                </p>
              </div>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-foreground">
              Visit channel
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
