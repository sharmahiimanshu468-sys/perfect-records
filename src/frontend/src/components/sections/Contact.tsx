import { createActor } from "@/backend";
import { ProjectType } from "@/backend";
import { Reveal } from "@/components/Reveal";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation } from "@tanstack/react-query";
import {
  CheckCircle2,
  Instagram,
  Mail,
  MessageCircle,
  Send,
  Youtube,
} from "lucide-react";
import { useEffect, useState } from "react";

/** Contact channels required by the brief. */
const CONTACT = {
  whatsappNumber: "+91 79741 22658",
  whatsappUrl: "https://wa.me/917974122658",
  email: "Perfectrecords2023@gmail.com",
  instagramHandle: "@Perfectrecordsofficial",
  instagramUrl: "https://instagram.com/perfectrecordsofficial",
  youtubeHandle: "@Perfectrecordsofficial",
  youtubeUrl: "https://youtube.com/@PerfectRecordsofficial",
} as const;

/** Project types offered in the form, mapped to the backend enum. */
const PROJECT_TYPES: { value: ProjectType; label: string }[] = [
  { value: ProjectType.videoEditing, label: "Video Editing" },
  { value: ProjectType.posterDesign, label: "Poster Design" },
  { value: ProjectType.fullTrackProduction, label: "Full Track Production" },
  { value: ProjectType.mixingMastering, label: "Mixing & Mastering" },
  { value: ProjectType.devotionalSpiritual, label: "Devotional / Spiritual" },
  { value: ProjectType.customComposition, label: "Custom Composition" },
  { value: ProjectType.other, label: "Something Else" },
];

/** Window event the branch CTAs dispatch to pre-fill the project type. */
export const INQUIRY_PREFILL_EVENT = "perfect-records:inquiry-prefill";

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

type Draft = {
  name: string;
  email: string;
  projectType: ProjectType;
  message: string;
};

