import {
  Code2,
  Palette,
  PenTool,
  ScanEye,
  Search,
  Server,
  Smartphone,
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: PenTool,
    title: "UI/UX Design",
    slug: "ui-ux-design",
    description:
      "Interfaces shaped by research and iteration — from wireframes to polished, tested screens.",
  },
  {
    icon: Code2,
    title: "Web Development",
    slug: "web-development",
    description:
      "Fast, maintainable websites and web apps built on modern frameworks, from marketing sites to full platforms.",
  },
  {
    icon: Server,
    title: "Backend Development",
    slug: "backend-development",
    description:
      "Robust server-side systems, APIs and data foundations designed around your product.",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    slug: "mobile-app-development",
    description:
      "Native-feeling iOS and Android apps, built with a shared codebase where it makes sense and native where it counts.",
  },
  {
    icon: ScanEye,
    title: "UX Audits & Accessibility",
    slug: "ux-audits-accessibility",
    description:
      "Independent reviews that surface usability gaps and bring your product in line with WCAG standards.",
  },
  {
    icon: Search,
    title: "SEO",
    slug: "seo",
    description:
      "Technical and on-page SEO that gets built into the product from day one, not bolted on afterwards.",
  },
  {
    icon: Palette,
    title: "Branding & Visual Identity",
    slug: "branding-visual-identity",
    description:
      "Logos, design systems and brand guidelines that hold together across every product and platform.",
  },
];

export default function Services() {
  return (
    <section id="services" className="px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-xl">
          <p className="text-sm font-medium text-accent-dark">What we do</p>
          <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
            One studio, every skill your product needs
          </h2>
          <p className="mt-4 text-ink-soft">
            We work across design and engineering, so nothing gets lost in
            translation between the two.
          </p>
        </div>

        <div className="mt-12 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, description, slug }) => (
            <Link
              key={title}
              href={`/services/${slug}`}
              className="group flex h-full flex-col rounded-2xl border border-line bg-white p-7 transition-colors duration-200 hover:border-accent/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-tint text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <Icon size={20} aria-hidden="true" />
              </div>
              <h3 className="mt-5 font-display text-lg text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {description}
              </p>
              <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-medium text-accent-dark">
                Explore service <span aria-hidden="true">↗</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
