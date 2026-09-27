import { NAV_LINKS, SERVICES, SITE } from "@/lib/site";
import { Instagram, Mail, MapPin, MessageCircle, Youtube } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      data-ocid="footer.section"
      className="border-t border-border bg-secondary/60"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:py-20">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <span className="brand-sheen flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gold/40 bg-foreground shadow-subtle ring-1 ring-foreground/10">
              <img
                src={SITE.emblem}
                alt={SITE.emblemAlt}
                width={40}
                height={40}
                className="h-full w-full scale-[1.18] object-cover"
                loading="lazy"
                decoding="async"
              />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-base font-semibold text-foreground">
                Perfect Records
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                Official
              </span>
            </span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {SITE.description}
          </p>
          <p className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <MapPin
              className="h-3.5 w-3.5 text-foreground/60"
              strokeWidth={1.75}
            />
            {SITE.location}
          </p>
        </div>

        <nav aria-label="Services" className="min-w-0">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            Services
          </h2>
          <ul className="mt-5 space-y-3">
            {SERVICES.map((service) => (
              <li key={service.id}>
                <a
                  href="#services"
                  data-ocid={`footer.service_link.${service.id}`}
                  className="text-sm text-muted-foreground transition-smooth hover:text-foreground"
                >
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Studio" className="min-w-0">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            Studio
          </h2>
          <ul className="mt-5 space-y-3">
            {NAV_LINKS.filter((link) => link.href !== "#home").map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-ocid={`footer.nav_link.${link.label.toLowerCase().replace(/\s+/g, "_")}`}
                  className="text-sm text-muted-foreground transition-smooth hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            Get in touch
          </h2>
          <ul className="mt-5 space-y-3">
            <li>
              <a
                href={SITE.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="footer.whatsapp_link"
                className="inline-flex items-center gap-2.5 text-sm text-muted-foreground transition-smooth hover:text-foreground"
              >
                <MessageCircle
                  className="h-4 w-4 text-foreground/60"
                  strokeWidth={1.75}
                />
                {SITE.whatsappNumber}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE.email}`}
                data-ocid="footer.email_link"
                className="inline-flex items-center gap-2.5 break-all text-sm text-muted-foreground transition-smooth hover:text-foreground"
              >
                <Mail
                  className="h-4 w-4 shrink-0 text-foreground/60"
                  strokeWidth={1.75}
                />
                {SITE.email}
              </a>
            </li>
            <li>
              <a
                href={SITE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="footer.instagram_link"
                className="inline-flex items-center gap-2.5 text-sm text-muted-foreground transition-smooth hover:text-foreground"
              >
                <Instagram
                  className="h-4 w-4 text-foreground/60"
                  strokeWidth={1.75}
                />
                {SITE.instagramHandle}
              </a>
            </li>
            <li>
              <a
                href={SITE.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="footer.youtube_link"
                className="inline-flex items-center gap-2.5 text-sm text-muted-foreground transition-smooth hover:text-foreground"
              >
                <Youtube
                  className="h-4 w-4 text-foreground/60"
                  strokeWidth={1.75}
                />
                {SITE.youtubeHandle}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-3 px-5 py-6 sm:flex-row sm:items-center sm:px-8">
          <p className="font-mono text-xs text-muted-foreground">
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            © {year}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline decoration-border underline-offset-4 transition-smooth hover:decoration-foreground"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
