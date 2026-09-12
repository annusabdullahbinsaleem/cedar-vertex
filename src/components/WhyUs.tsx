import { Check } from "lucide-react";

const points = [
  {
    title: "Design-led thinking",
    description:
      "Every project starts with the problem, not the interface — design decisions are made to earn their place.",
  },
  {
    title: "Modern technology",
    description:
      "We build on stacks that stay maintainable years after launch, not whatever is trending this month.",
  },
  {
    title: "User experience first",
    description:
      "We test with real people early, so decisions are based on how a product is actually used.",
  },
  {
    title: "Accessibility as standard",
    description:
      "WCAG-conscious design and code from the first sketch, not an afterthought before launch.",
  },
  {
    title: "Business-focused solutions",
    description:
      "We design for the metrics that matter to your business, not just for the portfolio shot.",
  },
  {
    title: "Collaborative by default",
    description:
      "You're in the room for the decisions that matter, with clear updates between the ones you're not.",
  },
];

export default function WhyUs() {
  return (
    <section id="about" className="px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
        <div>
          <p className="text-sm font-medium text-accent-dark">Why Cedar Vertex</p>
          <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
            A studio built to work as an extension of your team
          </h2>
          <p className="mt-5 text-ink-soft">
            We&apos;re a small studio by design — big enough to cover design,
            engineering and strategy, small enough that you always know who
            you&apos;re talking to.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {points.map((point) => (
            <div key={point.title} className="flex gap-3.5">
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-tint text-primary">
                <Check size={14} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-base text-ink">
                  {point.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
