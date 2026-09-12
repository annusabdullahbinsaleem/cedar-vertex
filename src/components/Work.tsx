import { ArrowRight } from "lucide-react";

const projects = [
  {
    name: "Marlow & Co.",
    category: "E-commerce · Web Development",
    description:
      "A rebuilt online store for a homeware retailer, cutting page load times and lifting mobile conversion.",
    gradient: "from-primary to-primary-dark",
  },
  {
    name: "Harbourline Health",
    category: "Product Design · Accessibility",
    description:
      "An appointment-booking platform redesigned around an AA accessibility standard, used across 12 clinics.",
    gradient: "from-accent to-accent-dark",
  },
  {
    name: "Fenwick Transit",
    category: "Mobile App · UX",
    description:
      "A journey-planning app for a regional transport operator, built for iOS and Android from one codebase.",
    gradient: "from-primary to-accent-dark",
  },
];

export default function Work() {
  return (
    <section id="work" className="bg-surface px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-accent-dark">Selected work</p>
            <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
              Recent projects
            </h2>
          </div>
          <p className="max-w-sm text-sm text-ink-soft">
            A sample of the kind of work we do — full case studies available
            on request as our portfolio grows.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.name}
              className="overflow-hidden rounded-2xl border border-line bg-white"
            >
              <div
                className={`h-44 bg-gradient-to-br ${project.gradient}`}
                aria-hidden="true"
              />
              <div className="p-6">
                <p className="text-xs font-medium uppercase tracking-wide text-accent-dark">
                  {project.category}
                </p>
                <h3 className="mt-2 font-display text-xl text-ink">
                  {project.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {project.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-dark">
                  View project
                  <ArrowRight size={15} aria-hidden="true" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
