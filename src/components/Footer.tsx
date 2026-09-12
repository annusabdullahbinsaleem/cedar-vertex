import Image from "next/image";
import Link from "next/link";

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.9 2H22l-7.6 8.7L23.3 22h-7.1l-5.5-7.2L4.3 22H1.2l8.2-9.3L1 2h7.3l5 6.6L18.9 2Zm-1.2 18h1.7L7.4 4H5.6l12.1 16Z" />
    </svg>
  );
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.28-.02-2.94-1.79-2.94-1.8 0-2.07 1.4-2.07 2.85V21h-4V9Z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const nav = [
  { label: "Home", href: "#top" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const services = [
  "UI/UX Design",
  "Web Development",
  "Mobile Development",
  "Accessibility & SEO",
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface px-6 pt-16 pb-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/logo/cedar-vertex-logo.svg"
              alt="Cedar Vertex"
              width={205}
              height={80}
              className="h-10 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
              A digital design and technology studio, helping businesses
              build products worth using.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-ink">Navigation</h3>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink-soft hover:text-accent-dark"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium text-ink">Services</h3>
            <ul className="mt-4 space-y-2.5">
              {services.map((item) => (
                <li key={item} className="text-sm text-ink-soft">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium text-ink">Contact</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
              <li>
                <a
                  href="mailto:hello@cedarvertex.com"
                  className="hover:text-accent-dark"
                >
                  hello@cedarvertex.com
                </a>
              </li>
              <li>Bristol, United Kingdom</li>
            </ul>
            <div className="mt-5 flex gap-3">
              {[
                { Icon: XIcon, label: "Cedar Vertex on X" },
                { Icon: LinkedInIcon, label: "Cedar Vertex on LinkedIn" },
                { Icon: InstagramIcon, label: "Cedar Vertex on Instagram" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-accent hover:text-accent-dark"
                >
                  <Icon width={16} height={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Cedar Vertex. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="#" className="hover:text-accent-dark">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-accent-dark">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
