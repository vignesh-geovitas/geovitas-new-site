import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { StaggerGroup, StaggerChild } from "@/components/ui/stagger";
import { TiltCard } from "@/components/ui/tilt-card";
import { Button, ArrowRight } from "@/components/ui/button";
import { ImageSlot } from "@/components/ui/image-slot";
import { Parallax } from "@/components/ui/parallax";
import { PageHeader } from "@/components/site/page-header";
import { PlaceholderBlock } from "@/components/site/placeholder-block";
import { CtaBlock } from "@/components/site/cta-block";
import { VERTICALS } from "@/lib/advisory";

export const metadata: Metadata = {
  title: "Company — Making Climate Action Count",
  description:
    "Geovitas builds the data infrastructure that turns emissions measurement into market access, regulatory compliance into value streams, and environmental accountability into competitive advantage.",
};

/**
 * SOURCING NOTE — READ BEFORE EDITING COPY ON THIS PAGE.
 *
 * Two outward-facing sources, both the company's own:
 *   1. The printed COMPANY OVERVIEW one-pager — the mission statement and the
 *      three "Why Geovitas" differentiators.
 *   2. Geovitas's published Our Story page — the founding rationale, the
 *      etymology, the leadership and advisor biographies, and the partner list.
 * Both are reproduced close to verbatim rather than paraphrased, so the site,
 * the leave-behind and the existing web presence say the same thing to the same
 * buyer.
 *
 * They still want a sign-off pass before launch — titles, affiliations and
 * credentials date quickly, and a website is a more permanent surface than a
 * print run. The advisor entries in particular name third-party employers.
 *
 * What is NOT here, deliberately:
 *   - The forward-looking ambition figures carried on both sources (client
 *     counts and tCO₂e reduction "by 2028"). They are targets, and the rest of
 *     this site holds a strict line against unverifiable numbers — see the
 *     sourcing note in lib/advisory.ts and the disclaimer on /exposure.
 *   - Partner logos. The names below are set as text because no logo files or
 *     usage licences have been supplied; the names themselves are published by
 *     Geovitas already.
 *   - Anything from the Green Factory 360 GTM deck beyond customer-facing
 *     product substance, per the standing confidentiality rule on this repo.
 */

/** The three differentiators, verbatim from the one-pager's "Why Geovitas". */
const DIFFERENTIATORS = [
  {
    index: "01",
    title: "We measure, not estimate",
    body: "Most carbon accounting relies on spend-based models and manual uploads. We connect directly to factory-floor hardware, city-level data sources and project-site operations, so the baseline is measured at source rather than inferred from an invoice total.",
  },
  {
    index: "02",
    title: "We turn compliance into capital",
    body: "CBAM certificates, carbon credits, green bonds and SAPCC funding all require verified data. Every output is structured to unlock a revenue or funding mechanism, not just to satisfy a reporting checkbox.",
  },
  {
    index: "03",
    title: "We are India-specific, not adapted",
    body: "India-specific emission factors, government reporting formats, domestic regulatory frameworks and local deployment capability — built for the mandates our clients actually answer to, rather than a global platform with an India skin.",
  },
] as const;

/**
 * People. Headshots supplied by the company live in `public/team/`, named for
 * the person so the mapping is checkable at a glance rather than by index.
 *
 * `photo` is optional on purpose. Anyone joining the page without a supplied
 * headshot falls back to the initials monogram that every entry used before the
 * photography landed — a deliberate typographic stand-in reads better than a
 * broken image, and it means adding a person never blocks on a photo shoot.
 *
 * All six current files are square (800px to 1200px), which is what lets them
 * be rendered as a circular avatar without art-directed cropping.
 *
 * NAME SPELLING. "Puthussery" follows the company's own published spelling.
 * Earlier collateral rendered it "Puthuserry"; the published page is the more
 * recent surface and is treated as authoritative.
 */
type Person = {
  name: string;
  role: string;
  bio: string;
  /** Path under /public. Omit to fall back to the initials monogram. */
  photo?: string;
};

const LEADERSHIP: readonly Person[] = [
  {
    name: "DSL Prasad",
    role: "Founder & Chairman",
    photo: "/team/dsl-prasad.png",
    bio: "Former Executive Director at Indian Oil Corporation, with over forty years in oil and gas. A technology specialist, he leads innovation and technology at Geovitas. An alumnus of the College of Engineering, Guindy and IIT Delhi.",
  },
  {
    name: "Venu Puthussery",
    role: "Co-founder & CEO",
    photo: "/team/venu-puthussery.png",
    bio: "Deep expertise in advising and building businesses, with a track record of driving profitable growth across roles. Global experience, financial acumen and resilient leadership; he champions sustainability as a driver of business growth and oversees partnerships and execution.",
  },
  {
    name: "Pradeep Kakkattil",
    role: "Co-founder & Director",
    photo: "/team/pradeep-kakkattil.jpg",
    bio: "A serial entrepreneur with extensive climate experience at a global level. He co-founded the Health Innovation Exchange (HIEx) in Geneva and the Women in Innovation Fund (WiNFUND), and built the UN's largest HIV Technical Support Facility.",
  },
];

