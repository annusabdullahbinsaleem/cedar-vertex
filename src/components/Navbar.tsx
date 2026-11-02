"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Button from "./Button";

const navLinks = [
  { label: "Home", href: "/", sectionId: "home" },
  { label: "Services", href: "/#services", sectionId: "services" },
  { label: "Work", href: "/#work", sectionId: "work" },
  { label: "About", href: "/#about", sectionId: "about" },
  { label: "Contact", href: "/#contact", sectionId: "contact" },
];

type NavbarProps = {
  onOpenProposal?: () => void;
};

export default function Navbar({ onOpenProposal }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const isClickScrolling = useRef(false);
  const clickScrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollEndHandler = useRef<(() => void) | null>(null);
  const pathname = usePathname();

  const clearClickScrollLock = () => {
    isClickScrolling.current = false;
    if (clickScrollTimeout.current) {
      clearTimeout(clickScrollTimeout.current);
      clickScrollTimeout.current = null;
    }
    if (scrollEndHandler.current) {
      window.removeEventListener("scrollend", scrollEndHandler.current);
      scrollEndHandler.current = null;
    }
  };

  const lockClickScroll = () => {
    clearClickScrollLock();
    isClickScrolling.current = true;

    const unlock = () => clearClickScrollLock();
    scrollEndHandler.current = unlock;
    window.addEventListener("scrollend", unlock, { once: true });
    // Keep a fallback for browsers that do not dispatch scrollend.
    clickScrollTimeout.current = setTimeout(unlock, 1200);
  };

  useEffect(() => () => clearClickScrollLock(), []);

  useEffect(() => {
    if (pathname !== "/") return;

    const sections = navLinks
      .filter(({ sectionId }) => sectionId !== "home")
      .map(({ sectionId }) => document.getElementById(sectionId))
      .filter((section): section is HTMLElement => Boolean(section));

    const sectionEntries = new Map<string, IntersectionObserverEntry>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            sectionEntries.set(entry.target.id, entry);
          } else {
            sectionEntries.delete(entry.target.id);
          }
        });

        if (isClickScrolling.current) return;

        const viewportCenter = window.innerHeight / 2;
        const visibleSection = [...sectionEntries.values()].sort((a, b) => {
          const aCenter = (a.intersectionRect.top + a.intersectionRect.bottom) / 2;
          const bCenter = (b.intersectionRect.top + b.intersectionRect.bottom) / 2;
          return (
            Math.abs(aCenter - viewportCenter) -
            Math.abs(bCenter - viewportCenter)
          );
        })[0];

        // Always set one state value, including the fallback to Home, so the
        // previously active link is cleared as soon as its section leaves the band.
        setActiveSection(visibleSection?.target.id ?? "home");
      },
      {
        // Activate a section once it enters the main reading area, before it
        // reaches the top edge, while keeping the active band focused.
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0, 0.01, 0.5, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    if (pathname !== "/") return;

    const target = sectionId === "home" ? null : document.getElementById(sectionId);
    if (sectionId !== "home" && !target) return;

    event.preventDefault();
    setOpen(false);
    lockClickScroll();
    setActiveSection(sectionId);

    if (sectionId === "home") {
      window.history.replaceState(null, "", "/");
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      return;
    }

    window.history.replaceState(null, "", `#${sectionId}`);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const displayedActiveSection = pathname === "/" ? activeSection : "";

  const linkClasses = (sectionId: string, mobile = false) => {
    const isActive = displayedActiveSection === sectionId;
    return mobile
      ? `block rounded-md border-l-2 px-2 py-3 text-base font-medium transition-colors ${
          isActive
            ? "border-accent bg-accent-tint text-accent-dark"
            : "border-transparent text-ink-soft hover:bg-accent-tint hover:text-accent-dark"
        }`
      : `border-b-2 pb-1 text-sm font-medium transition-colors ${
          isActive
            ? "border-accent text-accent-dark"
            : "border-transparent text-ink-soft hover:border-accent/50 hover:text-accent-dark"
        }`;
  };

  return (
    <header
      id="top"
      className="sticky top-0 z-50 border-b border-line/70 bg-bg/85 backdrop-blur-md"
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10"
      >
        <Link href="/" className="flex items-center" aria-label="Cedar Vertex home">
          <Image
            src="/logo/cedar-vertex-logo.svg"
            alt="Cedar Vertex"
            width={205}
            height={80}
            className="h-10 w-auto sm:h-11"
            priority
          />
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={linkClasses(link.sectionId)}
                aria-current={displayedActiveSection === link.sectionId ? "page" : undefined}
                onClick={(event) => handleNavClick(event, link.sectionId)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button onClick={onOpenProposal} className="px-5! py-2.5!">
            Get a Proposal
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-line bg-bg px-6 pb-6 pt-2 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={linkClasses(link.sectionId, true)}
                  aria-current={displayedActiveSection === link.sectionId ? "page" : undefined}
                  onClick={(event) => handleNavClick(event, link.sectionId)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button onClick={onOpenProposal} className="mt-4 w-full justify-center">
            Get a Proposal
          </Button>
        </div>
      )}
    </header>
  );
}
