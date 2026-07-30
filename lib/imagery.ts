/**
 * EVERY IMAGE SLOT ON THE SITE, IN ONE PLACE.
 *
 * The site was text-heavy because it had almost no art direction: two stock
 * photographs on the homepage and three on the sector cards. This file is the
 * commissioning brief for the rest of it.
 *
 * ── HOW THIS WORKS ────────────────────────────────────────────────────────
 * A slot with `src: null` renders a clearly-marked placeholder that prints the
 * brief on the page, so nobody can mistake an unfilled slot for finished work.
 * Setting `src` swaps in the photograph — no component edits, no layout
 * changes. Same discipline components/site/social-proof.tsx uses for logos.
 *
 * ── EVERY IMAGE HERE IS PROVISIONAL ───────────────────────────────────────
 * `provisional: true` on a slot means the `src` is INTERIM STOCK, chosen to
 * get the page out of wireframe, not the image the brief actually asks for.
 * Each one was fetched and looked at before being committed — none is a
 * guessed URL — but stock only ever approximates a brief.
 *
 * `alt` describes WHAT THE PHOTOGRAPH ACTUALLY SHOWS, not what the brief
 * wanted. That distinction matters: a screen-reader user gets the truth, and
 * nothing on the page asserts something the picture does not support. When you
 * commission the real image, update `alt` to follow the new photograph.
 *
 * Sources are Unsplash, under the Unsplash Licence (free for commercial use,
 * no attribution required). `images.unsplash.com` is already allowlisted in
 * next.config.ts. Treat that allowlist and every `provisional: true` flag as
 * one job: they all disappear together when licensed photography lands.
 *
 * ── FILLING A SLOT ────────────────────────────────────────────────────────
 *   1. Generate or license the image using `brief` below.
 *   2. Save it to `public/imagery/<id>.webp` (or .jpg) at the stated `aspect`,
 *      2x the largest rendered width — 2400px wide is enough for every slot
 *      here except `hero-backdrop`, which wants 3200px.
 *   3. Set `src: "/imagery/<id>.webp"`.
 *   4. Check `alt` still describes the picture you actually got. It is written
 *      to match the brief; if the image differs, the alt text must follow it,
 *      not the other way round.
 *
 * ── RULES FOR GENERATED IMAGERY ───────────────────────────────────────────
 * These are in every brief for a reason, and they are not optional:
 *   • NO LEGIBLE TEXT, UI, SIGNAGE, DIALS OR LOGOS. Generative models produce
 *     garbled lettering, and a fake dashboard or invented brand on a CFO-facing
 *     site is a credibility failure the copy cannot recover from.
 *   • NO IDENTIFIABLE FACES. Figures are incidental, distant, back-turned or
 *     cropped — this site does not have model releases, and a stock-looking
 *     smiling executive undercuts the institutional register.
 *   • NO INVENTED DATA. No charts, no graphs, no numbers. The real figures on
 *     this site are all traceable to an instrument; decorative ones are not.
 *   • Palette must sit inside the brand: cyan #00AEDA, teal #12BBB2,
 *     green #82C341, ink #0B0C0D. Cool, desaturated, institutional. No
 *     eco-stock clichés — no cupped hands holding soil, no sapling in a bulb,
 *     no globe held aloft, no lens flare.
 *   • Real optics: shallow depth of field, natural light, documentary framing.
 *     These should read as commissioned photography, not as illustration.
 *
 * ── WHY SOME SLOTS ARE DIAGRAMS ───────────────────────────────────────────
 * `treatment: "diagram"` marks slots that should NOT be photographed or
 * generated. They want a drawn schematic in the brand palette, produced by a
 * designer or by hand in SVG — a generative model cannot draw a process flow
 * that is technically correct, and a wrong one on a page read by engineers is
 * worse than no image at all.
 */

export type ImageAspect = "21/9" | "16/9" | "3/2" | "4/3" | "1/1";

