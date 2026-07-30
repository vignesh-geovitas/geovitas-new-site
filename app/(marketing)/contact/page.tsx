import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { StaggerList, StaggerItem } from "@/components/ui/stagger";
import { MotionCard } from "@/components/ui/motion-card";
import { Button, ArrowRight } from "@/components/ui/button";
import { ImageSlot } from "@/components/ui/image-slot";
import { Parallax } from "@/components/ui/parallax";
import { PageHeader } from "@/components/site/page-header";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
  ENQUIRY_SUBJECTS,
  REGISTERED_ADDRESS,
  mailto,
} from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to Geovitas about a regulatory exposure position, a Green Factory 360 AI demonstration, or a sector engagement. Registered office in Chennai, Tamil Nadu.",
};

/**
 * NO FORM, BY DECISION. There is no backend on this site, and a contact form
 * that posts nowhere — or into a third-party inbox nobody watches — is worse
 * than no form: it silently loses enquiries and takes on personal data the
 * privacy policy has not been written to cover yet.
 *
 * So every route in is a mailto with the subject pre-filled, which is also how
 * the closing CTA block and the platform page already work. Subjects come from
 * lib/contact.ts so the inbox filters keep matching if the copy is reworded.
 *
 * If a real form is wanted later, it needs a route handler and a decision on
 * where submissions are stored — at which point /privacy stops being a
 * placeholder and becomes load-bearing.
 */

type Route = {
  title: string;
  body: string;
  subject: string;
  cta: string;
  icon: ReactNode;
  /** The one that should carry the primary weight. */
  primary?: boolean;
};

const ROUTES: readonly Route[] = [
  {
    title: "Executive briefing",
    body: "Forty-five minutes with our practice leads. You leave with a written position on your regulatory exposure and the specific data gaps standing between you and assurance.",
    subject: ENQUIRY_SUBJECTS.briefing,
    cta: "Request a briefing",
    icon: <CalendarIcon />,
    primary: true,
  },
  {
    title: "Platform demonstration",
    body: "A working walkthrough of Green Factory 360 AI against your own reporting boundary — what it ingests, what it maps to, and what an assurance provider sees.",
    subject: ENQUIRY_SUBJECTS.demo,
    cta: "Book a demo",
    icon: <MonitorIcon />,
  },
  {
    title: "Everything else",
    body: "Partnerships, procurement and press. Tell us which of the three practices your question sits closest to and it reaches the right desk faster.",
    subject: ENQUIRY_SUBJECTS.general,
    cta: "Send an enquiry",
    icon: <MailIcon />,
  },
];

