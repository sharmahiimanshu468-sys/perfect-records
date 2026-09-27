import { Parallax } from "@/components/Parallax";
import { Reveal } from "@/components/Reveal";
import { SITE } from "@/lib/site";
import { ArrowRight, Youtube } from "lucide-react";

const WAVE_BARS = [
  { id: "w1", height: 0.35 },
  { id: "w2", height: 0.6 },
  { id: "w3", height: 0.9 },
  { id: "w4", height: 0.5 },
  { id: "w5", height: 1 },
  { id: "w6", height: 0.7 },
  { id: "w7", height: 0.4 },
  { id: "w8", height: 0.85 },
  { id: "w9", height: 0.55 },
  { id: "w10", height: 0.95 },
  { id: "w11", height: 0.45 },
  { id: "w12", height: 0.75 },
  { id: "w13", height: 0.3 },
  { id: "w14", height: 0.65 },
  { id: "w15", height: 0.88 },
  { id: "w16", height: 0.5 },
];

export function Hero() {
  return (
    <section
      id="home"
      data-ocid="hero.section"
      className="relative isolate flex min-h-[92vh] items-center overflow-hidden border-b border-border/60"
    >
      <Parallax speed={90} className="absolute inset-0 -z-20">
        <img
          src="/assets/generated/hero-studio.dim_1920x1080.jpg"
          alt="Music production studio with a mixing console and warm studio lighting"
          className="h-[118%] w-full object-cover object-center"
          loading="eager"
        />
      </Parallax>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/92 to-background/55" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/40 to-background/80" />
      <div className="glow-orb -left-24 top-1/4 h-80 w-80" />

      <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <div className="max-w-3xl">
            <Reveal delay={1}>
              <p className="inline-flex items-center gap-3 rounded-full border border-border bg-card/80 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground backdrop-blur">
                <span className="accent-dot" />
                Global Music Studio
              </p>
            </Reveal>

            <Reveal delay={3}>
              <h1 className="mt-7 font-display text-[clamp(2.75rem,8vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.03em] text-foreground">
                Perfect
                <br />
                <span className="text-gradient-primary">Records</span>
              </h1>
            </Reveal>

            <Reveal delay={4}>
              <hr className="hairline-accent mt-8 w-full max-w-md" />
            </Reveal>

            <Reveal delay={5}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                <span className="font-medium text-foreground">
                  {SITE.tagline}.
                </span>{" "}
                We produce, mix and master records — then build the visuals that
                carry them.
              </p>
            </Reveal>

            <Reveal delay={5}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href="#services"
                  data-ocid="hero.explore_button"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-smooth hover:bg-primary/90 hover:shadow-elevated"
                >
                  Explore Services
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={2}
                  />
                </a>
                <a
                  href={SITE.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="hero.subscribe_button"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur transition-smooth hover:border-foreground/25"
                >
                  <Youtube className="h-4 w-4" strokeWidth={2} />
                  Subscribe on YouTube
                </a>
              </div>
            </Reveal>

            <Reveal delay={6}>
              <div
                aria-hidden="true"
                className="mt-14 flex h-14 items-end gap-1.5 sm:gap-2"
              >
                {WAVE_BARS.map((bar, index) => (
                  <span
                    key={bar.id}
                    className="w-1.5 origin-bottom animate-waveform rounded-full bg-foreground/25 sm:w-2"
                    style={{
                      height: `${bar.height * 100}%`,
                      animationDelay: `${index * 90}ms`,
                    }}
                  />
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal
            delay={3}
            direction="scale"
            className="justify-self-center lg:justify-self-end"
          >
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 scale-125 rounded-full bg-[radial-gradient(circle_at_center,oklch(var(--gold)/0.22)_0%,transparent_68%)] blur-2xl"
              />
              <div className="brand-sheen flex h-56 w-56 items-center justify-center overflow-hidden rounded-full border border-gold/40 bg-foreground shadow-elevated-lg ring-1 ring-foreground/10 sm:h-72 sm:w-72 lg:h-80 lg:w-80">
                <img
                  src={SITE.emblem}
                  alt={SITE.emblemAlt}
                  width={320}
                  height={320}
                  className="h-full w-full scale-[1.16] object-cover"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <p className="mt-6 text-center font-mono text-[11px] uppercase tracking-[0.34em] text-muted-foreground">
                Est. Studio Emblem
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
