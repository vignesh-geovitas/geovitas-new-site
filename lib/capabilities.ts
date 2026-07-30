/**
 * Single source of truth for the three energy-transition capabilities.
 *
 * These sit UNDER the Oil, Gas & Energy practice rather than beside it.
 * lib/sectors.ts already names "compressed biogas, cold cracking and carbon
 * capture" as what that practice deploys; this file is those three at the depth
 * a technical buyer needs before a capital committee will look at them. The
 * /capabilities index, the three detail routes and the cross-links on
 * /sectors/oil-gas-energy all read from here, so nothing can drift.
 *
 * SOURCING. Copy is derived from Geovitas's own published Energy Transition
 * solution pages and reproduced close to source rather than paraphrased, on the
 * same reasoning as the one-pager note in app/(marketing)/about/page.tsx: the
 * site and the collateral should say the same thing to the same buyer. Nothing
 * here comes from the Green Factory 360 GTM deck.
 *
 * FIGURES. `signals` carries only externally verifiable policy figures, each
 * checkable against the instrument named in `sources` — the same rule
 * components/site/proof-strip.tsx holds. Geovitas's own forward-looking targets
 * and un-attributed performance ranges are deliberately absent; see the note in
 * lib/sectors.ts.
 *
 * ONE RECONSTRUCTION, FLAGGED. The second stage of the carbon-capture
 * deployment sequence was occluded by an overlay in the supplied capture of the
 * source page; only the trailing words "…revenue forecasting" were legible. The
 * stage below is rebuilt from that same page's deliverables list and wants
 * confirmation before launch. Nothing else on this page is inferred.
 */

import type { ImageSlotId } from "@/lib/imagery";

export type CapabilitySlug =
  | "petroleum-cold-cracking"
  | "compressed-biogas"
  | "carbon-capture";

/** A public policy figure. Every one must be checkable against `sources`. */
export type CapabilitySignal = {
  figure: string;
  label: string;
  detail: string;
};

/** Who the capability is actually for, in their own words. */
export type CapabilityAudience = {
  title: string;
  body: string;
};

/** One step of the delivery sequence. */
export type CapabilityStage = {
  index: string;
  title: string;
  body: string;
};

/** A regulatory framework the capability answers to, and how. */
export type CapabilityAnchor = {
  title: string;
  body: string;
};

export type Capability = {
  slug: CapabilitySlug;
  index: string;
  /** Full name — the H1 on the detail page. */
  name: string;
  /** Short form for cards and cross-links, where the full name will not fit. */
  shortName: string;
  /** How the work is delivered — the PageHeader eyebrow. */
  mode: string;
  /**
   * Named rather than derived from the slug. A template literal would type-check
   * today and break silently the moment a slug is renamed or an image slot is
   * re-keyed; this way the compiler catches it.
   */
  imageSlot: ImageSlotId;

  /** Index-card body — the short version of the argument. */
  cardBody: string;

  metaTitle: string;
  metaDescription: string;
  /** Detail hero lede. */
  lede: string;

  /** The problem, before the product. Two paragraphs. */
  challenge: readonly string[];
  /** The technology itself, set on the page's one dark surface. */
  technology: {
    headline: string;
    body: string;
  };

  signals: readonly CapabilitySignal[];
  audiences: readonly CapabilityAudience[];
  /** What the delivery sequence actually is, stage by stage. */
  stages: readonly CapabilityStage[];
  /** The documents that change hands. */
  deliverables: readonly string[];
  /** What the client is left holding. */
  outcomes: readonly string[];
  anchors: readonly CapabilityAnchor[];

  /** Citation line under the signals band. */
  sources: string;
  /** Pre-filled mailto subject, so an enquiry lands on the right desk. */
  enquirySubject: string;
  /** The specific next step this page asks for. */
  enquiryPrompt: string;
};

