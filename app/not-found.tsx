import type { Metadata } from "next";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { BrandMesh } from "@/components/ui/brand-mesh";
import { Button, ArrowRight } from "@/components/ui/button";

/**
 * Root 404. It handles every unmatched URL for the whole app and, sitting at
 * the app root rather than under app/(marketing), it is NOT wrapped by the
 * marketing layout — so it supplies its own SiteNav + SiteFooter to stay on
 * brand. SiteNav reads a non-"/" pathname here and renders its light form.
 *
 * Next injects `noindex` on 404 responses automatically; the title is set for
 * the tab and any accidental share.
 */
export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <>
      <SiteNav />
      <main>
        <section className="relative overflow-hidden bg-white">
          <BrandMesh
            variant="light"
            className="[mask-image:linear-gradient(to_bottom,black_60%,transparent)]"
          />
          <Container className="relative flex min-h-[70vh] flex-col justify-center pt-32 pb-20 lg:pt-40">
            <Eyebrow>Error 404</Eyebrow>
            <p className="tnum brand-gradient-text mt-6 font-mono text-[4rem] leading-none font-bold lg:text-[5rem]">
              404
            </p>
            <h1 className="mt-5 max-w-2xl text-h2 font-bold text-ink-950">
              This page could not be found.
            </h1>
            <p className="mt-5 max-w-xl text-lead text-ink-600">
              The address may be mistyped, or the page may have moved. The routes below
              will get you back to solid ground.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href="/" variant="primary" size="lg">
                Back to homepage
                <ArrowRight />
              </Button>
              <Button href="/#briefing" variant="outline" size="lg">
                Schedule an executive briefing
              </Button>
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
