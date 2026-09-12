import Button from "./Button";

export default function Cta() {
  return (
    <section id="contact" className="px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center sm:px-16">
          <div
            className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"
            aria-hidden="true"
          />
          <h2 className="font-display text-3xl text-white sm:text-4xl">
            Have an idea? Let&apos;s build it.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-white/75">
            Tell us what you&apos;re trying to build, and we&apos;ll get back
            to you within one working day.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button href="mailto:hello@cedarvertex.com" variant="ghost-light">
              hello@cedarvertex.com
            </Button>
            <Button
              href="#top"
              variant="secondary"
              showIcon={false}
              className="border-white/40! text-white! hover:bg-white! hover:text-ink!"
            >
              Book a call
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