export const CAPABILITIES: readonly Capability[] = [
  {
    slug: "petroleum-cold-cracking",
    index: "01",
    name: "Petroleum Cold Cracking & Crude Upgrading",
    shortName: "Cold cracking",
    mode: "Physical infrastructure",
    imageSlot: "capability-petroleum-cold-cracking",

    cardBody:
      "Resonant-frequency upgrading at low temperature: better distillate yields, lower energy consumption, and hazardous sludge converted from a disposal liability into recovered product.",

    metaTitle: "Petroleum Cold Cracking & Crude Upgrading",
    metaDescription:
      "Low-temperature resonant-frequency crude upgrading for refineries running heavy or high-sulphur slates — improved distillate yields, lower energy intensity, and oil sludge recovered rather than landfilled.",
    lede: "Heavy and high-sulphur slates cost margin twice: once in yield, and again in the hazardous sludge the refinery has to pay to dispose of. Cold cracking addresses both from the same intervention — and does it at low temperature, so the abatement is real rather than displaced.",

    challenge: [
      "A refinery running heavy or high-sulphur crude carries four problems at once: low distillate yields, high-viscosity residues, energy-intensive processing, and a growing inventory of oil-contaminated sludge classified as hazardous waste.",
      "The conventional answers — thermal cracking, chemical additives, blending with diluents — are costly, carbon-intensive, and generate secondary waste streams of their own. Meanwhile the sludge sitting in storage ponds is both a regulatory liability and a recoverable asset being written off.",
    ],
    technology: {
      headline: "Resonant frequency, not heat.",
      body: "Petroleum Cold Cracking restructures hydrocarbon molecules at the molecular level using resonant frequency rather than high heat or chemical additives — a technology Geovitas deploys exclusively in India. The output is a better crude: more distillates, less residue, and hydrocarbons recovered from what the balance sheet had already written off as waste.",
    },

    signals: [
      {
        figure: "Schedule I",
        label: "Oil and oily sludge, listed as hazardous waste",
        detail:
          "Storage, treatment and disposal obligations attach under the Hazardous and Other Wastes (Management and Transboundary Movement) Rules.",
      },
      {
        figure: "2026",
        label: "CBAM definitive regime in force",
        detail:
          "Refined products bound for the EU carry certificate obligations on embedded emissions above benchmark.",
      },
      {
        figure: "9",
        label: "Obligated sectors under CCTS",
        detail:
          "Petroleum refining is among them, with emission-intensity targets and tradeable credits for verified over-performance.",
      },
    ],

    audiences: [
      {
        title: "Refineries",
        body: "Crude and vacuum distillation units processing heavy crude slates or high-sulphur feedstocks, where yield economics are the constraint.",
      },
      {
        title: "Environmental remediation",
        body: "Facilities with accumulated oil sludge in storage ponds, facing Schedule I hazardous waste disposal obligations under CPCB rules.",
      },
    ],

    stages: [
      {
        index: "01",
        title: "Feedstock & opportunity assessment",
        body: "Review the crude slate, the vacuum residue stream or the sludge inventory to quantify upgrading potential and identify the right process unit configuration.",
      },
      {
        index: "02",
        title: "Integration & feasibility design",
        body: "Design the unit for its integration point — CDU pre-treatment, VDU bottoms or sludge storage — and model the economic impact before anything is ordered.",
      },
      {
        index: "03",
        title: "Deployment & validation",
        body: "Deploy at the facility with results independently validated against agreed KPIs, before any scale-up commitment is made.",
      },
      {
        index: "04",
        title: "Full-scale EPC & commissioning",
        body: "A successful trial triggers full execution: procurement, installation, commissioning and operational handover, managed end to end.",
      },
    ],

    deliverables: [
      "Performance validation report — independent verification of upgrading results, yield improvements and emission reduction profile against baseline",
      "Full EPC and commissioning plan — detailed engineering, procurement schedule, installation sequence and handover protocol",
      "O&M framework and operating procedures — operational manuals, maintenance schedules and performance monitoring protocols",
    ],

    outcomes: [
      "Improved product yields from the same crude — more distillates, less residue, higher value per barrel",
      "Lower energy consumption than thermal cracking routes",
      "Reduced diluent and additive costs through low-temperature processing",
      "Hazardous sludge converted from regulatory liability into recovered product",
      "A verified emissions reduction profile supporting carbon credit generation under CCTS",
    ],

    anchors: [
      {
        title: "CPCB / SPCB",
        body: "Oil sludge is classified as hazardous waste under Schedule I of the Hazardous Waste Management Rules. Treatment through the process unit meets the regulatory standard for hydrocarbon recovery and residue disposal, which removes the landfill liability rather than deferring it.",
      },
      {
        title: "EU CBAM",
        body: "Indian refiners exporting petroleum products to Europe can demonstrate lower embedded emissions through energy-efficient upgrading, reducing the certificate cost their importer has to carry.",
      },
      {
        title: "CCTS and ESG",
        body: "Verified CO₂ reductions from replacing energy-intensive treatment with low-temperature processing are eligible for carbon credit generation under India's Carbon Credit Trading Scheme.",
      },
    ],

    sources:
      "Sources: Hazardous and Other Wastes (Management and Transboundary Movement) Rules, Schedule I, Central Pollution Control Board · Regulation (EU) 2023/956 establishing the Carbon Border Adjustment Mechanism · Carbon Credit Trading Scheme, Ministry of Power / Bureau of Energy Efficiency. Regulatory position as at Q3 2026.",
    enquirySubject: "Cold cracking — technical and economic feasibility study",
    enquiryPrompt:
      "Improve distillate yields, reduce energy costs and eliminate sludge liability. Start with a technical and economic feasibility study against your own crude slate.",
  },

  {
    slug: "compressed-biogas",
    index: "02",
    name: "Compressed Biogas (CBG) Project Development",
    shortName: "Compressed biogas",
    mode: "Project development",
    imageSlot: "capability-compressed-biogas",

    cardBody:
      "Waste-to-fuel infrastructure taken from feedstock assessment to first revenue: anaerobic digestion plants with SATAT empanelment and guaranteed off-take in place before construction, not after.",

    metaTitle: "Compressed Biogas (CBG) Project Development",
    metaDescription:
      "End-to-end compressed biogas project development — feedstock assessment, plant configuration, SATAT/GOBARdhan empanelment, EPC and a bankable DPR with investor-grade financial modelling.",
    lede: "The engineering behind compressed biogas is well understood. What stops projects is bankability — a feedstock supply nobody has verified, an off-take nobody has signed, and a financial model no lender will underwrite. We close those three before the first sod is turned.",

    challenge: [
      "India generates enormous volumes of agricultural residue, municipal solid waste, press mud and food-processing by-product. Most of it either decomposes in the open — releasing methane, a greenhouse gas roughly twenty-eight times more potent than CO₂ over a century — or is burned in the field.",
      "The same country imports a substantial share of the natural gas it burns. Compressed biogas answers both at once: waste methane captured through anaerobic digestion, purified and compressed to CNG-equivalent quality, becomes a domestically produced low-carbon fuel that displaces diesel and CNG across transport, industrial and commercial use.",
    ],
    technology: {
      headline: "Anaerobic digestion, structured as a bankable asset.",
      body: "We treat a CBG plant the way a lender does. Feedstock is assessed and contracted, the plant is configured against that specific waste stream, the revenue is stacked across CBG sales, fermented organic manure and carbon credits, and the empanelment and off-take documentation is complete before EPC begins. What the client ends up holding is a project an investment committee can read.",
    },

    signals: [
      {
        figure: "5,000",
        label: "CBG plants targeted under SATAT",
        detail:
          "The Sustainable Alternative Towards Affordable Transportation scheme, with off-take by oil marketing companies.",
      },
      {
        figure: "15 MMT",
        label: "Annual CBG production targeted",
        detail:
          "The production volume the same scheme is built to reach across those plants.",
      },
      {
        figure: "5%",
        label: "CBG blending obligation for gas companies",
        detail:
          "A phased blending requirement, which puts a structural demand floor under domestic production.",
      },
    ],

    audiences: [
      {
        title: "Agro-industrial companies",
        body: "Sugar mills, distilleries and rice mills with captive organic waste, seeking on-site fuel generation and lower disposal cost.",
      },
      {
        title: "Urban local bodies",
        body: "Municipalities managing solid waste under Swachh Bharat Mission mandates that require processing infrastructure.",
      },
      {
        title: "Project developers",
        body: "Entrepreneurs targeting SATAT empanelment who need bankable project documentation and an off-take agreement.",
      },
      {
        title: "Oil marketing companies",
        body: "OMCs procuring CBG under blending requirements, who need a verified feedstock supply chain behind each contract.",
      },
      {
        title: "Climate finance investors",
        body: "Private equity and development finance institutions seeking bankable bio-energy assets with stacked revenue.",
      },
      {
        title: "Industrial clusters",
        body: "Manufacturing zones seeking off-grid renewable fuel for captive thermal and transport applications.",
      },
    ],

    stages: [
      {
        index: "01",
        title: "Technical & financial design",
        body: "Plant design — digester type, purification, compression — with CAPEX/OPEX modelling and revenue stacked across CBG sales, fermented organic manure, carbon credits and RECs.",
      },
      {
        index: "02",
        title: "Permitting & regulatory",
        body: "SATAT and GOBARdhan empanelment, environmental impact assessment preparation, and a sequenced roadmap through statutory approvals.",
      },
      {
        index: "03",
        title: "EPC procurement & construction",
        body: "Vendor selection, contract structuring and construction oversight, with quality assurance across civil, mechanical and electrical integration.",
      },
    ],

    deliverables: [
      "Plant sizing and technology selection report — feedstock assessment, biogas yield projections, technology comparison and optimal plant configuration",
      "Financial model — IRR, NPV and payback, with revenue-stacking and sensitivity analysis in an investor-ready proforma",
      "SATAT / GOBARdhan application support — complete empanelment documentation and an off-take negotiation framework with OMCs",
      "O&M framework and revenue model — operations manual, maintenance protocol and multi-stream revenue management",
    ],

    outcomes: [
      "A bankable Detailed Project Report with investor-grade financial modelling",
      "An EPC vendor shortlist and contract structure ready for execution",
      "A full commissioning punch-list and testing protocol underwriting the performance guarantees",
      "Carbon credit project registration support, and a verified reduction profile to register against, under CCTS",
    ],

    anchors: [
      {
        title: "SATAT and GOBARdhan",
        body: "The SATAT scheme targets 5,000 CBG plants and 15 MMT of annual production with guaranteed off-take by oil marketing companies. The 5% CBG blending obligation on gas companies creates a structural demand floor beneath that.",
      },
      {
        title: "EU CBAM",
        body: "CBG-derived fertilisers and process chemicals bound for the EU benefit from verifiably lower embedded emissions, reducing the certificate obligations that attach to them.",
      },
      {
        title: "CCTS and ESG",
        body: "Verified greenhouse gas reductions from a CBG plant are eligible for carbon credit issuance under India's domestic carbon market — a third revenue stream alongside fuel and manure.",
      },
    ],

    sources:
      "Sources: Sustainable Alternative Towards Affordable Transportation (SATAT) and GOBARdhan, Ministry of Petroleum & Natural Gas / Ministry of Jal Shakti · Regulation (EU) 2023/956 establishing the Carbon Border Adjustment Mechanism · Carbon Credit Trading Scheme, Ministry of Power / Bureau of Energy Efficiency · Methane GWP₁₀₀ per IPCC AR5. Policy position as at Q3 2026.",
    enquirySubject: "Compressed biogas — feedstock assessment and financial model",
    enquiryPrompt:
      "Quantify the project before you commit to it. Start with a waste feedstock assessment and a financial modelling consultation.",
  },

  {
    slug: "carbon-capture",
    index: "03",
    name: "Microalgae Carbon Capture & Utilisation",
    shortName: "Carbon capture",
    mode: "Physical infrastructure",
    imageSlot: "capability-carbon-capture",

    cardBody:
      "Biological CO₂ capture at the emission point: modular photobioreactors on a low land footprint, producing saleable biomass alongside independently verifiable Scope 1 reductions.",

    metaTitle: "Microalgae Carbon Capture & Utilisation",
    metaDescription:
      "Modular photobioreactors capturing CO₂ directly from industrial flue gas and converting it into saleable algal biomass — verifiable Scope 1 reductions with a revenue line attached.",
    lede: "Hard-to-abate sites cannot electrify on the timescale their commitments assume, and the available answers are either capital-intensive enough to fail at the investment committee or land-hungry enough to fail at the site boundary. A biological route clears both tests.",

    challenge: [
      "Cement, steel, chemicals and power generation cannot fully electrify or switch fuels in the short term, and they are precisely the industries under the most pressure from net-zero targets, voluntary carbon markets and mandatory disclosure.",
      "The established answers do not fit a live industrial site. Conventional carbon capture tends to be prohibitively capital-intensive; afforestation is land-hungry in a way a fixed plant footprint cannot absorb. Neither leaves the operator with anything to sell.",
    ],
    technology: {
      headline: "Photobioreactors at the emission point.",
      body: "A biological, modular alternative developed with a partnered technologist. Photobioreactors installed at industrial emission points capture CO₂ directly from flue gas — and, where configured for it, from ambient air — and convert it into algal biomass. That biomass sells as feed, fertiliser, pigment or biofuel, so the installation carries a revenue line as well as a capture rate, on a low land footprint and without a major infrastructure overhaul.",
    },

    signals: [
      {
        figure: "45%",
        label: "India's NDC emissions-intensity target",
        detail:
          "A reduction in the emissions intensity of GDP by 2030 against a 2005 baseline, under the country's Nationally Determined Contribution.",
      },
      {
        figure: "2070",
        label: "India's stated net-zero year",
        detail:
          "The long-term horizon every domestic decarbonisation instrument is now calibrated against.",
      },
      {
        figure: "9",
        label: "Obligated sectors under CCTS",
        detail:
          "Cement, iron and steel among them, with tradeable credits issued against verified over-performance.",
      },
    ],

    audiences: [
      {
        title: "Cement, steel and power",
        body: "Hard-to-abate industries with point-source CO₂ emissions, seeking verifiable Scope 1 reductions on a credible net-zero pathway.",
      },
      {
        title: "Petrochemicals and refining",
        body: "Complexes under net-zero commitments that need on-site capture without a major infrastructure overhaul.",
      },
      {
        title: "Pharma and chemicals",
        body: "Manufacturers pursuing carbon neutrality with independently verifiable emission reduction certification.",
      },
      {
        title: "City gas and urban infrastructure",
        body: "Cities, transport hubs and commercial infrastructure meeting net-zero goals without major land or infrastructure requirements.",
      },
      {
        title: "Airports, campuses and data centres",
        body: "Large commercial facilities deploying direct air capture against Scope 1 and Scope 3 reduction commitments.",
      },
      {
        title: "SBTi corporates and credit developers",
        body: "Companies with science-based targets requiring verifiable Scope 1 reductions, and project aggregators seeking verified removal with a co-product revenue stream.",
      },
    ],

    stages: [
      {
        index: "01",
        title: "Emission audit & site scoping",
        body: "Flue gas composition analysis; CO₂ concentration, temperature and flow-rate measurement; site footprint assessment; regulatory review.",
      },
      {
        index: "02",
        title: "Feasibility & financial modelling",
        body: "System sizing against the measured emission profile, capture-rate projection, and forecasting of both carbon credit and biomass product revenue.",
      },
      {
        index: "03",
        title: "Deployment",
        body: "Modular system installation, algae strain selection and optimisation, and performance validation confirming the CO₂ capture rate in situ.",
      },
      {
        index: "04",
        title: "Scale-up & integration",
        body: "Full-scale roll-out, integration with plant operations, biomass harvesting and processing infrastructure, and off-take partner engagement.",
      },
    ],

    deliverables: [
      "Emission source characterisation and flue gas analysis — CO₂ concentration, temperature, flow rate and contaminant profile for system design",
      "System sizing and modular deployment plan — photobioreactor configuration, capture capacity projections and a phased installation roadmap",
      "CO₂ capture rate projections in tonnes per year, with seasonal variability analysis",
      "Biomass utilisation study and off-take agreements — revenue analysis across feed, fertiliser, biofuel and pigments, with buyer engagement",
      "Integration engineering with existing plant infrastructure — mechanical, electrical and process design that minimises operational disruption",
    ],

    outcomes: [
      "A verified annual CO₂ capture volume, independently certified for carbon credit issuance",
      "A biomass revenue model offsetting operating cost",
      "A net-zero contribution statement fit for ESG reporting and investor disclosure",
      "Scope 1 GHG reduction certification supporting SBTi validation",
      "A lifecycle assessment quantifying net carbon removal",
    ],

    anchors: [
      {
        title: "CCTS and the PAT scheme",
        body: "Verified capture is eligible for carbon credit generation under India's Carbon Credit Trading Scheme, and facilities under Perform, Achieve, Trade can direct captured CO₂ toward energy-efficiency targets.",
      },
      {
        title: "EU CBAM",
        body: "Cement, steel and fertiliser producers exporting to the EU reduce certificate costs directly by demonstrating lower embedded emissions through verified on-site capture.",
      },
      {
        title: "SBTi and corporate net zero",
        body: "Installations provide independently verifiable Scope 1 reductions for companies carrying science-based targets, and align with India's NDC commitment to cut the emissions intensity of GDP 45% by 2030.",
      },
    ],

    sources:
      "Sources: India's Nationally Determined Contribution under the Paris Agreement · Carbon Credit Trading Scheme and the Perform, Achieve, Trade mechanism, Ministry of Power / Bureau of Energy Efficiency · Regulation (EU) 2023/956 establishing the Carbon Border Adjustment Mechanism · Science Based Targets initiative Corporate Net-Zero Standard. Policy position as at Q3 2026.",
    enquirySubject: "Carbon capture — emission characterisation study",
    enquiryPrompt:
      "Meet a net-zero commitment with reductions somebody can verify. Start with an emission characterisation study covering system configuration, credit generation and the SBTi validation pathway.",
  },
];

export const CAPABILITIES_BY_SLUG: Readonly<Record<CapabilitySlug, Capability>> =
  Object.fromEntries(
    CAPABILITIES.map((capability) => [capability.slug, capability]),
  ) as Record<CapabilitySlug, Capability>;
