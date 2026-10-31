// Edit this file to make the site yours. Everything on the page is driven from here.

export const profile = {
  name: "Ronica Anne Matawaran",
  title: "Senior Web Developer | Full-Stack PHP & JavaScript | CRM & API Integration Specialist",
  heroSubtitle: "",
  tagline:
    "Senior web developer with 12+ years of experience building custom web applications, CRM integrations and REST API workflows for business clients.",
  siteTitle: "Ronica Anne Matawaran — Senior Web Developer",
  siteDescription:
    "Senior Web Developer with 12+ years of experience in PHP, JavaScript (React, Node.js), WordPress, WooCommerce, HubSpot CRM and REST API integrations. Based in the Philippines, working remotely.",
  email: "dronicaanne@gmail.com",
  birthday: "September 7, 1994",
  location: "Bataan, Philippines",
  // Put a PDF in /public (e.g. /resume.pdf) and set the path here to show a Resume button.
  resumeUrl: "",
};


export const titles = [
  "Senior Web Developer",
  "Full-Stack PHP & JavaScript Developer",
  "CRM & API Integration Specialist",
];

// Add your GitHub / LinkedIn URLs here when you're ready.
export const socials = [
  { label: "Email", href: "mailto:dronicaanne@gmail.com" },
  // { label: "GitHub", href: "https://github.com/your-username" },
  { label: "LinkedIn", href: "https://linkedin.com/in/ronica-matawaran" },
];

export const about: string[] = [
  "Senior Web Developer with 12+ years of experience in full-stack development using PHP, JavaScript, React.js and Node.js, with MySQL and MongoDB databases. I build custom WordPress and WooCommerce sites, design HubSpot CRM architecture, and develop REST API and webhook integrations that connect CRM, e-commerce and marketing platforms.",
  "I have worked with Australian and international clients, gathering requirements from stakeholders and delivering projects from planning to deployment in Agile environments.",
];

export type SkillGroup = { name: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  {
    name: "Frameworks & Languages",
    items: [
      "JavaScript (ES6+)",
      "Node.js",
      "React.js",
      "Next.js",
      "React Three Fiber",
      "Typescript",
      "HTML5",
      "CSS3",
      "SQL",
      "PHP",
      "Java",
      "Visual Basic",
    ],
  },
  {
    name: "CMS & E-commerce",
    items: [
      "Wordpress",
      "Shopify",
      "Joomla",
      "CS Cart",
      "X-cart",
      "Gutenberg",
      "ACF",
      "Gravity Form"
    ],
  },
  {
    name: "Databases & Hosting",
    items: [
      "MySQL",
      "MongoDB",
      "PostgreSQL",
      "MariaDB",
      "Microsoft SQL Server",
      "Amazon RDS",
      "Schema design",
      "Data modeling",
      "Normalization", 
      "SQL query",
      "AWS Server",
      "Cpanel",
    ],
  },
  {
    name: "APIs & Integration",
    items: [
      "REST API development",
      "Third-party API integration",
      "Webhooks",
      "Hubspot API",
      "Go Highlevel API",
      "Sendgrid API",
      "REX API",
      "Zapier",
      "Make",
      "n8n",
    ],
  },
  {
    name: "CRM",
    items: [
      "Hubspot",
      "GoHighlevel",
      "Infusionsoft",
      "CRM Administration",
      "Properties",
      "Pipelines",
      "Workflow Automations",
      "Campaigns",
      "Reports Dashboard",
    ],
  },
  {
    name: "Tools & Practices",
    items: [
      "Git",
      "GitHub",
      "Agile",
      "Claude",
      "ChatGPT",
      "Groq AI",
      "Requirements Gathering",
      "Perfomance Optimization",
      "Responsive",
    ],
  }
];

export const education = {
  degree: "Bachelor of Science in Information Technology",
  major: "Major in Software Development",
  school: "University of Baguio, Philippines",
  year: "March 2014",
};

export type Job = {
  period: string;
  role: string;
  company: string;
  short: string; // label used on the experience tab
  bullets: string[];
  tags: string[];
};

