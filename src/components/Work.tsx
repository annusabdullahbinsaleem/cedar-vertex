import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { caseStudies } from "@/lib/case-studies";

export default function Work() {
  return (
    <section id="work" className="scroll-mt-24 bg-surface px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-accent-dark">Selected work</p>
            <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
              Recent projects
            </h2>
          </div>
          <p className="max-w-sm text-sm text-ink-soft">
            Explore the products, decisions and digital experiences behind our recent work.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {caseStudies.map((project) => (
            <article
              key={project.name}
              className="group overflow-hidden rounded-2xl border border-line bg-white"
            >
              <div
                className="relative aspect-[2/1] w-full overflow-hidden"
                aria-hidden="true"
              >
                <Image src={project.heroImage} alt={`${project.name} project`} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              </div>
              <div className="p-6">
                <p className="text-xs font-medium uppercase tracking-wide text-accent-dark">
                  {project.category}
                </p>
                <h3 className="mt-2 font-display text-xl text-ink">
                  {project.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {project.summary}
                </p>
                <Link href={`/work/${project.slug}`} className="group mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-dark" aria-label={`Read the ${project.name} case study`}>
                  View case study <ArrowRight size={15} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
