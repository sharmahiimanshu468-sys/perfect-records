import { NAV_LINKS, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Menu, X, Youtube } from "lucide-react";
import { useEffect, useState } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      data-ocid="nav.header"
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-smooth",
        scrolled
          ? "border-border/70 bg-background/80 backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:h-20 sm:px-8"
      >
        <a
          href="#home"
          data-ocid="nav.wordmark_link"
          className="group flex min-w-0 items-center gap-2.5"
        >
          <span className="brand-sheen flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gold/40 bg-foreground shadow-subtle ring-1 ring-foreground/10 sm:h-11 sm:w-11">
            <img
              src={SITE.emblem}
              alt={SITE.emblemAlt}
              width={44}
              height={44}
              className="h-full w-full scale-[1.18] object-cover"
              loading="eager"
              decoding="async"
            />
          </span>
          <span className="flex min-w-0 flex-col leading-none">
            <span className="truncate font-display text-sm font-semibold tracking-tight text-foreground sm:text-base">
              Perfect Records
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
              Official
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                data-ocid={`nav.link.${link.label.toLowerCase().replace(/\s+/g, "_")}`}
                className="relative rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-smooth hover:bg-secondary hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={SITE.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="nav.subscribe_button"
            className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-smooth hover:bg-primary/90 hover:shadow-elevated sm:inline-flex"
          >
            <Youtube className="h-4 w-4" strokeWidth={2} />
            Subscribe
          </a>
          <button
            type="button"
            data-ocid="nav.menu_toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-smooth hover:border-foreground/25 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile slide-in panel */}
      <div
        id="mobile-menu"
        data-ocid="nav.mobile_panel"
        aria-hidden={!open}
        className={cn(
          "fixed inset-0 top-16 z-40 lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <button
          type="button"
          tabIndex={open ? 0 : -1}
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-foreground/20 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "absolute inset-y-0 right-0 flex w-[82%] max-w-sm flex-col gap-1 border-l border-border bg-card px-6 py-8 shadow-elevated-lg transition-transform duration-500 ease-cinematic",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            Navigate
          </p>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              tabIndex={open ? 0 : -1}
              data-ocid={`nav.mobile_link.${link.label.toLowerCase().replace(/\s+/g, "_")}`}
              onClick={() => setOpen(false)}
              className="border-b border-border/70 py-3.5 font-display text-lg text-foreground transition-smooth hover:text-muted-foreground"
            >
              {link.label}
            </a>
          ))}
          <a
            href={SITE.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={open ? 0 : -1}
            data-ocid="nav.mobile_subscribe_button"
            onClick={() => setOpen(false)}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground transition-smooth hover:bg-primary/90"
          >
            <Youtube className="h-4 w-4" strokeWidth={2} />
            Subscribe on YouTube
          </a>
        </div>
      </div>
    </header>
  );
}