export const experience: Job[] = [
  {
    period: "Dec 2025 — Present",
    role: "Senior Web Developer | CRM & Automations Architect",
    company: "Scaling Systems, Australia · Remote",
    short: "Scaling Systems",
    bullets: [
      "Developed and maintained custom WordPress and PHP websites for 6 clients, handling the full cycle from requirements to deployment.",
      "Designed HubSpot and GoHighLevel CRM architecture (custom objects, properties, pipelines and user access) for 3 clients supporting the sales and operations teams.",
      "Built REST API and webhook integrations between CRM, web and third-party platforms, cutting manual tasks by 85%.",
      "Manage website infrastructure, hosting, domains, DNS configuration and technical troubleshooting to keep sites reliable.",
      "Managed hosting, DNS and server configuration, and troubleshot production issues to keep sites reliable.",
    ],
    tags: ["PHP", "API Development & Integration", "Automations", "Domain & Hosting Management", "HubSpot", "GoHighLevel", "Vite", "React.js"],
  },
  {
    period: "Nov 2022 — Nov 2025",
    role: "Full-stack Developer | Project Manager | HubSpot CRM Administrator",
    company: "JR Prosperity Partners and Eternal Homes Projects, Australia · Remote",
    short: "JR Prosperity",
    bullets: [
      "Architected and implemented HubSpot CRM from scratch, translating business workflows into custom properties, objects, associations, pipelines, automations and integrations.",
      "Developed the original PHP-based business portal, then led its second-generation rebuild with Node.js and React.js for better performance and scalability.",
      "Built REST API integrations connecting HubSpot, custom forms, internal portals, payment gateways, Sendgrid, Mailgun, Xero and Aircall.",
      "Earned promotion to Project Manager, taking responsibility for project planning, stakeholder coordination, requirements and portal delivery.",
      "Designed automated workflows that streamlined business processes and reduced manual operational tasks.",
    ],
    tags: ["HubSpot", "Automations", "Hubspot API", "Sendgrid", "Mailgun", "Zapier", "Node.js", "React.js", "MongoDB", "PHP", "AWS Server", "Agile Development", "API Development", "Integrations", "Xero", "Aircall"],
  },
  {
    period: "Oct 2020 — Oct 2022",
    role: "Project-based Web Developer",
    company: "Boomering Inc., Clark, Pampanga, Philippines",
    short: "Boomering",
    bullets: [
      "Designed and developed a custom, responsive website from scratch.",
      "Administered Infusionsoft CRM, implementing automations, email campaigns and lead capture funnels.",
      "Developed custom forms and API integrations connecting website functionality with Infusionsoft CRM.",
      "Maintained website security, performance, content and basic on-page SEO, and delivered landing pages and campaign implementations.",
    ],
    tags: ["Infusionsoft", "Lead Funnels", "Email Campaigns", "Wordpress", "PHP", "API Integration", "SEO", "Custom Forms", "Domain Management", ],
  },
  {
    period: "Sep 2018 — Sep 2020",
    role: "Freelance Web Developer / First-time Mom",
    company: "",
    short: "Freelance",
    bullets: [
      "Developed customized, responsive websites and enhanced existing CMS-based platforms.",
      "Optimized website performance and implemented functional enhancements and bug fixes.",
      "Tested website functionality to improve reliability and accuracy.",
    ],
    tags: ["WordPress", "MemberPress", "Elementor", "Gutenberg", "Plugin Customization", "SEO", "Responsive", "MySQL", "PHP", "Javascript", "JQuery", "HTML5", "CSS3"],
  },
  {
    period: "Apr 2014 — Aug 2018",
    role: "Web Developer & Trainer",
    company: "Technodream Web Works, Baguio City, Philippines",
    short: "Technodream",
    bullets: [
      "Developed and customized websites using WordPress, Shopify, Joomla and other CMS platforms.",
      "Improved website performance, implemented enhancements and resolved technical and security issues.",
      "Evaluated website requirements and prepared technical quotations, estimated timelines and recommended solutions.",
      "Trained junior developers on development tools, internal systems and website maintenance.",
    ],
    tags: ["WordPress", "Plugin Customization", "Shopify", "Joomla", "X-cart", "CS-cart", "SEO", "Speed Optimization", "Web Security", "PHP", "Responsive", "Javascript", "JQuery", "HTML5", "CSS3", "Bootstrap", "Mentoring"],
  },
];

export type Project = {
  title: string;
  featured?: boolean;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
};


