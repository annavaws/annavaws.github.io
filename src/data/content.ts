export const profile = {
  name: "Annava Wisha Sikoko",
  role: "Full Stack Engineer",
  focus: "Commerce Platforms, Payments & Automation",
  location: "Indonesia",
  timezone: "Asia/Jakarta",
  email: "annavaws@gmail.com",
  linkedin: "https://www.linkedin.com/in/annava-ws/",
  github: "https://github.com/annavaws",
  summary:
    "Full stack engineer and University of Indonesia Computer Science graduate, working remotely with a Seoul-based team since 2025. I build across the stack: NestJS and PostgreSQL services, Next.js and React front ends, Shopify storefronts, and Python data pipelines.",
  lede: "I build across the stack: NestJS and PostgreSQL services, Next.js and React front ends, Shopify storefronts and Python pipelines.",
  about:
    "Recent work centres on a multi-tenant eSIM commerce platform, including marketplace integrations, payment and refund flows, security fixes, and production debugging, delivered with automated tests and an AI-assisted development workflow.",
};

export const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#game", label: "Game" },
  { href: "/blog", label: "Blog" },
];

export type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  detail: string;
};

export const stats: Stat[] = [
  {
    value: 2.3,
    prefix: "405s → ",
    suffix: "s",
    decimals: 1,
    label: "Migration backfill",
    detail: "Rewritten as set-based SQL on PlanetT",
  },
  {
    value: 66,
    label: "Origin countries",
    detail: "Destination search ordered by the shopper's country",
  },
  {
    value: 99.5,
    prefix: "31% → ",
    suffix: "%",
    decimals: 1,
    label: "Log attribution",
    detail: "Coverage of PlanetT transaction logs after the migration",
  },
  {
    value: 8,
    label: "Travel platforms",
    detail: "Hotel search-ranking scrapers delivering to Sheets and Slack",
  },
];

export type WorkProject = {
  name: string;
  tagline: string;
  dates: string;
  stack: string[];
  bullets: string[];
};