const ADVISORS: readonly Person[] = [
  {
    name: "Patricia O'Hayer",
    role: "Advisor",
    photo: "/team/patricia-ohayer.jpg",
    bio: "A senior advisor and board member with over twenty years in communications, public affairs and global policy across health, sustainability and geopolitics. She has held senior leadership roles at Reckitt and within international organisations, working with UN agencies and multilateral partners.",
  },
  {
    name: "Pradeep Chintagunta",
    role: "Advisor",
    photo: "/team/pradeep-chintagunta.jpg",
    bio: "Senior faculty at the University of Chicago Booth School of Business and a recognised authority on consumer behaviour, pricing and market design. He holds a PhD in Marketing from Northwestern University, with prior degrees from Banaras Hindu University and the Indian Institute of Management.",
  },
  {
    name: "Vinod Nambiar",
    role: "Advisor",
    photo: "/team/vinod-nambiar.jpg",
    bio: "A technology and business leader with extensive experience in digital product strategy across martech and healthtech. He has co-founded and led digital ventures, combining engineering fundamentals with data-led marketing systems and innovation frameworks.",
  },
];

/**
 * Ecosystem. Names only — the descriptor is carried where Geovitas's own
 * published material supplies one, and omitted where it does not, rather than
 * being filled in from elsewhere.
 */
const PARTNERS = [
  { name: "RenewCred", note: "Carbon credits standard and registry" },
  { name: "Health Innovation Exchange", note: "Geneva" },
  { name: "CSTEP", note: null },
  { name: "Cocoparks", note: null },
] as const;

