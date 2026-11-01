export type ServiceSlug =
  | "ui-ux-design"
  | "web-development"
  | "backend-development"
  | "mobile-app-development"
  | "ux-audits-accessibility"
  | "seo"
  | "branding-visual-identity";

export type ServiceData = {
  slug: ServiceSlug;
  title: string;
  cardDescription: string;
  eyebrow: string;
  headline: string;
  intro: string;
  ctaLabel: string;
  proposalType: string;
  problemTitle: string;
  problem: string;
  outcomeTitle: string;
  outcome: string;
  deliverables: { title: string; description: string }[];
  process: { title: string; description: string }[];
  toolkit: { name: string; note: string }[];
  proofTitle: string;
  proofCopy: string;
  faqs: { question: string; answer: string }[];
  related: ServiceSlug[];
};

export const services: ServiceData[] = [
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    cardDescription: "Interfaces shaped by research and iteration, from wireframes to polished, tested screens.",
    eyebrow: "Product design, made purposeful",
    headline: "Design digital products that feel clear from the first click.",
    intro: "We turn user needs and business goals into considered journeys, useful prototypes and interfaces your team can confidently build on.",
    ctaLabel: "Discuss a design project",
    proposalType: "UI/UX / Product Design",
    problemTitle: "When the experience gets in the way",
    problem: "Unclear journeys, inconsistent screens and untested assumptions can make a useful product feel harder than it needs to be.",
    outcomeTitle: "A product people can understand and use",
    outcome: "Get a shared picture of what users need, a tested direction for the experience and a coherent interface system ready for development.",
    deliverables: [
      { title: "Product discovery", description: "User, business and product context distilled into clear design questions." },
      { title: "User journeys", description: "Flows that make key tasks easier to find, understand and complete." },
      { title: "Wireframes & prototypes", description: "Clickable concepts to explore structure and test ideas before implementation." },
      { title: "Interface design", description: "Responsive screens with clear hierarchy, useful feedback and thoughtful detail." },
      { title: "Design system foundations", description: "Reusable components, patterns and guidance to keep experiences consistent." },
    ],
    process: [
      { title: "Understand", description: "Align on users, goals, constraints and what success should look like." },
      { title: "Map", description: "Shape the information architecture and journeys around priority tasks." },
      { title: "Explore", description: "Create wireframes and visual directions, then prototype the strongest ideas." },
      { title: "Validate", description: "Use feedback and usability checks to refine the experience." },
      { title: "Handover", description: "Prepare components, states and notes so development can move forward." },
    ],
    toolkit: [
      { name: "Research", note: "Interviews, desk research and journey mapping" },
      { name: "Figma", note: "Interface design and collaborative review" },
      { name: "Prototyping", note: "Clickable flows for early feedback" },
      { name: "Design systems", note: "Tokens, components and usage guidance" },
      { name: "Accessibility", note: "Inclusive patterns considered from the start" },
    ],
    proofTitle: "See the thinking behind the interface",
    proofCopy: "A useful case study shows the brief, design decisions and confirmed outcome. We have not been given approved project details to publish here, so we will not invent a client or result. Tell us what you are planning and we can discuss relevant experience.",
    faqs: [
      { question: "Do you start with research or with visual design?", answer: "We begin by understanding the product, its users and its constraints. The right amount of research depends on what is already known and what decisions the project needs to make." },
      { question: "Can you work with our existing product or design system?", answer: "Yes. We can audit and extend an existing experience or work within your current component library and brand guidelines." },
      { question: "Will the designs be ready for developers?", answer: "The handover can include responsive layouts, component states, interaction notes and reusable design foundations agreed for the project." },
      { question: "Can you test designs with users?", answer: "We can plan and run lightweight usability checks where access to representative users is available. The method and scope are agreed before the work begins." },
    ],
    related: ["ux-audits-accessibility", "web-development", "branding-visual-identity"],
  },
  {
    slug: "web-development",
    title: "Web Development",
    cardDescription: "Fast, maintainable websites and web apps built on modern frameworks.",
    eyebrow: "Websites & web applications",
    headline: "Build a website that works hard for your business.",
    intro: "We create fast, accessible and maintainable websites and web apps, with a thoughtful experience on every screen size.",
    ctaLabel: "Discuss a web project",
    proposalType: "Website",
    problemTitle: "A website should do more than look current",
    problem: "Slow pages, confusing journeys and brittle code make it harder for visitors to act and harder for your team to keep improving the site.",
    outcomeTitle: "A dependable digital front door",
    outcome: "Give visitors a clear path to the information they need, and give your team a web foundation that can grow with the business.",
    deliverables: [
      { title: "Marketing websites", description: "Clear page structures and responsive experiences for your brand and services." },
      { title: "Web applications", description: "Interactive product experiences shaped around your users and workflows." },
      { title: "Frontend engineering", description: "Reusable, accessible interfaces built to stay understandable over time." },
      { title: "Integrations", description: "Connect the site to the content tools and services your workflow depends on." },
      { title: "Launch & handover", description: "Quality checks, deployment support and practical guidance for your team." },
    ],
    process: [
      { title: "Scope", description: "Set goals, page needs, integrations and technical constraints." },
      { title: "Plan", description: "Agree the structure, design direction and implementation approach." },
      { title: "Build", description: "Develop the experience in clear, reviewable stages." },
      { title: "Refine", description: "Check responsive behaviour, accessibility, content and performance." },
      { title: "Launch", description: "Prepare the release, hand over the work and identify sensible next steps." },
    ],
    toolkit: [
      { name: "Next.js", note: "App Router and server-rendered experiences" },
      { name: "React", note: "Composable, interactive interfaces" },
      { name: "TypeScript", note: "Safer, more maintainable application code" },
      { name: "Tailwind CSS", note: "Consistent responsive styling" },
      { name: "Web standards", note: "Accessibility, metadata and performance foundations" },
    ],
    proofTitle: "See how we approach a web build",
    proofCopy: "A useful case study shows the brief, technical decisions and confirmed outcome. We have not been given approved project details to publish here, so we will not invent a client or result. Tell us what you are planning and we can discuss relevant experience.",
    faqs: [
      { question: "Can you redesign and develop an existing website?", answer: "Yes. We can review the current site, agree what should change and carry the work through design, development and launch." },
      { question: "Can our team update the website after launch?", answer: "We can build an editing workflow around your content needs and provide guidance for the people who will maintain it." },
      { question: "How long does a website project take?", answer: "Timing depends on the scope, content readiness, integrations and review process. We will outline milestones after understanding the brief." },
      { question: "Do you support the site after launch?", answer: "We can agree follow-up support, maintenance or a handover plan that fits your team and the project." },
    ],
    related: ["ui-ux-design", "backend-development", "seo"],
  },
  {
    slug: "backend-development",
    title: "Backend Development",
    cardDescription: "Robust server-side systems, APIs and data foundations for digital products.",
    eyebrow: "APIs, data & server-side systems",
    headline: "Give your product a backend built for dependable growth.",
    intro: "We design the server-side logic, APIs and data structures that help digital products work reliably as requirements evolve.",
    ctaLabel: "Discuss a backend project",
    proposalType: "Backend / API Development",
    problemTitle: "The hidden system shapes the whole product",
    problem: "Unclear data models, fragile integrations and inconsistent APIs can slow feature work and make everyday operations harder to trust.",
    outcomeTitle: "A clearer, more resilient foundation",
    outcome: "Create a server-side architecture that is easier to reason about, safer to extend and aligned with the needs of your product.",
    deliverables: [
      { title: "Architecture & data modelling", description: "A practical structure for services, entities and the way information moves." },
      { title: "API design & development", description: "Documented endpoints with predictable contracts for your applications." },
      { title: "Database foundations", description: "Schemas and queries shaped around integrity, access patterns and change." },
      { title: "Authentication & integrations", description: "Connect identity and third-party services with clear boundaries." },
      { title: "Testing & operational handover", description: "Checks and documentation to support safe releases and ongoing ownership." },
    ],
    process: [
      { title: "Map the system", description: "Understand current services, data, users and reliability needs." },
      { title: "Design boundaries", description: "Agree API contracts, data models and security responsibilities." },
      { title: "Implement", description: "Build the required services and integrations in manageable steps." },
      { title: "Verify", description: "Test expected behaviour, edge cases and failure handling." },
      { title: "Prepare to operate", description: "Document deployment, monitoring and maintenance considerations." },
    ],
    toolkit: [
      { name: "TypeScript", note: "Shared language for typed service code" },
      { name: "REST APIs", note: "Clear request and response contracts" },
      { name: "SQL data", note: "Relational modelling and query design" },
      { name: "Cloudflare Workers", note: "Edge runtime options for suitable services" },
      { name: "Automated checks", note: "API, integration and regression coverage" },
    ],
    proofTitle: "Talk through the system behind your product",
    proofCopy: "Backend work is easiest to evaluate with real architecture and delivery context. We have not been given approved project details to publish here, so we will not invent a client or scale claim. Share your current setup and we can discuss relevant experience.",
    faqs: [
      { question: "Can you improve an existing backend?", answer: "Yes. We can first map the current architecture and identify the changes that offer the clearest value, then agree a safe implementation plan." },
      { question: "Can you build APIs for a mobile or web app?", answer: "Yes. API scope can be planned alongside the client application so data contracts, authentication and error states are considered together." },
      { question: "Which database or cloud platform should we use?", answer: "That depends on data relationships, operational needs, existing systems and expected usage. We will recommend an option after understanding those constraints." },
      { question: "Can you take over a system built by another team?", answer: "We can review the code and documentation, map risks and agree an onboarding or improvement scope before taking on changes." },
    ],
    related: ["web-development", "mobile-app-development", "ux-audits-accessibility"],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    cardDescription: "Native-feeling iOS and Android apps, built with a shared or native codebase.",
    eyebrow: "iOS & Android product experiences",
    headline: "Create a mobile app that feels right in people’s hands.",
    intro: "From product flows to release planning, we shape mobile experiences around real use, platform conventions and the needs of your business.",
    ctaLabel: "Plan a mobile app",
    proposalType: "Mobile App",
    problemTitle: "A small screen leaves little room for friction",
    problem: "Confusing onboarding, awkward flows and inconsistent behaviour can make a promising app difficult to use and maintain.",
    outcomeTitle: "A focused experience across devices",
    outcome: "Plan the right product scope, choose an appropriate native or shared-code approach and build an app that supports its core tasks.",
    deliverables: [
      { title: "Product definition", description: "Prioritised features, user journeys and a clear first release scope." },
      { title: "Mobile UX & UI", description: "Platform-aware screens, interaction states and reusable interface patterns." },
      { title: "iOS & Android development", description: "Native or cross-platform implementation chosen to fit the product." },
      { title: "API & device integrations", description: "Connect the app to backend services and relevant device capabilities." },
      { title: "Testing & release support", description: "Check device behaviour and prepare the app for a controlled release." },
    ],
    process: [
      { title: "Define the product", description: "Set the audience, core tasks, platform needs and first release scope." },
      { title: "Design the flows", description: "Prototype the key journeys and refine them around mobile use." },
      { title: "Choose the approach", description: "Compare native and shared-code options against your requirements." },
      { title: "Build & test", description: "Implement features and check them across agreed devices and conditions." },
      { title: "Prepare release", description: "Plan store assets, submission steps and a sensible post-launch path." },
    ],
    toolkit: [
      { name: "iOS", note: "Platform-specific interaction patterns" },
      { name: "Android", note: "Responsive layouts across device sizes" },
      { name: "Native or shared code", note: "Architecture selected for product needs" },
      { name: "API integration", note: "Reliable exchange with server-side services" },
      { name: "Device testing", note: "Checks across agreed devices and states" },
    ],
    proofTitle: "Discuss the product before choosing the platform",
    proofCopy: "The right mobile approach depends on the audience, feature set and operating needs. We have not been given approved mobile project details to publish here, so we will not invent a client or result. Bring us your idea and we can discuss relevant experience.",
    faqs: [
      { question: "Should we build native apps or use a shared codebase?", answer: "We compare the experience, device features, release cadence and long-term maintenance needs before recommending an approach." },
      { question: "Can you help define the first version of the app?", answer: "Yes. Product definition can help prioritise the core user journeys and decide what belongs in the first release." },
      { question: "Do you support app-store release?", answer: "Release planning and submission support can be included in the agreed scope, including preparing the required assets and checks." },
      { question: "Can the app connect to our existing systems?", answer: "We can review the available APIs and integration requirements, then scope the work needed to connect the app safely." },
    ],
    related: ["ui-ux-design", "backend-development", "web-development"],
  },
  {
    slug: "ux-audits-accessibility",
    title: "UX Audits & Accessibility",
    cardDescription: "Independent reviews that surface usability gaps and accessibility barriers.",
    eyebrow: "Usability & inclusive design review",
    headline: "Find the barriers that make your experience harder to use.",
    intro: "Get an independent review of key journeys, interface patterns and accessibility, with a clear plan for what to improve first.",
    ctaLabel: "Request an experience audit",
    proposalType: "UX Audit / Accessibility",
    problemTitle: "Small barriers can block important tasks",
    problem: "When navigation, forms or controls are difficult to understand or operate, users may abandon tasks or need help to complete them.",
    outcomeTitle: "A prioritised path to a more inclusive product",
    outcome: "Understand where people encounter friction, which issues matter most and how your team can address them in a practical order.",
    deliverables: [
      { title: "Journey review", description: "A focused walkthrough of agreed pages and priority user tasks." },
      { title: "Usability findings", description: "Clear observations on hierarchy, navigation, language and interaction." },
      { title: "Accessibility checks", description: "Review of keyboard use, focus, contrast, semantics and agreed assistive workflows." },
      { title: "Severity & impact", description: "Issues grouped by user impact and implementation priority." },
      { title: "Actionable report", description: "Practical recommendations your design and development team can act on." },
    ],
    process: [
      { title: "Set the scope", description: "Choose the product areas, user journeys and standards to review." },
      { title: "Inspect", description: "Review the experience using structured usability and accessibility checks." },
      { title: "Reproduce", description: "Record the conditions and steps needed to understand each issue." },
      { title: "Prioritise", description: "Group findings by impact and effort to support planning." },
      { title: "Review together", description: "Walk your team through the findings and answer implementation questions." },
    ],
    toolkit: [
      { name: "WCAG criteria", note: "Checks scoped to the agreed conformance target" },
      { name: "Keyboard review", note: "Navigation, focus order and visible states" },
      { name: "Screen-reader review", note: "Semantics and task flow on agreed setups" },
      { name: "Contrast & zoom", note: "Readable content across display conditions" },
      { name: "Issue reporting", note: "Evidence, severity and actionable next steps" },
    ],
    proofTitle: "A report your team can put to work",
    proofCopy: "A strong audit example should include the product context, evidence and recommendations. We have not been given approved project details to publish here, so we will not invent an outcome. We can still agree exactly what should be reviewed before an audit begins.",
    faqs: [
      { question: "Does an audit guarantee WCAG compliance?", answer: "An audit can identify and document issues against an agreed standard and scope, but it is not a certification or guarantee of complete compliance." },
      { question: "Can you review just one important journey?", answer: "Yes. We can focus the audit on a high-priority flow, such as sign-up, booking or checkout, and make the scope explicit." },
      { question: "Do you fix the issues as well?", answer: "The audit can be delivered as an independent report. Design or development support to address findings can be scoped separately." },
      { question: "What do you need from us?", answer: "We usually need access to the relevant experience, context on the intended users and a contact who can answer product questions." },
    ],
    related: ["ui-ux-design", "web-development", "mobile-app-development"],
  },
  {
    slug: "seo",
    title: "SEO",
    cardDescription: "Technical and on-page search foundations built into the product from day one.",
    eyebrow: "Technical & on-page search foundations",
    headline: "Make it easier for the right people to find your website.",
    intro: "We improve the technical foundations and page signals that help search engines understand your site and visitors find useful answers.",
    ctaLabel: "Discuss an SEO project",
    proposalType: "SEO",
    problemTitle: "Good content needs a clear path to discovery",
    problem: "Technical issues, weak page structure and missing context can make it harder for search engines and visitors to understand what a page offers.",
    outcomeTitle: "A healthier, clearer search presence",
    outcome: "Build a technically sound site structure and strengthen important pages around the questions your audience is trying to answer.",
    deliverables: [
      { title: "Technical review", description: "Crawlability, indexing, metadata, redirects and performance foundations." },
      { title: "Page structure", description: "Clear headings, internal links and page relationships." },
      { title: "On-page recommendations", description: "Practical improvements to titles, descriptions and useful page content." },
      { title: "Structured data", description: "Relevant schema recommendations where they accurately describe the page." },
      { title: "Prioritised action plan", description: "A sequence of fixes and improvements your team can implement and review." },
    ],
    process: [
      { title: "Understand the site", description: "Review business goals, priority pages and current search setup." },
      { title: "Find issues", description: "Inspect technical health, page signals and internal structure." },
      { title: "Prioritise", description: "Separate essential fixes from longer-term content opportunities." },
      { title: "Improve", description: "Implement or guide the agreed technical and on-page changes." },
      { title: "Review", description: "Check implementation and monitor meaningful search indicators over time." },
    ],
    toolkit: [
      { name: "Technical SEO", note: "Indexing, redirects and crawl paths" },
      { name: "Page metadata", note: "Titles, descriptions and canonical signals" },
      { name: "Core Web Vitals", note: "User-centred loading and interaction measures" },
      { name: "Structured data", note: "Accurate schema where it fits the content" },
      { name: "Search reporting", note: "A measurement plan agreed with your team" },
    ],
    proofTitle: "Search improvements need an honest baseline",
    proofCopy: "Search results depend on competition, content, technical health and time. We have not been given approved SEO project data to publish here, so we will not invent ranking claims. We will agree a baseline and practical measures for your site.",
    faqs: [
      { question: "Can you guarantee a particular search ranking?", answer: "No. Search visibility depends on many factors outside any one team's control. We focus on sound technical and on-page improvements and report against agreed indicators." },
      { question: "Can you work on SEO while rebuilding our website?", answer: "Yes. Planning redirects, metadata, content structure and technical requirements early can help avoid preventable search issues during a redesign." },
      { question: "Do you provide ongoing SEO support?", answer: "We can scope a one-off review or an ongoing programme, depending on the amount of implementation and monitoring your site needs." },
      { question: "Do you write all website content?", answer: "We can advise on page structure and on-page improvements. New content writing can be scoped separately around your expertise and review process." },
    ],
    related: ["web-development", "branding-visual-identity", "ui-ux-design"],
  },
  {
    slug: "branding-visual-identity",
    title: "Branding & Visual Identity",
    cardDescription: "Logos, design systems and brand guidelines that hold together across products.",
    eyebrow: "Brand systems for digital experiences",
    headline: "Build a visual identity your team can use everywhere.",
    intro: "We bring your brand into focus with a considered visual system that connects your positioning to the way people experience your products.",
    ctaLabel: "Discuss a branding project",
    proposalType: "Branding / Graphic Design",
    problemTitle: "A brand should feel like one connected idea",
    problem: "Inconsistent visuals, unclear rules and disconnected assets make it harder for a business to present itself with confidence across channels.",
    outcomeTitle: "A recognisable system, not just a logo",
    outcome: "Create a visual direction and practical toolkit your team can apply across your website, product and everyday communications.",
    deliverables: [
      { title: "Brand discovery", description: "Understand your audience, positioning, character and practical needs." },
      { title: "Visual direction", description: "Explore a coherent visual language before refining the chosen route." },
      { title: "Logo suite", description: "Flexible logo variations prepared for digital use and common placements." },
      { title: "Colour & typography", description: "A considered palette and type system with clear usage guidance." },
      { title: "Brand guidelines", description: "A useful reference for applying the identity consistently across touchpoints." },
    ],
    process: [
      { title: "Discover", description: "Align on audience, positioning, personality and existing brand assets." },
      { title: "Set direction", description: "Explore visual routes and agree the direction to develop." },
      { title: "Design the system", description: "Create the logo suite, visual elements, colour and typography." },
      { title: "Apply & refine", description: "Test the identity across the most important digital touchpoints." },
      { title: "Hand over", description: "Deliver the agreed assets and guidelines for everyday use." },
    ],
    toolkit: [
      { name: "Brand strategy", note: "Positioning, audience and brand character" },
      { name: "Vector artwork", note: "Scalable assets for digital use" },
      { name: "Typography", note: "Type hierarchy and practical usage rules" },
      { name: "Colour system", note: "Accessible, consistent colour roles" },
      { name: "Design tokens", note: "Foundations that can carry into product UI" },
    ],
    proofTitle: "A brand system should work beyond the presentation",
    proofCopy: "A useful identity case study shows the brief, design decisions and final applications. We have not been given approved project details to publish here, so we will not invent a client or result. Ask us about relevant experience for your brief.",
    faqs: [
      { question: "Can you refresh our current brand instead of starting over?", answer: "Yes. We can build on useful existing assets, identify what no longer fits and evolve the system without changing everything unnecessarily." },
      { question: "Will we receive the editable brand files?", answer: "The handover can include the agreed production files and usage guidance. File formats and ownership are confirmed in the project scope." },
      { question: "Can the identity carry into our website or app?", answer: "Yes. We can define digital-ready colours, typography and reusable visual patterns, and coordinate with a UI/UX or web project." },
      { question: "How many concepts are included?", answer: "The number of directions and revision stages depends on the agreed scope. We define those expectations before design work begins." },
    ],
    related: ["ui-ux-design", "web-development", "seo"],
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find((service) => service.slug === slug);
}