export const projects: Project[] = [
   {
    title: "Developer Portfolio",
    description: "A personal portfolio built with Next.js, React and TypeScript, featuring an interactive 3D background, scroll-triggered animations, and an AI assistant that answers visitors' questions about my work and guides them to the right section.",
    tags: ["Next.js", "React", "TypeScript", "React Three Fiber", "Groq API", "Web Speech API"],
    featured: true,
    image:"/projects/portfolio.webp",
    imageAlt: "Developer Portfolio",
    tall: true,
    panSeconds: 14,
  },
  {
    title: "Eternal Homes Hubspot CRM",
    featured: true,
    description:
      "Designed a HubSpot CRM for a real estate business, including custom objects, pipelines, workflows and reports. Integrated Xero and Aircall to automate lead handling and cut manual data entry.",
    tags: ["HubSpot", "CRM Architecture", "Properties & Objects", "Pipelines", "Campaigns", "Automations", "Xero", "Aircall", "Microsoft email"],
    image:"/projects/eternal-homes-x-hubspot-tall.svg",
    imageAlt: "Eternal Homes Hubspot",
    tall: true,
    panSeconds: 14,
  },
  {
    title: "Peakrealty Website",
    description: "Developed a custom WordPress theme and plugin with two-way listing sync through the REX Software CRM REST API, keeping property data current across both applications.",
    featured: true,
    tags: ["Wordpress", "Custom theme", "Rex Software CRM API", "Custom Plugin", "Responsive", "Gutenberg"],
    live: "http://peakrealty.com.au/",
    image:"/projects/peakrealty_website.webp",
    imageAlt: "Peakrealty Website",
    tall: true,
    panSeconds: 14,
  },
  {
    title: "Scaling Systems Website",
    description: "Built a custom WordPress theme with lead-capture forms integrated into the client’s GoHighLevel CRM pipeline.",
    featured: true,
    live: "https://www.scalingsystems.com.au/",
    tags: ["Wordpress", "Custom theme", "Responsive", "Go Highlevel Integration", "Gutenberg"],
    image:"/projects/scaling-systems.webp",
    imageAlt: "ScalingSystems Website",
    tall: true,
    panSeconds: 14,
  },
  {
    title: "Property Investwise Hubspot CRM",
    description:
      "Migrated client from GoHighlevel to HubSpot CRM for a real estate business, including custom objects, pipelines, workflows and reports.",
    tags: ["HubSpot", "GoHighlevel", "Opportunities", "Contacts", "CRM Migration", "Microsoft email"],
  },
  {
    title: "Eternal Homes Portal v2",
    description:
      "Rebuilt & lead the development of Eternal Homes Portal v2 created in Node.js, React.js and MongoDB for better performance and scalability. Additional features where added including tracking of properties owned by the clients.",
    tags: ["Node.js", "React.js", "MongoDB", "Hubspot API", "Database Schema"],
  },
  {
    title: "Eternal Homes Portal v1",
    description:
      "Built a client-facing portal that allows to manage listings, stock request form, submit expression of interest which is connected to the client's Hubspot Pipeline. ",
    tags: ["PHP", "Wordpress", "MySQL", "Gravity Form", "PDF Generation", "Hubspot API"],
  },
  {
    title: "Property Investwise Website",
    description: "Built a custom WordPress theme with lead-capture forms integrated into the client’s Hubspot lead pipeline.",
    tags: ["Wordpress", "Custom theme", "Responsive", "ACF", "Gutenberg", "Hubspot API"],
    live: "https://propertyinvestwise.com.au/",
  },
  {
    title: "Loxley on Bellbird Hill Website",
    description: "Developed a custom responsive WordPress theme with ACF and Gutenberg blocks for tourism & hospitality business.",
    live: "https://loxleyonbellbirdhill.com.au/",
    tags: ["Wordpress", "Custom theme", "Responsive", "ACF", "Gutenberg"],
    image:"/projects/loxley.webp",
    imageAlt: "Loxley Website",
    featured: true,
    tall: true,
    panSeconds: 20,
  },
  {
    title: "Philcoastal Website",
    description: "Developed & designed a responsive WordPress theme with ACF blocks for a petroleum and fuel storage business.",
    live: "https://www.philcoastal.com/",
    tags: ["Wordpress", "Custom theme", "Responsive", "ACF"],
  },
  {
    title: "SwipeBio Website",
    description: "Developed & designed a custom responsive WordPress theme with ACF, Gravity Form and Gutenberg blocks for digital card business.",
    live: "https://swipebio.com/",
    tags: ["Wordpress", "Custom theme", "Responsive", "Gravity Form", "ACF", "Gutenberg"],
  },
  {
    title: "Ask Lex Ph Academy Website",
    description: "Built a WooCommerce e-commerce site with LearnDash course platform and BBPress forum for an academy school.",
    live: "https://asklexph.com/",
    tags: ["Wordpress", "Custom theme", "Learndash", "Woocommerce", "BBPress", "BadgeOS", "Responsive"],
  },
];

export type Certificate = {
  title: string;
  issuer: string;
  date: string; // e.g. "Mar 2025"
  credentialId?: string;
  url?: string; // link where anyone can verify the credential
  image?: string; // file inside /public, e.g. "/certificates/hubspot.jpg"
  imageAlt?: string;
};

// Replace these placeholders with your real certificates
export const certificates: Certificate[] = [
  {
    title: "Certificate title goes here",
    issuer: "Issuing organisation",
    date: "2025",
    url: "https://example.com/verify",
  },
];

