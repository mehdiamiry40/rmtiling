export type ServicePage = {
  slug: string;
  navLabel: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  image: string;
  alt: string;
  highlights: string[];
  sections: Array<{ heading: string; body: string }>;
  faq: Array<{ question: string; answer: string }>;
};

export type BlogPost = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  alt: string;
  sections: Array<{ heading: string; body: string[] }>;
};

export const servicePages: ServicePage[] = [
  {
    slug: "tiling-melbourne",
    navLabel: "Tiling",
    title: "Tiling Melbourne",
    metaTitle: "Tiling Melbourne | Wall & Floor Tiler",
    metaDescription:
      "Melbourne wall and floor tiling for bathrooms, kitchens, laundries and living areas. Clean set-outs, careful preparation and free fixed-price quotes.",
    intro:
      "RM Tiling provides wall and floor tiling across Melbourne for bathrooms, kitchens, laundries, splashbacks and living areas. We focus on clean set-outs, level surfaces and practical tile choices that suit the room.",
    image: "/images/generated/large-format-floor.webp",
    alt: "Large-format floor tiles installed through a modern Melbourne home",
    highlights: [
      "Wall and floor tiling",
      "Bathroom, kitchen and laundry tiles",
      "Large-format porcelain and ceramic tiles",
      "Clear fixed-price quote before work starts",
    ],
    sections: [
      {
        heading: "Tile set-out that makes the room feel finished",
        body: "A good tiling job starts before adhesive is mixed. We check levels, edges, trims, falls, grout joints and visual lines so the finished room feels intentional rather than patched together.",
      },
      {
        heading: "Suited to bathrooms, kitchens, laundries and floors",
        body: "We tile new rooms, renovation areas and smaller repair zones. Common work includes bathroom walls, shower floors, kitchen splashbacks, laundry floors, entry areas and open-plan living floors.",
      },
      {
        heading: "Built around preparation",
        body: "We discuss substrate condition, tile size, waterproofing needs and movement joints during quoting. That gives you a clearer price and helps avoid surprises once the job starts.",
      },
    ],
    faq: [
      {
        question: "Do you help with tile selection?",
        answer:
          "Yes. We can advise on tile size, grout colour, trims, slip resistance and practical finish choices for the room.",
      },
      {
        question: "Can you tile over existing tiles?",
        answer:
          "Sometimes. It depends on the existing surface, levels, adhesion and wet-area requirements. We assess this before recommending a method.",
      },
    ],
  },
  {
    slug: "bathroom-renovations-melbourne",
    navLabel: "Bathroom Renovations",
    title: "Bathroom Renovations Melbourne",
    metaTitle: "Bathroom Renovations Melbourne",
    metaDescription:
      "Melbourne bathroom renovation tiling, waterproofing, regrouting and finish work. Practical planning, clean workmanship and free quote requests.",
    intro:
      "Renovating a bathroom is about more than new tiles. RM Tiling helps with the tiling, waterproofing and finish details that make a bathroom easier to use, easier to clean and better protected from moisture.",
    image: "/images/generated/bathroom-hero.webp",
    alt: "Renovated bathroom with large-format tiles and frameless shower glass",
    highlights: [
      "Bathroom wall and floor tiling",
      "Shower waterproofing and set-out",
      "Feature walls and niche detailing",
      "Tidy site habits during renovation work",
    ],
    sections: [
      {
        heading: "A practical renovation sequence",
        body: "We help plan the sequence from preparation to waterproofing, tile set-out, grout, silicone and handover. That keeps the work moving and keeps the finish consistent.",
      },
      {
        heading: "Details that matter in wet areas",
        body: "Falls, junctions, niches, tile trims, silicone lines and grout choices all affect how the bathroom performs. We pay attention to those details before the finished surface goes on.",
      },
      {
        heading: "Clear advice before you commit",
        body: "You get a clear scope and quote before booking. If a room needs extra preparation or a different approach, we explain that early.",
      },
    ],
    faq: [
      {
        question: "Can you handle a full bathroom renovation?",
        answer:
          "We can help with bathroom renovation tiling, waterproofing and finish work. If other trades are required, the scope can be planned before work starts.",
      },
      {
        question: "How long does bathroom tiling take?",
        answer:
          "Timing depends on room size, tile choice, preparation and waterproofing. We confirm the expected schedule with your quote.",
      },
    ],
  },
  {
    slug: "waterproofing-melbourne",
    navLabel: "Waterproofing",
    title: "Waterproofing Melbourne",
    metaTitle: "Waterproofing Melbourne | Bathroom & Wet Area Waterproofing",
    metaDescription:
      "Melbourne bathroom and wet-area waterproofing for showers, laundries and tiled areas. Careful preparation before the tile finish goes on.",
    intro:
      "Waterproofing is one of the most important parts of a wet-area project. RM Tiling prepares showers, bathrooms and laundries so the tile finish has the right foundation beneath it.",
    image: "/images/generated/shower-regrout.webp",
    alt: "Fresh shower grout and silicone lines in a clean tiled wet area",
    highlights: [
      "Bathroom and shower waterproofing",
      "Laundry and wet-area preparation",
      "Membrane-ready substrate checks",
      "Tiling and waterproofing planned together",
    ],
    sections: [
      {
        heading: "Preparation before membrane",
        body: "Waterproofing depends on what sits underneath. We look at falls, junctions, wall and floor condition, penetrations and previous moisture issues before recommending the right approach.",
      },
      {
        heading: "Designed around the tile finish",
        body: "Waterproofing and tiling should be planned as one system. We account for tile size, shower layout, trim positions and movement areas before work begins.",
      },
      {
        heading: "Useful for renovations and repairs",
        body: "Wet-area waterproofing can be part of a full bathroom renovation, a laundry upgrade or a targeted repair where existing finishes have failed.",
      },
    ],
    faq: [
      {
        question: "Do all bathrooms need waterproofing?",
        answer:
          "Wet areas need appropriate waterproofing before tiling. The exact requirements depend on the room, layout and substrate.",
      },
      {
        question: "Can waterproofing fix an active leak?",
        answer:
          "It depends on the cause. We inspect the area first and explain whether regrouting, resealing, waterproofing or a larger repair is needed.",
      },
    ],
  },
  {
    slug: "regrouting-melbourne",
    navLabel: "Regrouting",
    title: "Regrouting Melbourne",
    metaTitle: "Regrouting Melbourne | Shower Regrout & Reseal",
    metaDescription:
      "Melbourne shower regrouting, tile regrouting and silicone resealing. Refresh tired grout, improve shower presentation and request a free quote.",
    intro:
      "Old grout and silicone can make a bathroom look tired and can let moisture into places it should not go. RM Tiling regrouts and reseals showers, bathrooms and tiled areas across Melbourne.",
    image: "/images/generated/shower-regrout.webp",
    alt: "Clean shower corner after regrouting and silicone resealing",
    highlights: [
      "Shower regrouting",
      "Bathroom grout refreshes",
      "Mouldy silicone removal and reseal",
      "Advice on leaks and failed grout",
    ],
    sections: [
      {
        heading: "A cleaner finish without a full renovation",
        body: "Regrouting can dramatically improve the look of a shower or bathroom without replacing every tile. It is often a practical first step when the tiles are still sound.",
      },
      {
        heading: "Silicone lines matter",
        body: "Corners, junctions and wet-area edges need flexible sealing. We remove failed silicone and apply a clean, suitable finish for the area.",
      },
      {
        heading: "We check the cause, not just the surface",
        body: "If grout is cracking, mouldy or loose, we look for likely causes before recommending a repair. Some leaks need more than a surface refresh.",
      },
    ],
    faq: [
      {
        question: "How long does shower regrouting take?",
        answer:
          "Many shower regrouting jobs can be completed in a day, depending on size, condition and curing requirements.",
      },
      {
        question: "Will regrouting stop a leaking shower?",
        answer:
          "Sometimes, but not always. We assess whether grout, silicone, waterproofing or another issue is likely causing the leak.",
      },
    ],
  },
  {
    slug: "leaking-shower-repairs-melbourne",
    navLabel: "Leaking Shower Repairs",
    title: "Leaking Shower Repairs Melbourne",
    metaTitle: "Leaking Shower Repairs Melbourne",
    metaDescription:
      "Melbourne leaking shower repair advice, regrouting, resealing and waterproofing support. Identify the likely cause and request a clear quote.",
    intro:
      "A leaking shower should be assessed early. RM Tiling helps identify whether the issue is failed grout, silicone, movement, waterproofing or another wet-area detail.",
    image: "/images/generated/shower-regrout.webp",
    alt: "Tiled shower after grout and silicone repair work",
    highlights: [
      "Leaking shower assessment",
      "Regrouting and resealing",
      "Wet-area repair advice",
      "Clear next steps before work starts",
    ],
    sections: [
      {
        heading: "Start with the likely cause",
        body: "We look at grout condition, silicone joints, tile movement, drainage, wall and floor junctions, and signs of moisture damage before recommending work.",
      },
      {
        heading: "Repair where possible",
        body: "Some showers can be improved with targeted regrouting and resealing. Others need deeper waterproofing or renovation work. We explain the difference before quoting.",
      },
      {
        heading: "Protect the surrounding room",
        body: "The goal is to reduce moisture risk and restore a clean finish while avoiding unnecessary demolition where a simpler repair is suitable.",
      },
    ],
    faq: [
      {
        question: "Can a leaking shower be fixed without removing tiles?",
        answer:
          "In some cases, yes. Failed grout or silicone may be repairable without removing tiles. If the waterproofing has failed, more work may be required.",
      },
      {
        question: "What are signs of a leaking shower?",
        answer:
          "Common signs include cracked grout, mouldy silicone, damp skirting, swollen cabinetry, musty smells or moisture marks near the bathroom.",
      },
    ],
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "bathroom-renovation-tiling-checklist",
    title: "Bathroom renovation tiling checklist for Melbourne homes",
    metaTitle: "Bathroom Renovation Tiling Checklist",
    metaDescription:
      "A practical bathroom renovation tiling checklist covering set-out, waterproofing, tile choice, grout, silicone and handover.",
    excerpt:
      "Plan the tiling details that affect how your bathroom looks, drains, cleans and lasts before renovation work begins.",
    date: "2026-06-01",
    readTime: "5 min read",
    category: "Bathroom Renovations",
    image: "/images/generated/bathroom-hero.webp",
    alt: "Modern tiled bathroom used for a bathroom renovation checklist",
    sections: [
      {
        heading: "Confirm the tile set-out early",
        body: [
          "Tile set-out controls how the room feels. Before work starts, confirm where full tiles land, how cuts will look at edges, and how niches, drains and trims line up.",
          "Large-format tiles can look clean and modern, but they need careful planning around falls, wall flatness and cuts.",
        ],
      },
      {
        heading: "Treat waterproofing as part of the design",
        body: [
          "Waterproofing is not a separate afterthought. Shower layout, floor falls, penetrations and tile choice should be considered before membrane work begins.",
          "Ask what preparation is needed before waterproofing and how long curing steps are expected to take.",
        ],
      },
      {
        heading: "Choose grout and silicone for maintenance",
        body: [
          "Grout colour, joint width and silicone colour all affect how easy the bathroom is to clean. Matching every surface is not always the best answer.",
          "A practical tiler will explain where flexible silicone is needed and where grout should be used.",
        ],
      },
    ],
  },
  {
    slug: "when-to-regrout-a-shower",
    title: "When should you regrout a shower?",
    metaTitle: "When to Regrout a Shower",
    metaDescription:
      "Learn the signs that a shower may need regrouting or resealing, including cracked grout, mouldy silicone and moisture marks.",
    excerpt:
      "Cracked grout, mouldy silicone and persistent damp smells are signs your shower may need more than a quick clean.",
    date: "2026-06-01",
    readTime: "4 min read",
    category: "Regrouting",
    image: "/images/generated/shower-regrout.webp",
    alt: "Clean tiled shower corner after regrouting",
    sections: [
      {
        heading: "Visible cracking or missing grout",
        body: [
          "Cracked, powdery or missing grout is one of the clearest signs a tiled shower needs attention. Water can sit in those weak points and make the area harder to maintain.",
          "If the tiles are still sound, regrouting may refresh the finish without a full renovation.",
        ],
      },
      {
        heading: "Mouldy or failed silicone",
        body: [
          "Silicone is used where movement is expected, especially corners and wall-to-floor junctions. When it splits, lifts or stays mouldy, it should be removed and replaced properly.",
        ],
      },
      {
        heading: "Check for deeper moisture issues",
        body: [
          "Regrouting is not a cure for every leak. Damp skirting, swollen cabinetry or moisture marks outside the shower should be assessed before assuming the surface is the only issue.",
        ],
      },
    ],
  },
  {
    slug: "large-format-tiles-melbourne-bathrooms",
    title: "Are large-format tiles right for your bathroom?",
    metaTitle: "Large-Format Bathroom Tiles Melbourne",
    metaDescription:
      "Pros, planning considerations and maintenance notes for using large-format tiles in Melbourne bathroom renovations.",
    excerpt:
      "Large-format tiles can create a clean modern bathroom, but substrate preparation, falls and set-out matter more than ever.",
    date: "2026-06-01",
    readTime: "4 min read",
    category: "Tiling",
    image: "/images/generated/large-format-floor.webp",
    alt: "Large-format floor tiles in a modern home",
    sections: [
      {
        heading: "They reduce grout lines",
        body: [
          "Large-format tiles are popular because they create a calmer, cleaner look with fewer grout joints. That can make bathrooms feel larger and easier to maintain.",
        ],
      },
      {
        heading: "They need flatter surfaces",
        body: [
          "Bigger tiles are less forgiving on uneven walls and floors. Substrate checks and preparation are important before choosing a tile size.",
        ],
      },
      {
        heading: "Falls and drains need planning",
        body: [
          "In showers and wet areas, large tiles need careful planning around floor falls and drain positions. A smaller tile or different layout can sometimes be more practical.",
        ],
      },
    ],
  },
];

export function getServicePage(slug: string) {
  return servicePages.find((page) => page.slug === slug);
}

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