export const aisahub = {
  org: "Aisahub Inc",
  place: "Seoul, South Korea (Remote)",
  title: "Full Stack Engineer (Contract)",
  dates: "Jun 2025 - Present",
  projects: [
    {
      name: "PlanetT",
      tagline: "eSIM order-fulfilment platform for Trip.com, Shopify and Lazada",
      dates: "Jul 2026 - Present",
      stack: [
        "NestJS",
        "TypeScript",
        "Prisma",
        "PostgreSQL",
        "Redis/Bull",
        "AWS ECS",
        "GitHub Actions",
        "Next.js",
        "TanStack Query",
      ],
      bullets: [
        "Led the conversion of the platform from single-tenant to multi-tenant across the backend and admin dashboard: roles and tenancy layer, data migration and backfill, member management, and owner-scoped orders, revenue, transaction logs and affiliate data.",
        "Replaced global environment credentials with an AES-256-GCM encrypted per-site secret store and per-site OAuth flows for Shopify and Lazada, enabling self-serve site onboarding.",
        "Closed a double-purchase race condition using PostgreSQL advisory locks, and traced intermittent 502 errors to a mismatch between the Node keep-alive timeout and the load balancer idle timeout.",
        "Fixed issues found in a tenant-isolation audit: two cross-tenant read leaks, a public review endpoint exposing reviewer contact details, and a role-escalation path.",
        "Rewrote migration backfills as set-based SQL, cutting one from 132s to 28.5s and another from 405s to 2.3s while raising log attribution coverage from 31% to 99.5%.",
        "First author of 106 of the service's 118 test spec files; consolidated CI into a single required gate with migrate-before-deploy and a pre-push test check.",
        "Added Korean localisation to the dashboard with a type-safe, cookie-based i18n layer.",
      ],
    },
    {
      name: "Roamigo",
      tagline: "Shopify storefront for travel eSIMs",
      dates: "Aug 2026 - Present",
      stack: [
        "Shopify Liquid",
        "Web components",
        "Metafields",
        "Shopify Functions",
        "Shopify CLI",
      ],
      bullets: [
        "Built the custom product page with plan, duration and data selection driven by variant data, and a destination search with synonym matching and popular destinations ordered by the shopper's country across 66 origin countries.",
        "Raised the store's search and AI-engine discoverability audit score from 57 to 81 by restoring product structured data (JSON-LD) and fixing heading hierarchy.",
        "Diagnosed why the Korean storefront showed no destinations: a translation app was translating metafield identifiers. Shipped a locale-normalising fix.",
        "Delivered affiliate attribution for guest checkout through cart attributes and a discount Shopify Function covered by Vitest tests.",
      ],
    },
    {
      name: "Geared AI",
      tagline: "Community and cohort education platform",
      dates: "Jun 2026",
      stack: [
        "NestJS",
        "Fastify",
        "Drizzle",
        "PostgreSQL",
        "Next.js 15",
        "React 19",
        "Toss Payments",
        "NHN Cloud",
      ],
      bullets: [
        "Built Toss Payments checkout for paid cohorts with idempotent confirmation, server-side amount re-validation and webhooks, plus an admin-approved refund system with policy routing and partial cancellation.",
        "Built the education module (cohort and curriculum admin, private cohorts, class-material viewer) and KakaoTalk notifications; added about 237 test cases including real-database end-to-end tests.",
      ],
    },
    {
      name: "AI Ticketsmith",
      tagline: "Autonomous ticket-to-pull-request pipeline",
      dates: "May 2026 - Jun 2026",
      stack: [
        "Python",
        "Claude Code",
        "Notion API",
        "Slack",
        "GitHub CLI",
        "git worktrees",
        "Next.js 16",
        "Drizzle",
        "Neon Postgres",
      ],
      bullets: [
        "Built a service that picks up tickets, validates them with rule checks and an LLM judge, then drives a coding agent to implement, run QA, open pull requests and merge across multiple repositories in dependency order, reporting back to Slack.",
        "Built the supporting kanban board with per-project API keys and a multi-tenant documentation service with Google sign-in, audit log and a versioned read/write API.",
      ],
    },
    {
      name: "Octos",
      tagline: "Mental-health AI chat and guided meditation",
      dates: "Mar 2026 - May 2026",
      stack: [
        "React",
        "TypeScript",
        "Vite",
        "TanStack Query",
        "Zustand",
        "Tailwind",
        "Toss Payments SDK",
      ],
      bullets: [
        "Built the subscription billing flow and refund experience with localised error handling, the audio-synced guided meditation player, and the PHQ-4 questionnaire with score chart.",
        "Traced a React crash to browser auto-translate mutating dialog text nodes, and redesigned the account area with dark mode and purchase history.",
      ],
    },
    {
      name: "VUS",
      tagline: "Waste-transport logistics and dispatch web app",
      dates: "Sep 2025 - Dec 2025",
      stack: [
        "React 19",
        "TypeScript",
        "Vite",
        "TanStack Router/Query",
        "React Hook Form",
        "Zod",
        "i18next",
        "Storybook",
      ],
      bullets: [
        "Owned the settings module (company, accounts, billing, notifications) and the vehicle, driver and stop management screens; integrated tax invoicing with an external e-tax system and rolled out Korean/English localisation.",
      ],
    },
    {
      name: "Data pipelines",
      tagline: "Scrapers for travel platforms and ad-library monitoring",
      dates: "Jun 2025 - Mar 2026",
      stack: [
        "Python",
        "Playwright",
        "Chrome extensions (MV3)",
        "GitHub Actions",
        "AWS S3",
        "Google Sheets",
        "OpenAI",
        "Next.js",
      ],
      bullets: [
        "Wrote hotel search-ranking scrapers for 8 travel platforms (Agoda, Booking.com, Trip.com, Expedia, Naver, Yanolja and others), with results delivered to Google Sheets and Slack alerts.",
        "Built Chrome extensions that collect reviews and funnel metrics from partner admin pages: incremental scraping, auto-login for 4 channels, scheduled runs, and queue state that survives service-worker restarts.",
        "Built a competitor-ad monitoring pipeline that scrapes and screenshots ads, stores them in S3, de-duplicates and writes to Sheets on a daily GitHub Actions schedule, plus a Next.js app for grouping ads by drag and drop.",
      ],
    },
  ] as WorkProject[],
};

