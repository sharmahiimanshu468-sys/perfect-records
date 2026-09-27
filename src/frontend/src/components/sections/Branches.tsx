import { ProjectType } from "@/backend";
import { Parallax } from "@/components/Parallax";
import { Reveal } from "@/components/Reveal";
import { INQUIRY_PREFILL_EVENT } from "@/components/sections/Contact";
import { SERVICES, VIDEO_ALBUM_POSTER } from "@/lib/site";
import { ArrowRight, Clapperboard, Palette } from "lucide-react";

const BRANCHES = [
  {
    id: "video-editing",
    icon: Clapperboard,
    eyebrow: "Branch 01",
    title: "Video Editing",
    body: "Music videos, lyric videos and short-form cuts edited to the beat — graded, captioned and exported for every platform.",
    bullets: [
      "Beat-synced cuts and transitions",
      "Colour grading and clean-up",
      "Vertical, square and widescreen exports",
      "Reels and shorts built for the algorithm",
    ],
    projectType: ProjectType.videoEditing,
    image: VIDEO_ALBUM_POSTER.image,
    imageAlt: VIDEO_ALBUM_POSTER.imageAlt,
    poster: true,
  },
  {
    id: "poster-design",
    icon: Palette,
    eyebrow: "Branch 02",
    title: "Poster Design",
    body: "Release artwork and posters with real typographic craft — designed to stop the scroll and still print razor sharp.",
    bullets: [
      "Album art and single artwork",
      "Song and lyric posters",
      "Social creatives and story kits",
      "YouTube thumbnails that earn the click",
    ],
    projectType: ProjectType.posterDesign,
    image: SERVICES[3].image,
    imageAlt: SERVICES[3].imageAlt,
    poster: false,
  },
];

/** Ask the inquiry form to open pre-filled with the given project type. */
function startProject(projectType: ProjectType) {
  window.dispatchEvent(
    new CustomEvent(INQUIRY_PREFILL_EVENT, { detail: { projectType } }),
  );
  document
    .getElementById("contact")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Branches() {
  return (
    <section
      data-ocid="branches.section"
      className="relative border-b border-border bg-secondary/40 py-24 sm:py-32"
    >
      <div className="glow-orb right-0 top-1/3 h-72 w-72" />
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              Two specialist branches
            </p>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-foreground">
              Sound is only half the release.
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 space-y-20 sm:space-y-28">
          {BRANCHES.map((branch, index) => {
            const Icon = branch.icon;
            const flipped = index % 2 === 1;
            return (
              <div
                key={branch.id}
                id={branch.id}
                data-ocid={`branches.panel.${index + 1}`}
                className="grid scroll-mt-24 items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <Reveal
                  direction={flipped ? "right" : "left"}
                  className={flipped ? "lg:order-2" : undefined}
                >
                  {branch.poster ? (
                    <div className="mx-auto w-full max-w-[22rem]">
                      <Reveal direction="cover">
                        <div className="poster-edge relative overflow-hidden rounded-lg border border-border bg-foreground shadow-elevated">
                          <Parallax speed={28}>
                            <img
                              src={branch.image}
                              alt={branch.imageAlt}
                              loading="lazy"
                              className="aspect-[3/4] w-full scale-105 object-cover"
                            />
                          </Parallax>
                          <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-gold/30" />
                        </div>
                      </Reveal>
                      <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                        {VIDEO_ALBUM_POSTER.label}
                      </p>
                    </div>
                  ) : (
                    <div className="relative overflow-hidden rounded-lg border border-border">
                      <Parallax speed={40}>
                        <img
                          src={branch.image}
                          alt={branch.imageAlt}
                          loading="lazy"
                          className="aspect-[4/3] w-full scale-110 object-cover"
                        />
                      </Parallax>
                      <div className="absolute inset-0 bg-gradient-to-t from-background/45 via-transparent to-transparent" />
                    </div>
                  )}
                </Reveal>

                <div className={flipped ? "lg:order-1" : undefined}>
                  <Reveal delay={1}>
                    <p className="inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                      {branch.eyebrow}
                    </p>
                  </Reveal>
                  <Reveal delay={2}>
                    <h3 className="mt-5 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-tight tracking-[-0.02em] text-foreground">
                      {branch.title}
                    </h3>
                  </Reveal>
                  <Reveal delay={3}>
                    <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
                      {branch.body}
                    </p>
                  </Reveal>
                  <Reveal delay={4}>
                    <ul className="mt-7 space-y-3 border-l border-border pl-5">
                      {branch.bullets.map((bullet) => (
                        <li key={bullet} className="text-sm text-foreground/85">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                  <Reveal delay={5}>
                    <button
                      type="button"
                      data-ocid={`branches.cta.${index + 1}`}
                      onClick={() => startProject(branch.projectType)}
                      className="group mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-smooth hover:bg-primary/90 hover:shadow-elevated"
                    >
                      Start a Project
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        strokeWidth={2}
                      />
                    </button>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
