"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleHelp,
  MoveRight,
  Sparkles,
} from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProposalModal from "@/components/ProposalModal";
import ServiceVisual from "@/components/ServiceVisual";
import { getServiceBySlug, type ServiceData } from "@/lib/services";

const serviceTheme = {
  "--bg": "#FBFBFA",
  "--surface": "#F2F4F5",
  "--surface-2": "#E9EBEC",
  "--line": "#E1E4E7",
  "--ink": "#2C3E50",
  "--ink-soft": "#5C6B7A",
  "--primary": "#2C3E50",
  "--primary-dark": "#1B2732",
  "--primary-tint": "#E7EAED",
  "--accent": "#00B7D9",
  "--accent-dark": "#067A91",
  "--accent-tint": "#DFF5FA",
} as React.CSSProperties;

function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-dark">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-4xl">
        {title}
      </h2>
      {copy && <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">{copy}</p>}
    </div>
  );
}

export default function ServiceLandingPage({ service }: { service: ServiceData }) {
  const [isProposalOpen, setIsProposalOpen] = useState(false);
  const [proposalModalKey, setProposalModalKey] = useState(0);
  const relatedServices = service.related
    .map((slug) => getServiceBySlug(slug))
    .filter((related): related is ServiceData => Boolean(related));

  const openProposal = () => {
    setProposalModalKey((current) => current + 1);
    setIsProposalOpen(true);
  };

  const proposalButton = (label: string, className = "") => (
    <button
      type="button"
      onClick={openProposal}
      className={`group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${className}`}
    >
      {label}
      <ArrowUpRight
        size={17}
        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden="true"
      />
    </button>
  );

  return (
    <>
      <ProposalModal
        key={proposalModalKey}
        isOpen={isProposalOpen}
        onClose={() => setIsProposalOpen(false)}
        initialProjectType={service.proposalType}
      />
      <div className="service-theme min-h-screen bg-bg text-ink" style={serviceTheme}>
        <Navbar onOpenProposal={openProposal} />
        <main id="main-content" className="overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <nav aria-label="Breadcrumb" className="pt-8 text-sm text-ink-soft">
              <ol className="flex flex-wrap items-center gap-2">
                <li><Link href="/" className="transition-colors hover:text-accent-dark">Home</Link></li>
                <li aria-hidden="true" className="text-slate-600">/</li>
                <li><Link href="/#services" className="transition-colors hover:text-accent-dark">Services</Link></li>
                <li aria-hidden="true" className="text-slate-600">/</li>
                <li aria-current="page" className="text-ink">{service.title}</li>
              </ol>
            </nav>

            <section className="grid min-h-[600px] items-center gap-5 py-12 md:min-h-[650px] md:grid-cols-[1.05fr_.95fr] md:py-16 lg:gap-0 lg:py-20">
              <div className="relative z-10 max-w-2xl py-4">
                <p className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-tint px-3.5 py-2 text-xs font-medium tracking-wide text-ink-soft">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_2px_rgba(0,183,217,.28)]" />
                  {service.eyebrow}
                </p>
                <h1 className="mt-6 max-w-[13ch] font-display text-4xl font-semibold leading-[1.05] tracking-[-0.045em] text-ink sm:text-5xl lg:text-6xl">
                  {service.headline}
                </h1>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
                  {service.intro}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  {proposalButton(service.ctaLabel)}
                  <Link href="#what-included" className="inline-flex min-h-12 items-center gap-2 rounded-full px-3 text-sm font-medium text-ink transition-colors hover:text-accent-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                    Explore the service <ArrowDown size={16} aria-hidden="true" />
                  </Link>
                </div>
                <p className="mt-5 text-xs text-ink-soft">Tell us what you’re working on. We’ll reply within one working day.</p>
              </div>
              <ServiceVisual slug={service.slug} />
            </section>
          </div>

          <section className="border-y border-line bg-surface">
            <div className="mx-auto grid max-w-7xl gap-5 px-6 py-10 md:grid-cols-2 lg:gap-10 lg:px-10 lg:py-14">
              <article className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[.16em] text-ink-soft">The challenge</p>
                <h2 className="mt-4 font-display text-2xl font-semibold text-ink">{service.problemTitle}</h2>
                <p className="mt-3 leading-relaxed text-ink-soft">{service.problem}</p>
              </article>
              <article className="rounded-2xl border border-accent/30 bg-accent-tint p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[.16em] text-accent-dark">The outcome</p>
                <h2 className="mt-4 font-display text-2xl font-semibold text-ink">{service.outcomeTitle}</h2>
                <p className="mt-3 leading-relaxed text-ink-soft">{service.outcome}</p>
              </article>
            </div>
          </section>

          <section id="what-included" className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
            <SectionHeading
              eyebrow="What’s included"
              title={`A focused ${service.title.toLowerCase()} engagement`}
              copy="The scope is shaped around your goals. These are the core areas we can bring together for the work."
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {service.deliverables.map((item, index) => (
                <article key={item.title} className="group rounded-2xl border border-line bg-white p-6 backdrop-blur-xl transition duration-200 hover:-translate-y-1 hover:border-accent/60 hover:bg-accent-tint">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/30 bg-accent-tint text-xs font-semibold text-accent-dark">0{index + 1}</span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="process" className="border-y border-line bg-surface">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
              <SectionHeading eyebrow="A clear process" title="From first conversation to confident next steps" copy="We keep decisions visible and move through the work in stages, so you know what is happening and why." />
              <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {service.process.map((step, index) => (
                  <li key={step.title} className="relative rounded-2xl border border-line bg-surface p-5">
                    <span className="font-display text-sm font-semibold text-accent-dark">0{index + 1}</span>
                    <h3 className="mt-4 font-display text-lg font-semibold text-ink">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.description}</p>
                    {index < service.process.length - 1 && <MoveRight className="absolute -right-3 top-7 z-10 hidden text-accent-dark/45 lg:block" size={18} aria-hidden="true" />}
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
            <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
              <SectionHeading eyebrow="Tools & practices" title="A considered toolkit for the job" copy="We choose tools around the people, product and constraints. The examples below show the kinds of methods and technology that can support this service." />
              <div className="grid gap-3 sm:grid-cols-2">
                {service.toolkit.map((item) => (
                  <article key={item.name} className="flex items-start gap-3 rounded-xl border border-line bg-white p-4 transition-colors hover:border-accent/40">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-tint text-accent-dark"><Check size={16} /></span>
                    <div><h3 className="text-sm font-semibold text-ink">{item.name}</h3><p className="mt-1 text-xs leading-relaxed text-ink-soft">{item.note}</p></div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10 lg:pb-28">
            <div className="relative overflow-hidden rounded-3xl border border-accent/30 bg-accent-tint p-7 sm:p-10 lg:p-12">
              <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />
              <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
                <div className="max-w-2xl">
                  <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.17em] text-accent-dark"><Sparkles size={14} /> Project proof</p>
                  <h2 className="mt-4 font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">{service.proofTitle}</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft sm:text-base">{service.proofCopy}</p>
                </div>
                {proposalButton("Ask about relevant work", "shrink-0")}
              </div>
            </div>
          </section>

          <section className="border-y border-line bg-surface">
            <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[.8fr_1.2fr] lg:px-10 lg:py-28">
              <div>
                <SectionHeading eyebrow="FAQs" title="A few useful answers before we start" copy={`Questions about ${service.title.toLowerCase()}? Here are some things teams commonly want to know.`} />
                <div className="mt-6 inline-flex items-center gap-2 text-sm text-ink-soft"><CircleHelp size={17} className="text-accent-dark" /> Still unsure? Start a conversation.</div>
              </div>
              <div className="divide-y divide-line border-y border-line">
                {service.faqs.map((faq) => (
                  <details key={faq.question} className="group py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-medium text-ink outline-none marker:hidden focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden">
                      {faq.question}
                      <ChevronDown size={18} className="shrink-0 text-accent-dark transition-transform group-open:rotate-180" aria-hidden="true" />
                    </summary>
                    <p className="max-w-2xl pt-4 pr-8 text-sm leading-relaxed text-ink-soft">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <SectionHeading eyebrow="Related services" title="Connected skills, one collaborative team" />
              <Link href="/#services" className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-accent-dark">All services <MoveRight size={16} aria-hidden="true" /></Link>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {relatedServices.map((related) => (
                <Link key={related.slug} href={`/services/${related.slug}`} className="group rounded-2xl border border-line bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-accent/60 hover:bg-accent-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                  <span className="text-xs font-medium uppercase tracking-[.13em] text-accent-dark">Explore service</span>
                  <span className="mt-3 flex items-center justify-between gap-4 font-display text-lg font-semibold text-ink">{related.title}<ArrowUpRight size={18} className="shrink-0 text-ink-soft transition-colors group-hover:text-accent-dark" aria-hidden="true" /></span>
                  <span className="mt-2 block text-sm leading-relaxed text-ink-soft">{related.cardDescription}</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="px-6 pb-20 lg:px-10 lg:pb-28">
            <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-accent/30 bg-surface px-6 py-12 text-center sm:px-12 sm:py-16">
              <div className="absolute left-1/2 top-0 h-52 w-72 -translate-x-1/2 rounded-full bg-cyan-300/[.09] blur-3xl" aria-hidden="true" />
              <div className="relative mx-auto max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[.18em] text-accent-dark">Let’s make progress</p>
                <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-[-.035em] text-ink sm:text-4xl">Have a {service.title.toLowerCase()} project in mind?</h2>
                <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-soft sm:text-base">Tell us what you are trying to achieve. We’ll help you work out a sensible next step and reply within one working day.</p>
                <div className="mt-7">{proposalButton(service.ctaLabel)}</div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
