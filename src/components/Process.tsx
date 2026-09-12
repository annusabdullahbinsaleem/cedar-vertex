interface Step {
  number: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Discover",
    description:
      "We start by understanding your business, your users and what success actually looks like.",
  },
  {
    number: "02",
    title: "Define",
    description:
      "Requirements, scope and priorities get set clearly, so there are no surprises later in the build.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "Wireframes, prototypes and visual design, tested and refined with real feedback before a line of code is final.",
  },
  {
    number: "04",
    title: "Build",
    description:
      "Development in the open — regular check-ins, staging links, and code built to last past launch day.",
  },
  {
    number: "05",
    title: "Launch",
    description:
      "We ship, monitor, and stay on hand for the fixes and refinements that come with real usage.",
  },
];

export default function Process() {
  return (
    <section className="bg-primary-dark px-6 py-20 text-bg lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-xl">
          <p className="text-sm font-medium text-accent">How we work</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">
            A process built for clarity, start to finish
          </h2>
        </div>

        <ol className="mt-14 grid gap-0 divide-y divide-white/10 border-t border-white/10 lg:grid-cols-5 lg:gap-8 lg:divide-y-0 lg:border-t-0">
          {steps.map((step) => (
            <li key={step.number} className="py-7 lg:py-0">
              <span className="font-display text-sm text-accent/80">
                {step.number}
              </span>
              <h3 className="mt-3 font-display text-xl">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