/** What a first conversation actually covers — carried over from the CTA block. */
const AGENDA = [
  "Your CBAM certificate exposure under the current phase-in schedule",
  "SEBI BRSR Core data gaps that will block reasonable assurance",
  "CCTS credit origination potential against verified reductions",
  "Where physical abatement clears your hurdle rate — and where it does not",
] as const;

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Start with the exposure, not the pitch."
        lede="The most useful first conversation is a specific one. Tell us what you export, what you report against, or what you are being asked to prove — and we will come back with a position rather than a capability deck."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      >
        <Button href={mailto(ENQUIRY_SUBJECTS.briefing)} variant="primary" size="lg">
          Schedule an executive briefing
          <ArrowRight />
        </Button>
        <Button href="/exposure" variant="outline" size="lg">
          Model your exposure first
        </Button>
      </PageHeader>

      {/* ===================== Routes in ===================== */}
      <section className="border-t border-ink-200 bg-white">
        <Container className="py-14 sm:py-16 lg:py-28">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>How to reach us</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-6 text-h2 font-bold text-ink-950">
                Three ways in.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 text-lead text-ink-600">
                Each opens a message with the subject already set, so your
                enquiry lands with the right practice rather than in a queue.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {ROUTES.map((route, index) => (
              <MotionCard
                key={route.title}
                delay={index * 0.08}
                className="flex h-full flex-col rounded-card border border-ink-200 bg-white p-7 shadow-card
                           transition-colors duration-300 ease-brand hover:border-brand-cyan/50"
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg
                             border border-ink-200 bg-white text-brand-cyan-ink shadow-card"
                >
                  {route.icon}
                </span>
                <h3 className="mt-5 text-h3 font-bold text-ink-950">{route.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">
                  {route.body}
                </p>
                {/* mt-auto pins the action to the card foot, so three cards of
                    unequal copy length still line their buttons up. */}
                <div className="mt-auto pt-7">
                  <Button
                    href={mailto(route.subject)}
                    variant={route.primary ? "primary" : "outline"}
                    size="md"
                    className="w-full justify-between"
                  >
                    {route.cta}
                    <ArrowRight />
                  </Button>
                </div>
              </MotionCard>
            ))}
          </div>
        </Container>
      </section>

      {/* ===================== Details + agenda ===================== */}
      <section className="border-t border-ink-200 bg-ink-50">
        <Container className="py-14 sm:py-16 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* ---- Registered details ---- */}
            <div className="min-w-0 lg:col-span-5">
              <Reveal>
                <Eyebrow>Registered office</Eyebrow>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-6 text-h2 font-bold text-ink-950">
                  Chennai, Tamil Nadu.
                </h2>
              </Reveal>

              <Reveal delay={0.12}>
                <dl className="mt-9 space-y-6">
                  <div className="border-t border-ink-200 pt-5">
                    <dt className="font-mono text-eyebrow uppercase text-ink-500">
                      Address
                    </dt>
                    <dd className="mt-2.5">
                      <address className="space-y-1 text-[0.9375rem] not-italic leading-relaxed text-ink-600">
                        {REGISTERED_ADDRESS.map((line) => (
                          <p key={line}>{line}</p>
                        ))}
                      </address>
                    </dd>
                  </div>

                  <div className="border-t border-ink-200 pt-5">
                    <dt className="font-mono text-eyebrow uppercase text-ink-500">
                      Email
                    </dt>
                    <dd className="mt-2.5 text-[0.9375rem]">
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="text-brand-cyan-ink transition-colors duration-200 hover:text-ink-950"
                      >
                        {CONTACT_EMAIL}
                      </a>
                    </dd>
                  </div>

                  <div className="border-t border-ink-200 pt-5">
                    <dt className="font-mono text-eyebrow uppercase text-ink-500">
                      Telephone
                    </dt>
                    <dd className="tnum mt-2.5 text-[0.9375rem]">
                      <a
                        href={CONTACT_PHONE_HREF}
                        className="text-brand-cyan-ink transition-colors duration-200 hover:text-ink-950"
                      >
                        {CONTACT_PHONE}
                      </a>
                    </dd>
                  </div>
                </dl>
              </Reveal>

              {/* The room the briefing happens in, deliberately empty. The page
                  has no form and no map, which left the whole left column as a
                  definition list. */}
              <Reveal delay={0.16}>
                <Parallax className="mt-10 overflow-hidden rounded-card" speed={0.06}>
                  <ImageSlot
                    id="contact-briefing"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                  />
                </Parallax>
              </Reveal>
            </div>

            {/* ---- What a first conversation covers ---- */}
            <div className="min-w-0 lg:col-span-6 lg:col-start-7">
              <Reveal>
                <div className="glass-strong rounded-card p-7 lg:p-8">
                  <p className="font-mono text-eyebrow uppercase text-ink-600">
                    What a first conversation covers
                  </p>
                  <StaggerList className="mt-6 space-y-5">
                    {AGENDA.map((item, index) => (
                      <StaggerItem
                        key={item}
                        className="flex gap-4 border-b border-ink-150 pb-5 last:border-b-0 last:pb-0"
                      >
                        <span className="tnum shrink-0 font-mono text-sm text-brand-cyan-ink">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[0.9375rem] leading-relaxed text-ink-600">
                          {item}
                        </span>
                      </StaggerItem>
                    ))}
                  </StaggerList>

                  <p className="mt-7 border-t border-ink-200 pt-5 text-xs leading-relaxed text-ink-500">
                    Bring your export destinations, the frameworks you report
                    against, and whoever owns the data. Nothing needs to be
                    audit-ready before the conversation — establishing what is
                    missing is most of the value of it.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

/* -- Icons: 1.5px line work, matched to the site's icon set ----------------- */

/** Calendar — a scheduled briefing. */
function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
      <path
        d="M4 8a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V8zm0 3h16M8 4v4m8-4v4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Display — a platform walkthrough. */
function MonitorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
      <path
        d="M3 5.5a1.5 1.5 0 011.5-1.5h15A1.5 1.5 0 0121 5.5v9a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 14.5v-9zM9 20h6m-3-4v4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Envelope — general correspondence. */
function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
      <path
        d="M3 7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7zm0 .5l9 6 9-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
