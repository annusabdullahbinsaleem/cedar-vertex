import {
  PenTool,
  Code2,
  Smartphone,
  ScanEye,
  Search,
  Palette,
} from "lucide-react";

const services = [
  {
    icon: PenTool,
    title: "UI/UX Design",
    description:
      "Interfaces shaped by research and iteration, not guesswork — wireframes through to polished, tested screens.",
  },
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Fast, maintainable websites and web apps built on modern frameworks, from marketing sites to full platforms.",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "Native-feeling iOS and Android apps, built with a shared codebase where it makes sense and native where it counts.",
  },
  {
    icon: ScanEye,
    title: "UX Audits & Accessibility",
    description:
      "Independent reviews that surface usability gaps and bring your product in line with WCAG standards.",
  },
  {
    icon: Search,
    title: "SEO",
    description:
      "Technical and on-page SEO that gets built into the product from day one, not bolted on afterwards.",
  },
  {
    icon: Palette,
    title: "Branding & Visual Identity",
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

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group rounded-2xl border border-line bg-white p-7 transition-colors duration-200 hover:border-accent/50"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-tint text-primary">
                <Icon size={20} aria-hidden="true" />
              </div>
              <h3 className="mt-5 font-display text-lg text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
