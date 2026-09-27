import { Reveal } from "@/components/Reveal";
import { PROCESS, SITE } from "@/lib/site";

export function About() {
  return (
    <section
      id="about"
      data-ocid="about.section"
      className="relative border-b border-border bg-secondary/40 py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                About the studio
              </p>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.02em] text-foreground">
                Built by producers who finish records.
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {SITE.name} is a global production studio working with
                independent artists, labels and creators. We keep the process
                simple — one team from the first demo to the final master, so
                nothing gets lost in translation.
              </p>
            </Reveal>
            <Reveal delay={3}>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                Whether you are cutting your first single or shipping a full
                album cycle, you get the same room, the same ears and the same
                attention to detail.
              </p>
            </Reveal>
          </div>

          <ol className="space-y-8">
            {PROCESS.map((step, index) => (
              <Reveal
                key={step.id}
                as="li"
                direction="right"
                delay={((index % 3) + 1) as 1 | 2 | 3}
                className="flex gap-6 border-t border-border pt-7"
              >
                <span className="font-mono text-sm font-semibold text-foreground/50">
                  {step.step}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
