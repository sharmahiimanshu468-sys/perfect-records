import { Reveal } from "@/components/Reveal";
import { GENRES } from "@/lib/site";

/**
 * Genre chips row. The track renders the genre set twice so the `-50%`
 * marquee translate loops seamlessly; each half is wide enough to fill the
 * viewport at every breakpoint.
 */
export function GenreMarquee() {
  const half = GENRES.map((genre) => ({ id: `a-${genre}`, label: genre }));
  const track = [
    ...half,
    ...GENRES.map((genre) => ({ id: `b-${genre}`, label: genre })),
  ];

  return (
    <section
      data-ocid="genres.section"
      aria-label="Genres we produce"
      className="overflow-hidden border-b border-border bg-secondary/50 py-10"
    >
      <div className="mx-auto mb-6 w-full max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            Genres we live in
          </p>
        </Reveal>
      </div>

      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-28"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-28"
        />
        <div className="flex w-max marquee-track">
          {track.map((genre) => (
            <span
              key={genre.id}
              className="mx-2.5 inline-flex items-center gap-3 rounded-full border border-border bg-background px-5 py-2.5 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground transition-colors duration-300 hover:border-foreground/25 hover:text-foreground sm:mx-3"
            >
              <span className="accent-dot" />
              {genre.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
