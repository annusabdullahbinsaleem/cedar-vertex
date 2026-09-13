"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import Button from "./Button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

type NavbarProps = {
  onOpenProposal?: () => void;
};

export default function Navbar({ onOpenProposal }: NavbarProps) {
  const [open, setOpen] = useState(false);

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
                className="text-sm font-medium text-ink-soft transition-colors hover:text-accent-dark"
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
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-3 text-base font-medium text-ink-soft hover:bg-accent-tint hover:text-accent-dark"
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
