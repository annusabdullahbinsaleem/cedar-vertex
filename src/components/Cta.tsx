import Button from "./Button";
import { ArrowUpRight, Check, Circle, Orbit } from "lucide-react";

type CtaProps = {
  onOpenProposal?: () => void;
};

export default function Cta({ onOpenProposal }: CtaProps) {
  return (
    <section id="contact" className="px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="relative isolate overflow-hidden rounded-3xl bg-primary px-8 py-12 sm:px-12 sm:py-14 lg:px-16 lg:py-16">
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl" aria-hidden="true" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
            <div className="relative z-10 max-w-xl text-center lg:text-left">
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-medium tracking-wide text-white/80">
                <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                YOUR NEXT BIG IDEA STARTS HERE
              </p>
              <h2 className="font-display text-3xl leading-tight text-white sm:text-4xl lg:text-4xl">
                <span className="block">Have an idea?</span>
                <span className="block text-accent">Let&apos;s build it.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base lg:mx-0">
                Tell us what you&apos;re trying to build, and we&apos;ll get back
                to you within one working day.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                <Button
                  onClick={onOpenProposal}
                  variant="secondary"
                  className="border-accent! bg-accent! text-ink! hover:border-white! hover:bg-white!"
                >
                  Tell us about your project
                </Button>
              </div>
            </div>

            <div className="relative mx-auto flex aspect-square w-full max-w-[330px] items-center justify-center lg:max-w-[390px]" aria-hidden="true">
              <div className="absolute inset-[8%] rounded-full border border-white/10" />
              <div className="absolute inset-[20%] rounded-full border border-dashed border-accent/35" />
              <div className="absolute inset-[31%] rounded-full border border-white/10" />
              <div className="absolute inset-[8%] animate-[spin_28s_linear_infinite] rounded-full border border-transparent border-t-accent/70" />
              <svg viewBox="0 0 320 320" className="absolute inset-0 h-full w-full" fill="none">
                <path d="M160 32v256M32 160h256M69.5 69.5l181 181m0-181-181 181" stroke="white" strokeOpacity=".12" />
                <circle cx="160" cy="160" r="91" stroke="white" strokeOpacity=".36" />
                <ellipse cx="160" cy="160" rx="42" ry="91" stroke="white" strokeOpacity=".24" />
                <path d="M75 128h170M75 192h170" stroke="white" strokeOpacity=".2" />
                <path d="m95 173 41-43 31 27 55-65" stroke="#00B7D9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="95" cy="173" r="5" fill="#00B7D9" />
                <circle cx="136" cy="130" r="5" fill="#00B7D9" />
                <circle cx="167" cy="157" r="5" fill="#00B7D9" />
                <circle cx="222" cy="92" r="5" fill="#00B7D9" />
              </svg>
              <div className="absolute right-[8%] top-[24%] flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-primary-dark text-accent shadow-xl shadow-black/15">
                <Orbit size={19} strokeWidth={1.7} />
              </div>
              <div className="absolute bottom-[14%] left-[7%] flex items-center gap-2 rounded-full border border-white/15 bg-primary-dark/90 px-3 py-2 text-[11px] font-medium text-white/85 shadow-xl shadow-black/15">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/15 text-accent"><Check size={12} strokeWidth={2.5} /></span>
                BUILT AROUND YOUR GOALS
              </div>
              <div className="absolute left-[10%] top-[18%] h-2 w-2 rounded-full bg-accent shadow-[0_0_18px_4px_rgba(0,183,217,0.45)]" />
              <div className="absolute bottom-[23%] right-[7%] h-3 w-3 rounded-full border-2 border-accent bg-primary" />
              <Circle className="absolute right-[22%] bottom-[9%] text-white/20" size={12} />
              <ArrowUpRight className="absolute left-[24%] bottom-[8%] text-accent/60" size={17} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