export type ImageSlot = {
  /** Also the suggested filename: `public/imagery/<id>.webp`. */
  id: string;
  /** null while the art is outstanding — the placeholder renders instead. */
  src: string | null;
  /**
   * Describes the photograph AS IT ACTUALLY IS — not as the brief wanted it.
   * Real alt text, not a caption.
   */
  alt: string;
  /**
   * The `src` is interim stock standing in for the brief, not the commissioned
   * image. Grep this flag for the launch punch-list.
   */
  provisional: boolean;
  aspect: ImageAspect;
  /** Short name on the placeholder chip, and the caption when one is shown. */
  label: string;
  /** Where this sits, so the brief can be read without opening the page. */
  placement: string;
  /** The generation / commissioning brief. */
  brief: string;
  /** "photo" generates or licenses; "diagram" is drawn by a designer. */
  treatment: "photo" | "diagram";
};

/** Shared transform for the interim Unsplash sources. */
const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMAGE_SLOTS = {
  /* ---------------------------------------------------------------- home -- */
  "process-engagement": {
    id: "process-engagement",
    src: U("1581092160562-40aa08e78837"),
    alt: "Overhead view of an engineer marking up technical drawings at a workbench",
    provisional: true,
    aspect: "4/3",
    label: "The engagement",
    placement: "Homepage — engagement model section, beside the four phases",
    brief:
      "Documentary photograph, industrial interior. Two engineers in plain hi-vis and hard hats on a steel walkway above process equipment, mid-conversation, seen from behind and slightly below so neither face is identifiable. Cool north light, heavy atmospheric haze, shallow depth of field with the foreground handrail soft. Desaturated steel greys and ink shadows with one cool cyan cast from an overhead fixture. Absolutely no legible signage, gauges, screens or brand marks anywhere in frame. Documentary, not corporate — this should look like an audit in progress, not a stock photo of teamwork.",
    treatment: "photo",
  },
  "exposure-border": {
    id: "exposure-border",
    src: U("1494412574643-ff11b0a5c1c3", 2000),
    alt: "Aerial view of a container port, with stacked freight containers and gantry cranes along the quay",
    provisional: true,
    aspect: "16/9",
    label: "The border",
    placement: "Homepage — regulatory exposure model, beside the calculator",
    brief:
      "Wide elevated photograph of a container terminal at blue hour. Rows of stacked freight containers receding into haze, gantry cranes silhouetted against a cold gradient sky. Deep ink-blue shadows, teal atmospheric perspective, one warm sodium note in the far distance for depth. Containers must be plain and unbranded — no shipping-line liveries, no legible codes, no text of any kind. No people, no vehicles in the foreground. The mood is scale and consequence, a border that costs money to cross.",
    treatment: "photo",
  },

  /* ------------------------------------------------------------ sectors -- */
  "sectors-overview": {
    id: "sectors-overview",
    src: U("1497435334941-8c899ee9e8e9", 2400),
    alt: "Aerial view of a solar array laid out in rows across farmland",
    provisional: true,
    aspect: "21/9",
    label: "Three sectors, one frame",
    placement: "/sectors — banner beneath the practice cards",
    brief:
      "High aerial photograph at dawn, near-vertical, where an industrial estate meets the edge of a dense city and open land beyond — the three sectors in a single frame. Low sun raking across roofs, long shadows, cool mist in the valleys. Muted palette: concrete grey, cool green vegetation, a teal cast in the haze. Ultra-wide cinematic crop. No text, no legible signage, no identifiable buildings or landmarks. Should read as survey photography rather than as a skyline postcard.",
    treatment: "photo",
  },

  /* ------------------------------------------------------- capabilities -- */
  "capability-petroleum-cold-cracking": {
    id: "capability-petroleum-cold-cracking",
    src: U("1516937941344-00b4e0337589"),
    alt: "Refinery distillation columns and pipework under a heavy overcast sky",
    provisional: true,
    aspect: "16/9",
    label: "Cold cracking",
    placement: "/capabilities/petroleum-cold-cracking — beneath the challenge",
    brief:
      "Refinery exterior in flat overcast light. Tall distillation columns and dense insulated pipework, shot from ground level with a long lens so the structure compresses into layers. Cold desaturated palette — steel, oxidised grey, a faint teal in the sky. Wet ground reflecting a little light. No flare stack burning, no smoke plume, no people, no signage or unit numbering. Restrained and technical: this is a plant that runs well, not a pollution photograph.",
    treatment: "photo",
  },
  "capability-compressed-biogas": {
    id: "capability-compressed-biogas",
    src: U("1500382017468-9049fed747ef"),
    alt: "Harvested cereal field at sunrise, with cut stubble running to a low horizon",
    provisional: true,
    aspect: "16/9",
    label: "Compressed biogas",
    placement: "/capabilities/compressed-biogas — beneath the challenge",
    brief:
      "Anaerobic digestion plant on agricultural land, mid-morning. Two or three green digester domes and a compact process skid, surrounded by cut fields, with a low horizon and a large open sky. Clean and orderly — mown grass, gravel apron, no clutter or waste visible. Cool naturalistic palette, green and grey, no oversaturated grass. Wide lens, low camera. No people, no vehicles, no signage, no legible pipework labelling.",
    treatment: "photo",
  },
  "capability-carbon-capture": {
    id: "capability-carbon-capture",
    src: U("1611273426858-450d8e3c9fce"),
    alt: "Heavy industrial plant on a waterfront at dusk, with flue gas rising from its stacks",
    provisional: true,
    aspect: "16/9",
    label: "Carbon capture",
    placement: "/capabilities/carbon-capture — beneath the challenge",
    brief:
      "A bank of vertical tubular photobioreactors — tall transparent columns of dense green algae culture, backlit so the liquid glows — installed on a concrete apron beside grey industrial plant. The contrast between the living green and the industrial grey is the entire point of the image. Overcast daylight, shallow depth of field, the rear columns falling soft. No people, no control panels, no screens, no branding or lettering on the columns.",
    treatment: "photo",
  },

  /* ----------------------------------------------------------- platform -- */
  "platform-source-data": {
    id: "platform-source-data",
    src: U("1518770660439-4636190af475", 1400),
    alt: "Close view of a circuit board, its components sharp in a shallow plane of focus",
    provisional: true,
    aspect: "3/2",
    label: "Measured at source",
    placement: "/platform — beside the source-data argument",
    brief:
      "Tight interior photograph of an industrial metering cabinet or switch room: rows of instrumentation, orderly cable looms, terminal blocks. Shot close and slightly off-axis with shallow depth of field so only one plane is sharp. Cool fluorescent light, ink shadows, a single cyan indicator glow as the one point of colour. This is the physical thing the phrase 'traceable to source' actually refers to. No legible displays, no readable labelling, no numbers, no people.",
    treatment: "photo",
  },
  "platform-architecture": {
    id: "platform-architecture",
    src: null,
    alt: "Diagram of one verified inventory mapping outward to CBAM, BRSR Core, CCTS, GHG Protocol and SBTi",
    provisional: false,
    aspect: "16/9",
    label: "One inventory, mapped outward",
    placement: "/platform — the architecture explainer",
    brief:
      "DRAWN DIAGRAM, NOT A PHOTOGRAPH — hand this to a designer, not to an image model. Left: source systems (meters, ERP, logistics, supplier submissions) as small labelled nodes. Centre: a single verified inventory block, the visual anchor. Right: five framework outputs — EU CBAM, SEBI BRSR Core, CCTS, GHG Protocol, SBTi / ISSB — fanning out from that one block. Flow lines in the brand gradient (cyan to teal to green), everything else in the ink ramp on white. 1.5px line weight to match the site's icon set. The claim it has to make visually: many inputs, ONE inventory, many outputs.",
    treatment: "diagram",
  },

  /* ----------------------------------------------------------- approach -- */
  "approach-fieldwork": {
    id: "approach-fieldwork",
    src: U("1581092918056-0c4c3acd3789", 1400),
    alt: "A technician's hands working on instrumentation hardware at close range",
    provisional: true,
    aspect: "3/2",
    label: "Baseline, at source",
    placement: "/approach — beside the measurement phase",
    brief:
      "Close documentary photograph of gloved hands working at pipework instrumentation — a probe placed, a fitting checked. Hands and forearms only; no face in frame. Very shallow depth of field, natural side light, cool desaturated palette with the steel and the glove reading as the only textures. No readable gauge faces, no digital displays, no numbers, no branding. Should feel like evidence being collected, deliberately and slowly.",
    treatment: "photo",
  },

  /* -------------------------------------------------------------- about -- */
  "about-chennai": {
    id: "about-chennai",
    src: U("1512699355324-f07e3106dae5", 1400),
    alt: "Overhead view of a low-rise residential neighbourhood, tiled roofs interspersed with trees",
    provisional: true,
    aspect: "3/2",
    /* NOT captioned "Chennai". The interim photograph is a generic aerial and
       is not of Chennai; sitting beside a heading that names the city, a
       locative caption would assert something the picture does not support.
       Restore "Chennai" as the label only when the commissioned image is
       actually shot there. */
    label: "Where we work",
    placement: "/about — beside the company section",
    brief:
      "Early-morning elevated photograph across a South Indian city's mid-rise rooftops — water tanks, parapets, aerials, a few palms breaking the line, haze softening the far distance. Warm low sun against cool shadow. Ordinary working city, not a landmark or a tourist view. Desaturated and calm. No text, no signage, no hoardings, no identifiable people. This establishes where the company actually is — so it must genuinely be Chennai.",
    treatment: "photo",
  },

  /* ------------------------------------------------------------ contact -- */
  "contact-briefing": {
    id: "contact-briefing",
    src: U("1497366216548-37526070297c", 1400),
    alt: "An empty, unlit office interior with a long corridor receding into daylight",
    provisional: true,
    aspect: "3/2",
    label: "The first conversation",
    placement: "/contact — beside the registered details",
    brief:
      "An empty, restrained meeting room in early morning light. Long plain table, a few chairs slightly out of alignment as if just vacated, tall window throwing a hard band of light across the surface. Muted institutional palette — grey, ink, one cool green plant well out of focus. Deliberately unpeopled: the invitation is the subject. No screens, no whiteboard writing, no papers with legible text, no branding.",
    treatment: "photo",
  },
} as const satisfies Record<string, ImageSlot>;

