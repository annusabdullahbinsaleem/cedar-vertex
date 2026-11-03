export type CaseStudy = {
  slug: string;
  name: string;
  category: string;
  descriptor: string;
  summary: string;
  heroImage: string;
  heroScreens: CaseScreen[];
  accent: string;
  client: string;
  platform: string;
  services: string[];
  challenge: string;
  approach: string;
  solution: { title: string; description: string }[];
  gallery: CaseScreen[];
  outcome: string;
};

export type CaseScreen = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  device: "desktop" | "phone";
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "tohito",
    name: "Tohito",
    category: "Pet care · Booking marketplace",
    descriptor: "Care for pets. Confidence for people.",
    summary: "A considered pet-care marketplace that brings trusted sitters, useful search tools and booking details into one clear journey.",
    heroImage: "/images/portfolio/tohito-banner.png",
    heroScreens: [
      { src: "/images/case-studies/tohito-home.png", alt: "Tohito home page introducing neighbourhood pet care", caption: "Tohito home", width: 1920, height: 1080, device: "desktop" },
      { src: "/images/case-studies/tohito-map-desktop.png", alt: "Tohito map search showing pet-friendly stays", caption: "Map search", width: 1920, height: 2103, device: "desktop" },
    ],
    accent: "#fb4145",
    client: "Tohito",
    platform: "Responsive web experience",
    services: ["Product strategy", "UX/UI design", "Web development"],
    challenge: "Finding the right pet sitter can mean piecing together availability, location, services and trust from different places. Tohito needed one experience that made it easier to discover suitable care and understand what happens next.",
    approach: "We shaped the journey around the questions pet owners ask first: where care is available, which services fit their pet, who is offering them and what the booking will include. Search, map and listing views keep those choices connected.",
    solution: [
      { title: "Search around real needs", description: "Location, dates, pet details and stay preferences give owners a focused starting point." },
      { title: "Compare sitters with context", description: "Listing cards bring availability, location, ratings and nightly pricing into a scan-friendly view." },
      { title: "See the neighbourhood", description: "A map view helps people understand where options sit before they choose a listing." },
      { title: "Make the booking clear", description: "A structured checkout gathers stay details, add-ons and charges in one place." },
    ],
    gallery: [
      { src: "/images/case-studies/tohito-home.png", alt: "Tohito home page introducing neighbourhood pet care", caption: "The home page introduces the service and makes the next step clear.", width: 1920, height: 1080, device: "desktop" },
      { src: "/images/case-studies/tohito-onboarding.png", alt: "Tohito host onboarding form for home and pet-friendly amenities", caption: "A guided onboarding flow helps hosts describe their home.", width: 1920, height: 1806, device: "desktop" },
      { src: "/images/case-studies/tohito-map-desktop.png", alt: "Tohito map search showing pet-friendly stays and location filters", caption: "Map search brings location and discovery into one view.", width: 1920, height: 2103, device: "desktop" },
      { src: "/images/case-studies/tohito-checkout.png", alt: "Tohito booking checkout with stay details and charges", caption: "A transparent review of the stay before checkout.", width: 2146, height: 2077, device: "desktop" },
    ],
    outcome: "The resulting experience connects discovery, comparison and checkout in a single pet-care marketplace journey.",
  },
  {
    slug: "ez-beauty",
    name: "EZ Beauty",
    category: "Beauty · Services & commerce",
    descriptor: "A better way to find your next beauty ritual.",
    summary: "A mobile beauty marketplace where people can explore local providers, book appointments and shop products from one app.",
    heroImage: "/images/portfolio/ez-beauty-banner.png",
    heroScreens: [
      { src: "/images/case-studies/ez-beauty-home-screen.jpg", alt: "EZ Beauty home screen with service categories and featured products", caption: "Beauty discovery", width: 154, height: 336, device: "phone" },
      { src: "/images/case-studies/ez-beauty-booking-screen.jpg", alt: "EZ Beauty appointment booking calendar", caption: "Appointment booking", width: 373, height: 1232, device: "phone" },
    ],
    accent: "#eb2681",
    client: "EZ Beauty",
    platform: "Mobile app",
    services: ["Product strategy", "UX/UI design", "Mobile product design"],
    challenge: "Beauty discovery often spans separate tools for finding a salon, choosing a service, scheduling a time and buying products. EZ Beauty brings these needs into one marketplace, so its interface has to make a broad catalogue feel easy to navigate.",
    approach: "We organised the experience around familiar paths: browse categories, explore a provider, choose a service or product, and take the next step. Clear tabs and consistent cards help users move between appointments and shopping without losing their place.",
    solution: [
      { title: "Browse providers", description: "Store profiles bring location, opening hours, services and products together." },
      { title: "Book a service", description: "A calendar and available time slots make appointment selection direct and easy to scan." },
      { title: "Shop with confidence", description: "Product detail pages show options, pricing, store context and a clear add-to-cart action." },
      { title: "Keep discovery connected", description: "Shared categories, search and saved items connect salon services with beauty products." },
    ],
    gallery: [
      { src: "/images/case-studies/ez-beauty-onboarding-screen.jpg", alt: "EZ Beauty app splash screen introducing the mobile experience", caption: "The app opens with a bold, recognisable brand introduction.", width: 373, height: 808, device: "phone" },
      { src: "/images/case-studies/ez-beauty-home-screen.jpg", alt: "EZ Beauty home screen with service categories and featured products", caption: "The home screen combines service categories and product discovery.", width: 154, height: 336, device: "phone" },
      { src: "/images/case-studies/ez-beauty-booking-screen.jpg", alt: "EZ Beauty appointment booking calendar and available time slots", caption: "Appointment selection with available time slots.", width: 373, height: 1232, device: "phone" },
      { src: "/images/case-studies/ez-beauty-product-screen.jpg", alt: "EZ Beauty product page with product details and cart action", caption: "Product information, variants and cart action.", width: 373, height: 1270, device: "phone" },
    ],
    outcome: "One mobile product supports the complete beauty discovery loop, from finding a provider to booking a service or adding a product to the cart.",
  },
  {
    slug: "instantpay",
    name: "InstantPay",
    category: "Fintech · Digital banking",
    descriptor: "Everyday money, made easier to manage.",
    summary: "A mobile finance experience bringing account balances, cards and everyday payment actions into a single home.",
    heroImage: "/images/portfolio/instant-pay-banner.png",
    heroScreens: [
      { src: "/images/case-studies/instantpay-home-screen.png", alt: "InstantPay home screen showing account balances and recent payments", caption: "Account overview", width: 356, height: 797, device: "phone" },
      { src: "/images/case-studies/instantpay-onboarding-1-screen.png", alt: "InstantPay onboarding screen introducing the mobile banking app", caption: "Welcome to InstantPay", width: 356, height: 797, device: "phone" },
    ],
    accent: "#e5091b",
    client: "InstantPay",
    platform: "Mobile app",
    services: ["Product strategy", "UX/UI design", "Fintech product design"],
    challenge: "A money app needs to make key information easy to find while helping people feel in control of sensitive actions. InstantPay’s screens bring accounts, payments, cards and account setup into a compact mobile experience.",
    approach: "We gave the home view a clear information hierarchy, separated account and card management into distinct areas, and kept common actions within a consistent navigation pattern. Sign-up screens use a focused, step-by-step layout.",
    solution: [
      { title: "Understand your accounts", description: "A consolidated overview presents balances and recent payment activity together." },
      { title: "Manage cards", description: "Dedicated card controls distinguish virtual and physical cards and surface their status." },
      { title: "Move through setup", description: "A simple sign-up flow keeps the first step focused and easy to complete." },
      { title: "Keep navigation predictable", description: "Consistent tabs and bottom navigation make key areas easy to revisit." },
    ],
    gallery: [
      { src: "/images/case-studies/instantpay-onboarding-1-screen.png", alt: "InstantPay onboarding welcome screen with product introduction", caption: "A product introduction that sets the tone for the app.", width: 356, height: 797, device: "phone" },
      { src: "/images/case-studies/instantpay-onboarding-2-screen.png", alt: "InstantPay onboarding screen previewing the account home experience", caption: "Onboarding previews the account experience before sign-up.", width: 356, height: 797, device: "phone" },
      { src: "/images/case-studies/instantpay-home-screen.png", alt: "InstantPay home screen showing account balances and recent payments", caption: "A single overview for balances and recent activity.", width: 356, height: 797, device: "phone" },
      { src: "/images/case-studies/instantpay-cards-screen.png", alt: "InstantPay card management screen for virtual and physical cards", caption: "Card types and status are grouped in one view.", width: 356, height: 797, device: "phone" },
    ],
    outcome: "The product brings account visibility, card management and onboarding into a coherent mobile banking interface.",
  },
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