/** Reduce a name to its monogram — two letters, never three. */
function monogram(name: string): string {
  const parts = name.split(" ").filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
  return (first + last).toUpperCase();
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Geovitas"
        title="Making climate action count."
        lede="We build the data infrastructure that turns emissions measurement into market access, regulatory compliance into value streams, and environmental accountability into competitive advantage."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About" }]}
      >
        <Button href="/contact" variant="primary" size="lg">
          Talk to us
          <ArrowRight />
        </Button>
        <Button href="/approach" variant="outline" size="lg">
          How we work
        </Button>
      </PageHeader>

      {/* ===================== What we do ===================== */}
      <section className="border-t border-ink-200 bg-white">
        <Container className="py-14 sm:py-16 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="min-w-0 lg:col-span-5">
              <Reveal>
                <Eyebrow>What we do</Eyebrow>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-6 text-h2 font-bold text-ink-950">
                  Measured. Managed. Monetized.
                </h2>
              </Reveal>
            </div>

            <div className="min-w-0 lg:col-span-6 lg:col-start-7">
              <Reveal>
                <p className="text-lead text-ink-600">
                  Geovitas is a technology-led climate business working across
                  industry, cities and the energy transition. We are not a
                  reporting consultancy and not a dashboard vendor: we build the
                  measurement layer, then stay on the engagement through the
                  compliance position and the capital decision that rest on it.
                </p>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="mt-5 text-sm leading-relaxed text-ink-500">
                  That sequence is the whole business. An inventory that cannot
                  be traced to source is a liability the moment an auditor asks
                  where a figure came from, and monetization built on unverified
                  reductions does not survive contact with a buyer&apos;s
                  reviewer. So we measure first, map that one inventory outward
                  to every mandate, and only then convert what it earns.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <div className="mt-8">
                  <Button href="/approach" variant="outline" size="md">
                    The engagement model
                    <ArrowRight />
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ===================== Why Geovitas ===================== */}
      <section className="border-t border-ink-200 bg-ink-50">
        <Container className="py-16 sm:py-20 lg:py-32">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Why Geovitas</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-6 text-h2 font-bold text-ink-950">
                Three things we do differently.
              </h2>
            </Reveal>
          </div>

          <StaggerGroup
            className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-12"
            step={0.1}
          >
            {DIFFERENTIATORS.map((item) => (
              <StaggerChild key={item.index}>
                <span className="tnum font-mono text-sm font-bold text-brand-cyan-ink">
                  {item.index}
                </span>
                <span aria-hidden className="brand-gradient mt-4 block h-px w-10" />
                <h3 className="mt-5 text-h3 font-bold text-ink-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">
                  {item.body}
                </p>
              </StaggerChild>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      {/* ===================== Where we work ===================== */}
      <section className="border-t border-ink-200 bg-white">
        <Container className="py-16 sm:py-20 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="min-w-0 lg:col-span-4">
              <Reveal>
                <Eyebrow>Where we work</Eyebrow>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-6 text-h2 font-bold text-ink-950">
                  Three sectors. One platform.
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-5 text-lead text-ink-600">
                  The mandate changes and the capital decision changes. The
                  evidence base underneath does not.
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <div className="mt-8 flex flex-col gap-3">
                  <Button href="/advisory" variant="outline" size="md" className="justify-between">
                    All advisory verticals
                    <ArrowRight />
                  </Button>
                  <Button href="/platform" variant="outline" size="md" className="justify-between">
                    Green Factory 360 AI
                    <ArrowRight />
                  </Button>
                </div>
              </Reveal>
            </div>

            {/* Practice names and modes come from lib/advisory.ts so this page
                can never drift from /advisory. */}
            <div className="min-w-0 lg:col-span-7 lg:col-start-6">
              <StaggerGroup className="grid gap-5 sm:grid-cols-3" step={0.08}>
                {VERTICALS.map((vertical) => (
                  <StaggerChild key={vertical.slug} className="h-full">
                    <div className="flex h-full flex-col rounded-card border border-ink-200 bg-white p-6 shadow-card">
                      <span className="tnum font-mono text-xs font-bold text-brand-cyan-ink">
                        {vertical.index}
                      </span>
                      <h3 className="mt-4 text-[0.9375rem] font-bold text-ink-950">
                        {vertical.practice}
                      </h3>
                      <p className="mt-2 font-mono text-eyebrow uppercase text-ink-500">
                        {vertical.mode}
                      </p>
                    </div>
                  </StaggerChild>
                ))}
              </StaggerGroup>
            </div>
          </div>
        </Container>
      </section>

      {/* ===================== People ===================== */}
      <section className="border-t border-ink-200 bg-ink-50">
        <Container className="py-16 sm:py-20 lg:py-32">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Leadership</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-6 text-h2 font-bold text-ink-950">
                Who you will be working with.
              </h2>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {LEADERSHIP.map((leader, index) => (
              <PersonCard key={leader.name} person={leader} delay={index * 0.08} />
            ))}
          </div>

          {/* Advisors share the section rather than taking their own band: they
              are the same kind of content one rung down, and a separate chapter
              would have overstated the difference. */}
          <div className="mt-16 border-t border-ink-200 pt-14 lg:mt-20 lg:pt-16">
            <div className="max-w-2xl">
              <Reveal>
                <Eyebrow>Advisors</Eyebrow>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-6 text-h2 font-bold text-ink-950">
                  Who we take counsel from.
                </h2>
              </Reveal>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {ADVISORS.map((advisor, index) => (
                <PersonCard key={advisor.name} person={advisor} delay={index * 0.08} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ===================== Ecosystem ===================== */}
      <section className="border-t border-ink-200 bg-white">
        <Container className="py-16 sm:py-20 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="min-w-0 lg:col-span-5">
              <Reveal>
                <Eyebrow>Ecosystem</Eyebrow>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-6 text-h2 font-bold text-ink-950">
                  Partners force-multiply the work.
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-5 text-lead text-ink-600">
                  Geovitas collaborates with research institutions,
                  international climate organisations and India&apos;s first
                  carbon credit registry to deliver verification standards and
                  market access that satisfy domestic and international
                  requirements at once.
                </p>
              </Reveal>
            </div>

            {/* Set as text, not logos — see the sourcing note at the head of
                this file. A name is enough to establish the relationship. */}
            <div className="min-w-0 lg:col-span-6 lg:col-start-7">
              <StaggerGroup className="grid gap-5 sm:grid-cols-2" step={0.08}>
                {PARTNERS.map((partner) => (
                  <StaggerChild key={partner.name} className="h-full">
                    <div className="flex h-full flex-col justify-center rounded-card border border-ink-200 bg-white p-6 shadow-card">
                      <span
                        aria-hidden
                        className="brand-gradient block h-0.5 w-8 rounded-full"
                      />
                      <p className="mt-5 text-[0.9375rem] font-bold text-ink-950">
                        {partner.name}
                      </p>
                      {partner.note && (
                        <p className="mt-1.5 font-mono text-eyebrow uppercase text-ink-500">
                          {partner.note}
                        </p>
                      )}
                    </div>
                  </StaggerChild>
                ))}
              </StaggerGroup>
            </div>
          </div>
        </Container>
      </section>

      {/* ===================== The company ===================== */}
      <section className="border-t border-ink-200 bg-ink-50">
        <Container className="py-16 sm:py-20 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="min-w-0 lg:col-span-5">
              <Reveal>
                <Eyebrow>The company</Eyebrow>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-6 text-h2 font-bold text-ink-950">
                  Why the company exists.
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-5 text-sm leading-relaxed text-ink-500">
                  Geovitas is registered in Chennai, Tamil Nadu, and works with
                  clients across India&apos;s industrial, municipal and energy
                  sectors.
                </p>
              </Reveal>

              {/* Establishes the place. An about page that names a city and
                  never shows it is doing half the job. */}
              <Reveal delay={0.16}>
                <Parallax className="mt-10 overflow-hidden rounded-card" speed={0.06}>
                  <ImageSlot
                    id="about-chennai"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                  />
                </Parallax>
              </Reveal>
            </div>

            <div className="min-w-0 lg:col-span-6 lg:col-start-7">
              <Reveal>
                <p className="text-lead text-ink-600">
                  The name is <em>geo</em> and <em>vitas</em> — earth and life.
                  Sustaining one by making climate action economically
                  rewarding for the people who have to pay for it.
                </p>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="mt-5 text-lead text-ink-600">
                  The company exists because the gap between India&apos;s
                  climate commitments and India&apos;s climate execution is not
                  a data problem, or a policy problem, or a technology problem
                  in isolation. It is all three at once, and the only way to
                  close it is to work across all three at the same time — in the
                  same city, in the same industrial cluster, on the same asset.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-5 text-sm leading-relaxed text-ink-500">
                  Its founders spent their careers bridging those gaps in their
                  respective fields. Geovitas brings that expertise into one
                  place so the work happens at scale rather than one asset at a
                  time.
                </p>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="mt-10">
                  <PlaceholderBlock
                    title="Registration and credentials"
                    needs={[
                      "Year of incorporation and registered entity name (Pvt Ltd / LLP)",
                      "CIN or registration number, and GSTIN if it should appear publicly",
                      "Certifications, accreditations or memberships that may be claimed, with issuing body and validity",
                      "Any awards or recognitions, with the awarding body and year",
                    ]}
                  >
                    The founding rationale above is the company&apos;s own
                    published account. The statutory and credential detail is
                    not published anywhere we can cite, and this site&apos;s
                    standing rule is that nothing unverifiable goes on a public
                    page — so it waits for source documents.
                  </PlaceholderBlock>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <CtaBlock />
    </>
  );
}

/**
 * One card for leadership and advisors alike — the two groups differ in
 * standing, not in treatment, and a second card component would have been the
 * same forty lines with a different border.
 */
function PersonCard({ person, delay }: { person: Person; delay: number }) {
  return (
    /* Tilt without glare: the bios run to four or five lines, and a moving
       highlight over body copy is unreadable. */
    <TiltCard
      delay={delay}
      glare={false}
      className="flex h-full flex-col rounded-card border border-ink-200 bg-white p-7 shadow-card
                 transition-colors duration-300 ease-brand hover:border-brand-cyan/50"
    >
      {person.photo ? (
        /* The supplied headshots are square, so a fixed 80px box with
           object-cover crops nothing meaningful. `alt` is empty and the box is
           aria-hidden: the name is already the <h3> immediately below, and a
           screen reader announcing "Photograph of Venu Puthussery" before
           reading "Venu Puthussery" is pure duplication.

           width/height are twice the rendered size so the image stays sharp on
           a 2x display; `sizes` tells next/image the box is 80px CSS regardless
           of breakpoint, so it never fetches the full 1080px original. */
        <Image
          src={person.photo}
          alt=""
          aria-hidden
          width={160}
          height={160}
          sizes="80px"
          className="h-20 w-20 shrink-0 rounded-full border border-ink-200 object-cover"
        />
      ) : (
        /* Fallback for anyone added before their headshot is supplied. */
        <span
          aria-hidden
          className="tnum flex h-20 w-20 items-center justify-center rounded-full
                     border border-ink-200 bg-ink-50 font-mono text-sm font-bold
                     text-brand-cyan-ink"
        >
          {monogram(person.name)}
        </span>
      )}
      <h3 className="mt-6 text-h3 font-bold text-ink-950">{person.name}</h3>
      <p className="mt-1.5 font-mono text-eyebrow uppercase text-ink-500">
        {person.role}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-ink-600">{person.bio}</p>
    </TiltCard>
  );
}