export type ImageSlotId = keyof typeof IMAGE_SLOTS;

/**
 * Tailwind aspect utilities, keyed by the manifest's ratios.
 *
 * EVERY WIDE RATIO GETS A TALLER MOBILE CROP. A 21:9 band is 160px tall on a
 * 375px screen — a letterbox sliver that carries no subject at all — and 16:9
 * is not much better once it sits between two blocks of copy. Phones are tall
 * and narrow, so the image is given back some height below `sm` and only opens
 * out to the authored ratio when there is width to justify it. `object-cover`
 * handles the recrop.
 */
export const ASPECT_CLASS: Readonly<Record<ImageAspect, string>> = {
  "21/9": "aspect-[3/2] sm:aspect-[21/9]",
  "16/9": "aspect-[4/3] sm:aspect-video",
  "3/2": "aspect-[4/3] sm:aspect-[3/2]",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
};

/**
 * The launch punch-list for imagery: slots with no art at all, plus every slot
 * running on interim stock. Nothing calls this yet — it exists so a checklist,
 * a CI gate or a one-off `node -e` can ask the question without grepping.
 */
export function outstandingImageSlots(): readonly ImageSlot[] {
  return Object.values(IMAGE_SLOTS).filter(
    (slot) => slot.src === null || slot.provisional,
  );
}