export const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
] as const;

// ---------------------------------------------------------------------------
// Navigation prompt ("Ask about Ronica's work"). Answers are pre-written and
// matched by keyword, so no AI service is needed. `target` is the id of the
// section to jump to; `href` (mailto, PDF) takes precedence over `target`.
// ---------------------------------------------------------------------------
export type Intent = {
  id: string;
  chip: string;
  keywords: string[];
  answer: string;
  target?: string;
  cta?: string;
  href?: string;
};

export const assistant = {
  title: "Ask Groq AI about me",
  intro:
    "Pick a question, or type your own. I'll answer and point you to the right part of the page.",
  placeholder: "Ask about Ronica's work…",
  empty: "Answers appear here, with a shortcut to the matching section.",
  note: "Answers are pre-written from Ronica's resume. For anything else,",
  fallback: {
    answer:
      "I don't have a pre-written answer for that one. Try a suggested question, or email Ronica directly.",
    cta: "Email Ronica",
    href: `mailto:${profile.email}`,
  },
  intents: [
    {
      id: "about",
      chip: "Tell me about Ronica.",
      keywords: ["about", "who", "bio", "background", "introduce", "yourself"],
      answer:
        "Ronica is a senior full-stack developer and CRM & automations architect with 12+ years of experience across web development, CRM implementation, systems integration and workflow automation.",
      target: "about",
      cta: "Read the full bio",
    },
    {
      id: "certificates",
      chip: "What certificates does she have?",
      keywords: ["certificate", "certification", "certified", "credential", "training", "course"],
      answer: "Her certificates are listed on this page, each with a link to verify it.",
      target: "certificates",
      cta: "See certificates",
    },
    {
      id: "built",
      chip: "What has she built?",
      keywords: ["built", "build", "project", "made", "portfolio", "create"],
      answer:
        "A HubSpot CRM built from scratch, a business portal that started in PHP and was rebuilt with Node.js and React.js, and REST API integrations connecting HubSpot, Xero, Sendgrid, Mailgun and Aircall.",
      target: "work",
      cta: "See her projects",
    },
    {
      id: "stack",
      chip: "What's her tech stack?",
      keywords: [
        "stack",
        "tech",
        "skill",
        "language",
        "framework",
        "react",
        "node",
        "php",
        "javascript",
        "mysql",
        "mongo",
      ],
      answer:
        "JavaScript, Node.js, React.js and PHP on the web side, MySQL and MongoDB for data, HubSpot, GoHighLevel and Infusionsoft for CRM, plus REST APIs and webhooks for integrations.",
      target: "skills",
      cta: "See all skills",
    },
    {
      id: "hubspot",
      chip: "What does she do with HubSpot?",
      keywords: [
        "hubspot",
        "crm",
        "gohighlevel",
        "highlevel",
        "infusionsoft",
        "automat",
        "workflow",
        "integrat",
      ],
      answer:
        "At JR Prosperity Partners she architected HubSpot CRM from scratch: custom properties and objects, associations, pipelines and automations. Today she designs HubSpot and GoHighLevel solutions at Scaling Systems.",
      target: "work",
      cta: "See the CRM work",
    },
    {
      id: "experience",
      chip: "Where has she worked?",
      keywords: [
        "experience",
        "worked",
        "career",
        "job",
        "employ",
        "compan",
        "role",
        "history",
        "years",
      ],
      answer:
        "Five roles since 2014, most recently Senior Web Developer and CRM & Automations Architect at Scaling Systems (December 2025 to present), and before that JR Prosperity Partners and Eternal Homes Projects.",
      target: "experience",
      cta: "View work history",
    },
    {
      id: "resume",
      chip: "Can I see her resume?",
      keywords: ["resume", "cv", "curriculum"],
      answer: profile.resumeUrl
        ? "Ronica's resume is available to open right here."
        : "Ronica shares her full resume on request. Email her and she'll send it over.",
      target: "contact",
      cta: profile.resumeUrl ? "Open resume" : "Go to contact",
      href: profile.resumeUrl || undefined,
    },
    {
      id: "contact",
      chip: "How can I reach her?",
      keywords: [
        "contact",
        "reach",
        "email",
        "hire",
        "hiring",
        "available",
        "availability",
        "talk",
        "message",
        "freelance",
      ],
      answer: `Email ${profile.email}, which reaches her fastest. She's open to new opportunities in full-stack development, CRM implementation and automation.`,
      target: "contact",
      cta: "Email Ronica",
      href: `mailto:${profile.email}`,
    },
  ] as Intent[],
};
