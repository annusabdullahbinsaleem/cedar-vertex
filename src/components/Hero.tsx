import Button from "./Button";
import BristolSkyline from "./BristolSkyline";
import { MapPin } from "lucide-react";

type HeroProps = {
  onOpenProposal?: () => void;
};

export default function Hero({ onOpenProposal }: HeroProps) {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-16 lg:px-10 lg:pb-28 lg:pt-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div>
          <p className="mb-5 text-sm font-medium text-accent-dark">
            Design &amp; technology studio, Bristol
          </p>
          <h1 className="font-display text-[2.6rem] leading-[1.05] text-ink sm:text-6xl lg:text-[3.6rem]">
            Designing digital experiences. Building what&apos;s next.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
            Cedar Vertex partners with ambitious businesses to turn ideas into
            digital products people actually enjoy using — from first sketch
            to launched software.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button onClick={onOpenProposal}>Get a Proposal</Button>
            <Button href="#work" variant="secondary">
              See Our Work
            </Button>
          </div>

          <dl className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-8">
            <div>
              <dt className="sr-only">Years of combined studio experience</dt>
              <dd className="font-display text-2xl text-ink">8+</dd>
              <p className="mt-1 text-xs text-ink-soft">Years of experience</p>
            </div>
            <div>
              <dt className="sr-only">Projects delivered</dt>
              <dd className="font-display text-2xl text-ink">40+</dd>
              <p className="mt-1 text-xs text-ink-soft">Projects delivered</p>
            </div>
            <div>
              <dt className="sr-only">Client satisfaction</dt>
              <dd className="font-display text-2xl text-ink">98%</dd>
              <p className="mt-1 text-xs text-ink-soft">Client satisfaction</p>
            </div>
          </dl>
        </div>

        <div className="relative">
          <div
            className="absolute -inset-10 -z-10 rounded-full bg-accent/15 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative overflow-hidden rounded-3xl border border-line bg-linear-to-b from-accent-tint to-white p-3 shadow-[0_30px_80px_-30px_rgba(20,19,31,0.25)]">
            <div className="relative">
              <BristolSkyline />

              <div className="absolute bottom-5 left-5 flex items-center gap-2.5 sm:bottom-7 sm:left-7">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30">
                  <MapPin size={18} aria-hidden="true" />
                </span>
                <span className="rounded-full bg-white/95 px-4 py-2 text-xs font-medium text-ink shadow-md backdrop-blur">
                  Cedar Vertex HQ — Bristol, UK
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
