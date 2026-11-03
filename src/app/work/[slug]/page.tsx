import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowRight, Check } from "lucide-react";
import CaseStudyShell, { ProposalModalTrigger } from "@/components/CaseStudyShell";
import { caseStudies, getCaseStudyBySlug, type CaseScreen } from "@/lib/case-studies";
import { notFound } from "next/navigation";

const siteUrl = "https://www.cedarvertex.com";
type PageProps = { params: Promise<{ slug: string }> };

function DeviceMockup({ screen, priority = false }: { screen: CaseScreen; priority?: boolean }) {
  if (screen.device === "desktop") {
    return (
      <div className="overflow-hidden rounded-[1.1rem] border border-white/70 bg-[#f7f8fa] p-2 shadow-[0_24px_70px_-25px_rgba(16,24,40,0.42)] ring-1 ring-black/10">
        <div className="flex h-8 items-center gap-1.5 px-2">
          <span className="h-2 w-2 rounded-full bg-[#ff6b66]" />
          <span className="h-2 w-2 rounded-full bg-[#f6c453]" />
          <span className="h-2 w-2 rounded-full bg-[#62c977]" />
          <span className="ml-3 h-4 flex-1 rounded-md border border-black/5 bg-white/80" />
        </div>
        <div className="relative aspect-[1.55] overflow-hidden rounded-b-[0.7rem] bg-white">
          <Image src={screen.src} alt={screen.alt} fill priority={priority} sizes="(max-width: 768px) 90vw, 48vw" className="object-cover object-top" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-[0.46] w-full rounded-[2.6rem] border-[7px] border-[#17191d] bg-[#17191d] p-[3px] shadow-[0_28px_70px_-25px_rgba(16,24,40,0.5)] ring-1 ring-white/80">
      <div className="absolute inset-[3px] overflow-hidden rounded-[2.05rem] bg-white">
        <Image src={screen.src} alt={screen.alt} fill priority={priority} sizes="(max-width: 768px) 55vw, 250px" className="object-cover" />
      </div>
    </div>
  );
}

export const dynamicParams = false;
export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return { title: "Case study not found | Cedar Vertex" };
  const title = `${study.name} Case Study | Cedar Vertex`;
  return {
    title,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: { title, description: study.summary, url: `${siteUrl}/work/${study.slug}`, siteName: "Cedar Vertex", type: "article", locale: "en_GB", images: [study.heroImage] },
    twitter: { card: "summary_large_image", title, description: study.summary, images: [study.heroImage] },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();
  const nextStudy = caseStudies[(caseStudies.findIndex(({ slug: itemSlug }) => itemSlug === slug) + 1) % caseStudies.length];
  const isWebProduct = study.heroScreens[0].device === "desktop";

  return (
    <CaseStudyShell>
      <main id="main-content">
        <section className="overflow-hidden px-6 pb-16 pt-6 lg:px-10 lg:pb-24" style={{ background: `radial-gradient(ellipse at 76% 38%, ${study.accent}20 0%, transparent 38%), linear-gradient(145deg, #ffffff 0%, #f6f7f8 72%, ${study.accent}0d 100%)` }}>
          <div className="mx-auto max-w-7xl">
            <Link href="/#work" className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-accent-dark"><ArrowLeft size={16} aria-hidden="true" /> All projects</Link>
            <div className="grid items-center gap-12 pt-11 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 lg:pt-14">
              <div className="relative z-10 pb-2">
                <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft shadow-sm"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: study.accent }} /> {study.category}</p>
                <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: study.accent }}>{study.name} <span className="px-1 text-ink-soft">/</span> Case study</p>
                <h1 className="mt-4 max-w-2xl font-display text-5xl leading-[1.02] tracking-[-0.055em] text-ink sm:text-6xl lg:text-[4.5rem]">{study.descriptor}</h1>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">{study.summary}</p>
                <a href="#the-work" className="mt-8 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5" style={{ backgroundColor: study.accent }}><span>Explore the case</span><ArrowDown size={16} aria-hidden="true" /></a>
                <dl className="mt-10 grid max-w-xl grid-cols-2 gap-6 border-t border-line/90 pt-6 sm:grid-cols-3">
                  <div><dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft">Client</dt><dd className="mt-2 text-sm font-semibold text-ink">{study.client}</dd></div>
                  <div><dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft">Platform</dt><dd className="mt-2 text-sm font-semibold text-ink">{study.platform}</dd></div>
                  <div className="col-span-2 sm:col-span-1"><dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft">Services</dt><dd className="mt-2 text-sm font-semibold leading-relaxed text-ink">{study.services.join(" · ")}</dd></div>
                </dl>
              </div>
              <div className="relative isolate mx-auto w-full max-w-[700px]">
                <div className="absolute inset-[8%] rounded-full blur-3xl" style={{ backgroundColor: `${study.accent}1a` }} aria-hidden="true" />
                <div className={`relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/55 p-4 shadow-[0_30px_90px_-60px_rgba(16,24,40,0.35)] backdrop-blur-sm sm:p-7 ${isWebProduct ? "min-h-[420px] sm:min-h-[500px]" : "min-h-[560px] sm:min-h-[620px]"}`}>
                  <div className="absolute left-6 top-6 z-30 inline-flex items-center gap-2 rounded-full border border-line/80 bg-white/90 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-soft shadow-sm"><span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: study.accent }} /> Product preview</div>
                  <div className={`absolute z-10 ${study.heroScreens[0].device === "desktop" ? "left-[5%] top-[18%] w-[86%]" : "left-[17%] top-[14%] w-[38%] max-w-[235px]"}`}><DeviceMockup screen={study.heroScreens[0]} priority /></div>
                  <div className={`absolute z-20 ${study.heroScreens[1].device === "desktop" ? "bottom-[5%] right-[3%] w-[48%]" : "right-[5%] top-[26%] w-[33%] max-w-[200px]"}`}><DeviceMockup screen={study.heroScreens[1]} /></div>
                  <div className="absolute bottom-5 left-6 z-30 max-w-[45%] rounded-xl border border-white bg-white/90 px-3.5 py-2.5 shadow-sm sm:bottom-7 sm:left-7"><p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-soft">Featured screens</p><p className="mt-1 text-xs font-semibold text-ink">{study.heroScreens.map(({ caption }) => caption).join(" · ")}</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="the-work" className="scroll-mt-24 bg-white px-6 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            <div><p className="text-sm font-semibold" style={{ color: study.accent }}>01 / The opportunity</p><h2 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl">A clearer path through a complex choice.</h2></div>
            <div className="grid gap-10 sm:grid-cols-2">
              <div><h3 className="font-display text-xl text-ink">The challenge</h3><p className="mt-4 text-base leading-relaxed text-ink-soft">{study.challenge}</p></div>
              <div><h3 className="font-display text-xl text-ink">Our approach</h3><p className="mt-4 text-base leading-relaxed text-ink-soft">{study.approach}</p></div>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl"><p className="text-sm font-semibold" style={{ color: study.accent }}>02 / The solution</p><h2 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl">Every detail moves the experience forward.</h2><p className="mt-4 text-base leading-relaxed text-ink-soft">A joined-up product experience built around the moments that matter most.</p></div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {study.solution.map((item, index) => <article key={item.title} className="rounded-2xl border border-line bg-white p-6 sm:p-7"><span className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold" style={{ color: study.accent, backgroundColor: `${study.accent}14` }}>0{index + 1}</span><h3 className="mt-6 font-display text-lg leading-snug text-ink">{item.title}</h3><p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.description}</p></article>)}
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-surface px-6 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-end justify-between gap-6"><div className="max-w-2xl"><p className="text-sm font-semibold" style={{ color: study.accent }}>03 / The experience</p><h2 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl">Designed to work beautifully, screen by screen.</h2></div><p className="max-w-sm text-sm leading-relaxed text-ink-soft">A closer look at the core journeys and interface details.</p></div>
            <div className="mt-12 grid items-start gap-5 md:grid-cols-2 lg:grid-cols-3">
              {study.gallery.map((image, index) => <figure key={image.src} className={`rounded-2xl border border-line bg-white p-4 shadow-sm sm:p-5 ${index % 2 === 1 ? "lg:mt-12" : ""}`}><div className={`mx-auto ${image.device === "phone" ? "w-[min(100%,260px)]" : "w-full"}`}><DeviceMockup screen={image} /></div><figcaption className="flex items-start gap-3 px-1 pb-1 pt-5 text-sm leading-relaxed text-ink-soft"><Check size={17} className="mt-0.5 shrink-0" style={{ color: study.accent }} aria-hidden="true" />{image.caption}</figcaption></figure>)}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 lg:px-10 lg:py-28"><div className="mx-auto grid max-w-7xl items-start gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24"><div><p className="text-sm font-semibold" style={{ color: study.accent }}>04 / The result</p><h2 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl">A product with a clearer point of view.</h2></div><p className="max-w-3xl text-xl leading-relaxed text-ink-soft">{study.outcome}</p></div></section>

        <section className="px-6 pb-20 lg:px-10 lg:pb-28"><div className="mx-auto flex max-w-7xl flex-col gap-8 rounded-3xl bg-primary px-8 py-10 text-white sm:px-12 sm:py-12 md:flex-row md:items-center md:justify-between"><div><p className="text-sm font-medium text-accent">Have a project in mind?</p><h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">Let&apos;s make it happen.</h2></div><ProposalModalTrigger className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-primary transition hover:bg-accent hover:text-primary-dark">Talk to our team <ArrowRight size={17} aria-hidden="true" /></ProposalModalTrigger></div></section>

        <section className="border-t border-line px-6 py-8 lg:px-10"><div className="mx-auto flex max-w-7xl items-center justify-between gap-6"><Link href="/#work" className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft hover:text-accent-dark"><ArrowLeft size={16} aria-hidden="true" /> All projects</Link><Link href={`/work/${nextStudy.slug}`} className="text-right"><span className="block text-xs uppercase tracking-wider text-ink-soft">Next case study</span><span className="mt-1 inline-flex items-center gap-2 font-display text-lg text-ink">{nextStudy.name}<ArrowRight size={16} aria-hidden="true" /></span></Link></div></section>
      </main>
    </CaseStudyShell>
  );
}
