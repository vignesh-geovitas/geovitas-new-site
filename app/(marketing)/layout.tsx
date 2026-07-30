import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";

/**
 * Shared chrome for every marketing route.
 *
 * SiteNav and SiteFooter used to be re-declared by each page; they live here
 * now so a new page is just its own content. This is a NESTED layout, not a
 * root one — the root `app/layout.tsx` already owns <html>/<body>, so this file
 * contributes only the fragment between them and never repeats those tags.
 *
 * The single <main> landmark lives here too. Pages return their sections
 * directly (home opens on <Hero>, subpages on <PageHeader>); both handle the
 * top padding needed to clear the fixed nav, so this layout stays structural.
 *
 * SiteNav reads its own theme from usePathname() — dark forest treatment on
 * "/", light everywhere else — so this wrapper passes it no props.
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteNav />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
