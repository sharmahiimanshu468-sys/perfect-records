import { SITE } from "@/lib/site";
import { MessageCircle } from "lucide-react";

/** Floating quick-contact button, visible across every section. */
export function WhatsAppButton() {
  return (
    <a
      href={SITE.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-ocid="whatsapp.button"
      aria-label={`Chat with ${SITE.name} on WhatsApp`}
      className="group fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-3 text-sm font-medium text-foreground shadow-elevated transition-smooth hover:border-foreground/25 hover:bg-primary hover:text-primary-foreground sm:bottom-8 sm:right-8"
    >
      <span className="relative flex h-5 w-5 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-pulse-glow rounded-full bg-foreground/10" />
        <MessageCircle className="relative h-5 w-5" strokeWidth={1.75} />
      </span>
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