const EMPTY_DRAFT: Draft = {
  name: "",
  email: "",
  projectType: ProjectType.videoEditing,
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(draft: Draft): FieldErrors {
  const errors: FieldErrors = {};
  if (draft.name.trim().length === 0) {
    errors.name = "Please tell us your name.";
  }
  if (draft.email.trim().length === 0) {
    errors.email = "We need an email to reply to.";
  } else if (!EMAIL_PATTERN.test(draft.email.trim())) {
    errors.email = "That email does not look right.";
  }
  if (draft.message.trim().length === 0) {
    errors.message = "Add a line or two about the project.";
  }
  return errors;
}

export function Contact() {
  const { actor } = useActor(createActor);
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sent, setSent] = useState(false);

  const mutation = useMutation({
    mutationFn: async (input: Draft) => {
      if (!actor) throw new Error("Backend is not ready");
      const result = await actor.submitInquiry({
        name: input.name.trim(),
        email: input.email.trim(),
        projectType: input.projectType,
        message: input.message.trim(),
      });
      if (result.__kind__ === "err") {
        throw result.err;
      }
      return result.ok;
    },
  });

  // Branch CTAs pre-fill the project type and scroll the form into view.
  useEffect(() => {
    const handlePrefill = (event: Event) => {
      const detail = (event as CustomEvent<{ projectType?: ProjectType }>)
        .detail;
      if (!detail?.projectType) return;
      setSent(false);
      setErrors({});
      setDraft((current) => ({
        ...current,
        projectType: detail.projectType as ProjectType,
      }));
    };
    window.addEventListener(INQUIRY_PREFILL_EVENT, handlePrefill);
    return () =>
      window.removeEventListener(INQUIRY_PREFILL_EVENT, handlePrefill);
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(draft);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const captured = draft;
    setDraft(EMPTY_DRAFT);
    mutation.mutate(captured, {
      onSuccess: () => setSent(true),
      onError: (error) => {
        const kind =
          typeof error === "string"
            ? error
            : ((error as { __kind__?: string })?.__kind__ ?? "");
        const fieldErrors: FieldErrors = {};
        if (kind === "invalidName")
          fieldErrors.name = "Please check your name.";
        if (kind === "invalidEmail")
          fieldErrors.email = "Please check your email address.";
        if (kind === "invalidMessage")
          fieldErrors.message = "Please add a little more detail.";
        setErrors(fieldErrors);
        // Restore the draft unless the user already started typing again.
        setDraft((current) =>
          current.name === "" && current.email === "" && current.message === ""
            ? captured
            : current,
        );
      },
    });
  };

  const update = <K extends keyof Draft>(key: K, value: Draft[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
    if (key in errors) {
      setErrors((current) => ({ ...current, [key]: undefined }));
    }
  };

  return (
    <section
      id="contact"
      data-ocid="contact.section"
      className="relative py-24 sm:py-32"
    >
      <div className="glow-orb -left-20 bottom-0 h-72 w-72" />
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                Start a project
              </p>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.02em] text-foreground">
                Tell us what you are making.
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
                Share a rough idea, a reference track or a deadline — we will
                come back with a plan and a quote. Prefer to talk it through?
                Message us directly.
              </p>
            </Reveal>
            <Reveal delay={3}>
              <div className="mt-9 flex flex-col gap-3">
                <a
                  href={CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="contact.whatsapp_link"
                  className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-3 text-sm text-foreground transition-smooth hover:border-foreground/25"
                >
                  <MessageCircle
                    className="h-4 w-4 shrink-0 text-foreground/60"
                    strokeWidth={1.75}
                  />
                  WhatsApp {CONTACT.whatsappNumber}
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  data-ocid="contact.email_link"
                  className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-3 text-sm text-foreground transition-smooth hover:border-foreground/25"
                >
                  <Mail
                    className="h-4 w-4 shrink-0 text-foreground/60"
                    strokeWidth={1.75}
                  />
                  <span className="min-w-0 break-all">{CONTACT.email}</span>
                </a>
                <a
                  href={CONTACT.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="contact.instagram_link"
                  className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-3 text-sm text-foreground transition-smooth hover:border-foreground/25"
                >
                  <Instagram
                    className="h-4 w-4 shrink-0 text-foreground/60"
                    strokeWidth={1.75}
                  />
                  {CONTACT.instagramHandle}
                </a>
                <a
                  href={CONTACT.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="contact.youtube_link"
                  className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-3 text-sm text-foreground transition-smooth hover:border-foreground/25"
                >
                  <Youtube
                    className="h-4 w-4 shrink-0 text-foreground/60"
                    strokeWidth={1.75}
                  />
                  {CONTACT.youtubeHandle}
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal direction="right" delay={2}>
            <div className="rounded-lg border border-border bg-card p-6 shadow-elevated sm:p-8">
              {sent ? (
                <div
                  data-ocid="contact.success_state"
                  className="flex flex-col items-start gap-4 py-6"
                >
                  <CheckCircle2
                    className="h-10 w-10 text-foreground"
                    strokeWidth={1.5}
                  />
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    Brief received.
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Thanks — we will reply within one working day. For anything
                    urgent, ping us on WhatsApp.
                  </p>
                  <button
                    type="button"
                    data-ocid="contact.send_another_button"
                    onClick={() => {
                      setSent(false);
                      setErrors({});
                    }}
                    className="mt-2 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-smooth hover:border-foreground/25"
                  >
                    Send another brief
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="min-w-0">
                      <label
                        htmlFor="contact-name"
                        className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
                      >
                        Your name
                      </label>
                      <input
                        id="contact-name"
                        data-ocid="contact.name_input"
                        type="text"
                        value={draft.name}
                        aria-invalid={errors.name ? true : undefined}
                        aria-describedby={
                          errors.name ? "contact-name-error" : undefined
                        }
                        onChange={(event) => update("name", event.target.value)}
                        placeholder="Aarav Sharma"
                        className="w-full rounded-md border border-input bg-card px-4 py-3 text-sm text-foreground shadow-subtle placeholder:text-muted-foreground/70 transition-smooth focus:border-foreground/30 focus:outline-none"
                      />
                      {errors.name ? (
                        <p
                          id="contact-name-error"
                          data-ocid="contact.name_error"
                          className="mt-2 text-xs text-destructive"
                        >
                          {errors.name}
                        </p>
                      ) : null}
                    </div>
                    <div className="min-w-0">
                      <label
                        htmlFor="contact-email"
                        className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
                      >
                        Email
                      </label>
                      <input
                        id="contact-email"
                        data-ocid="contact.email_input"
                        type="email"
                        value={draft.email}
                        aria-invalid={errors.email ? true : undefined}
                        aria-describedby={
                          errors.email ? "contact-email-error" : undefined
                        }
                        onChange={(event) =>
                          update("email", event.target.value)
                        }
                        placeholder="you@studio.com"
                        className="w-full rounded-md border border-input bg-card px-4 py-3 text-sm text-foreground shadow-subtle placeholder:text-muted-foreground/70 transition-smooth focus:border-foreground/30 focus:outline-none"
                      />
                      {errors.email ? (
                        <p
                          id="contact-email-error"
                          data-ocid="contact.email_error"
                          className="mt-2 text-xs text-destructive"
                        >
                          {errors.email}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="min-w-0">
                    <label
                      htmlFor="contact-project-type"
                      className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
                    >
                      Project type
                    </label>
                    <select
                      id="contact-project-type"
                      data-ocid="contact.project_type_select"
                      value={draft.projectType}
                      onChange={(event) =>
                        update("projectType", event.target.value as ProjectType)
                      }
                      className="w-full rounded-md border border-input bg-card px-4 py-3 text-sm text-foreground shadow-subtle transition-smooth focus:border-foreground/30 focus:outline-none"
                    >
                      {PROJECT_TYPES.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="min-w-0">
                    <label
                      htmlFor="contact-message"
                      className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
                    >
                      Project brief
                    </label>
                    <textarea
                      id="contact-message"
                      data-ocid="contact.message_textarea"
                      rows={5}
                      value={draft.message}
                      aria-invalid={errors.message ? true : undefined}
                      aria-describedby={
                        errors.message ? "contact-message-error" : undefined
                      }
                      onChange={(event) =>
                        update("message", event.target.value)
                      }
                      placeholder="Two verses and a hook, Punjabi pop, need it mixed and mastered by next month."
                      className="w-full resize-none rounded-md border border-input bg-card px-4 py-3 text-sm text-foreground shadow-subtle placeholder:text-muted-foreground/70 transition-smooth focus:border-foreground/30 focus:outline-none"
                    />
                    {errors.message ? (
                      <p
                        id="contact-message-error"
                        data-ocid="contact.message_error"
                        className="mt-2 text-xs text-destructive"
                      >
                        {errors.message}
                      </p>
                    ) : null}
                  </div>

                  {mutation.isError && Object.keys(errors).length === 0 ? (
                    <p
                      data-ocid="contact.error_state"
                      className="text-xs text-destructive"
                    >
                      Something went wrong sending your brief. Please try again
                      or message us on WhatsApp.
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    data-ocid="contact.submit_button"
                    disabled={mutation.isPending}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-subtle transition-smooth hover:bg-primary/90 hover:shadow-elevated disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-subtle"
                  >
                    <Send className="h-4 w-4" strokeWidth={2} />
                    {mutation.isPending ? "Sending…" : "Send project brief"}
                  </button>
                  <p className="text-center text-xs text-muted-foreground">
                    We reply within one working day.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