export const earlierRoles = [
  {
    org: "Nusantara Infrastructure",
    place: "Jakarta, Indonesia",
    title: "Fullstack Developer Intern",
    dates: "Sep 2024 - Dec 2024",
    text: "Revamped tolmakassar.com in Laravel and MySQL, improving performance and user experience, and added a billboard advertising section with CMS management for ads.",
  },
  {
    org: "Established Jakarta",
    place: "Jakarta, Indonesia",
    title: "Web Developer Intern",
    dates: "Mar 2024 - Jun 2024",
    text: "Built a CMS preview feature for Mulia Inti Pangan, and the company profile website and CMS authentication for Established Jakarta, using Laravel, PostgreSQL and Next.js.",
  },
  {
    org: "Faculty of Computer Science, University of Indonesia",
    place: "",
    title: "Teaching Assistant",
    dates: "Aug 2023 - Jun 2025",
    text: "Data Structures & Algorithms, Foundations of Programming 1, Automata & Theory of Languages. Supported 30+ students through lab sessions, wrote lab assignments and graded work with written feedback.",
  },
];

export const education = [
  {
    org: "University of Indonesia",
    title: "Bachelor of Computer Science, GPA 3.63 / 4.00",
    dates: "Sep 2021 - Jul 2025",
  },
  {
    org: "Bangkit Academy",
    title: "Cloud Computing Cohort, led by Google, Tokopedia, Gojek & Traveloka",
    dates: "Feb 2024 - Jun 2024",
  },
];

export type Project = {
  title: string;
  image: string;
  description: string;
  stack: string[];
  repo?: string;
};

export const projects: Project[] = [
  {
    title: "Vlecture",
    image: "/vlecture.png",
    description:
      "AI note-taking companion. In a team of six, built an app that turns lecture audio into notes, flashcards and quizzes using AWS and OpenAI transcription.",
    stack: ["FastAPI", "Next.js", "MongoDB", "Supabase"],
    repo: "https://github.com/vlecture/vlecture-api",
  },
  {
    title: "CariPasien",
    image: "/caper.png",
    description:
      "Dental clinic matching platform. In a team of five, built a web app connecting dental students and doctors with patients for treatment.",
    stack: ["Spring Boot", "Next.js", "PostgreSQL", "GCP"],
  },
  {
    title: "Invite",
    image: "/invite.png",
    description:
      "Team-matcher for students to find teammates for competitions, built for the Software Engineering class.",
    stack: ["Django", "Tailwind", "PostgreSQL", "Docker", "GCP"],
    repo: "https://github.com/daffafaizan/invite-app",
  },
  {
    title: "Nubengine",
    image: "/nubengine.png",
    description:
      "Search engine over medical datasets from ir-datasets using TF-IDF indexing, built for the Information Retrieval class.",
    stack: ["Python", "Django", "Tailwind", "GCP"],
    repo: "https://github.com/daffafaizan/nubengine",
  },
  {
    title: "Nutrious",
    image: "/nutrious.png",
    description:
      "Web and mobile app promoting better nutrition and a healthier lifestyle in Indonesia.",
    stack: ["Django", "Flutter", "Bootstrap"],
    repo: "https://github.com/jaycentg/nutrious",
  },
];

export const skills = [
  {
    group: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "Java", "PHP", "SQL"],
  },
  {
    group: "Backend",
    items: [
      "NestJS",
      "Node.js",
      "FastAPI",
      "Django",
      "Spring Boot",
      "Laravel",
      "REST",
      "OpenAPI",
    ],
  },
  {
    group: "Frontend",
    items: [
      "Next.js",
      "React",
      "TanStack Query",
      "Zustand",
      "Tailwind",
      "shadcn/ui",
      "Shopify Liquid",
      "Flutter",
    ],
  },
  {
    group: "Data",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Prisma", "Drizzle"],
  },
  {
    group: "Integrations",
    items: [
      "Shopify",
      "Lazada",
      "Trip.com",
      "Toss Payments",
      "Notion",
      "Slack",
      "Google Gemini",
    ],
  },
  {
    group: "Testing & Ops",
    items: [
      "Jest",
      "Vitest",
      "GitHub Actions",
      "Docker",
      "AWS (ECS, S3)",
      "Vercel",
      "Sentry",
    ],
  },
];
