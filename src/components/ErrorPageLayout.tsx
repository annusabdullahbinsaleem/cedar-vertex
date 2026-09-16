"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProposalModal from "@/components/ProposalModal";

type ErrorPageLayoutProps = {
  badge: string;
  heading: string;
  description: string;
  graphicDigits: [string, string, string];
  statuses: [string, string];
  retry?: () => void;
};

const floatingNodes = [
  { className: "left-[7%] top-[16%] hidden sm:block", size: "h-2.5 w-2.5", delay: "0s", tone: "bg-[#00b7d9]/80" },
  { className: "right-[12%] top-[18%] hidden sm:block", size: "h-2 w-2", delay: "1.2s", tone: "bg-white/80" },
  { className: "left-[20%] bottom-[24%] hidden md:block", size: "h-2.5 w-2.5", delay: "2.5s", tone: "bg-[#00b7d9]/70" },
  { className: "right-[18%] bottom-[20%] hidden md:block", size: "h-3 w-3", delay: "1.6s", tone: "bg-white/75" },
  { className: "left-[46%] top-[9%] hidden lg:block", size: "h-2 w-2", delay: "3s", tone: "bg-[#00b7d9]/75" },
  { className: "right-[36%] bottom-[30%] hidden lg:block", size: "h-2.5 w-2.5", delay: "2.1s", tone: "bg-white/70" },
];

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Work" },
  { href: "/#contact", label: "Contact" },
];

export default function ErrorPageLayout({
  badge,
  heading,
  description,
  graphicDigits,
  statuses,
  retry,
}: ErrorPageLayoutProps) {
  const [isProposalOpen, setIsProposalOpen] = useState(false);
  const [proposalModalKey, setProposalModalKey] = useState(0);

  const handleOpenProposal = () => {
    setProposalModalKey((current) => current + 1);
    setIsProposalOpen(true);
  };

  return (
    <>
      <ProposalModal
        key={proposalModalKey}
        isOpen={isProposalOpen}
        onClose={() => setIsProposalOpen(false)}
      />

      <Navbar onOpenProposal={handleOpenProposal} />

      <main
        id="main-content"
        className="relative isolate overflow-hidden bg-[#0d1117] text-white"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,183,217,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(44,62,80,0.5),transparent_34%)]" />
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:62px_62px]" />
        <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_center,_rgba(0,183,217,0.18),transparent_58%)] blur-3xl" />

        {floatingNodes.map((node) => (
          <span
            key={`${node.className}-${node.delay}`}
            className={`pointer-events-none absolute ${node.className} ${node.size} ${node.tone} rounded-full shadow-[0_0_18px_rgba(0,183,217,0.5)] animate-pulse`}
            style={{ animationDelay: node.delay }}
            aria-hidden="true"
          />
        ))}

        <div className="relative mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-10">
          <div className="flex min-h-[calc(100vh-9.5rem)] items-center justify-center">
            <div className="w-full max-w-6xl rounded-[32px] border border-white/10 bg-white/[0.025] p-5 shadow-[0_30px_90px_-45px_rgba(0,183,217,0.55)] backdrop-blur-sm sm:p-7 lg:p-10">
              <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-12">
                <div className="order-2 lg:order-1">
                  <p className="mb-4 inline-flex items-center rounded-full border border-[#00b7d9]/60 bg-[#00b7d9]/10 px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-[#9fe8f4]">
                    {badge}
                  </p>

                  <h1 className="font-display text-4xl font-bold tracking-[-0.06em] text-white sm:text-5xl lg:text-6xl">
                    {heading}
                  </h1>

                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
                    {description}
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    {retry ? (
                      <button
                        type="button"
                        onClick={retry}
                        className="inline-flex items-center justify-center rounded-full bg-[#00b7d9] px-6 py-3 text-sm font-semibold text-[#0d1117] transition-all duration-200 hover:bg-[#06b4d7] hover:shadow-[0_0_30px_rgba(0,183,217,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00b7d9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1117]"
                      >
                        Try Again
                      </button>
                    ) : (
                      <Link
                        href="/"
                        className="inline-flex items-center justify-center rounded-full bg-[#00b7d9] px-6 py-3 text-sm font-semibold text-[#0d1117] transition-all duration-200 hover:bg-[#06b4d7] hover:shadow-[0_0_30px_rgba(0,183,217,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00b7d9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1117]"
                      >
                        Back to Home
                      </Link>
                    )}

                    {retry ? (
                      <Link
                        href="/"
                        className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-[#00b7d9]/70 hover:bg-[#00b7d9]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00b7d9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1117]"
                      >
                        Back to Home
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={handleOpenProposal}
                        className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-[#00b7d9]/70 hover:bg-[#00b7d9]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00b7d9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1117]"
                      >
                        Get a Proposal
                      </button>
                    )}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {quickLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-300 transition-colors duration-200 hover:border-[#00b7d9]/60 hover:text-[#aef1ff]"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="order-1 flex items-center justify-center lg:order-2">
                  <div className="relative mx-auto w-full max-w-[560px]">
                    <div className="absolute inset-x-12 top-1/2 h-40 -translate-y-1/2 rounded-full bg-[#00b7d9]/10 blur-3xl" />

                    <div className="relative flex items-center justify-center gap-3 sm:gap-4 md:gap-5">
                      {graphicDigits.map((digit, index) => (
                        <div
                          key={`${digit}-${index}`}
                          className={index === 1
                            ? "relative flex h-28 w-28 items-center justify-center rounded-[2rem] border border-[#00b7d9]/55 bg-[radial-gradient(circle_at_center,_rgba(0,183,217,0.22),rgba(13,17,23,0.92)_58%)] shadow-[0_0_35px_rgba(0,183,217,0.35)] sm:h-36 sm:w-36 md:h-40 md:w-40"
                            : "font-display text-[5.5rem] font-black leading-none tracking-[-0.08em] text-white opacity-95 sm:text-[7rem] lg:text-[9rem]"
                          }
                        >
                          {index === 1 ? (
                            <>
                              <div className="absolute inset-0 rounded-[2rem] border border-white/10" />
                              <div className="absolute inset-4 rounded-[1.5rem] border border-[#00b7d9]/35" />
                              <div className="absolute inset-x-5 top-3 h-px bg-gradient-to-r from-transparent via-[#00b7d9] to-transparent" />
                              <div className="absolute inset-x-5 bottom-3 h-px bg-gradient-to-r from-transparent via-[#00b7d9] to-transparent" />
                              <div className="absolute top-6 bottom-6 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#00b7d9] to-transparent" />
                              <div className="absolute left-3 top-1/2 h-12 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-[#00b7d9] to-transparent sm:h-16" />
                              <div className="absolute right-3 top-1/2 h-12 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-[#00b7d9] to-transparent sm:h-16" />
                              <div className="absolute h-4 w-4 rounded-full bg-[#00b7d9] shadow-[0_0_18px_rgba(0,183,217,0.7)] animate-pulse" />
                              <div className="absolute -left-4 top-[38%] h-2.5 w-2.5 rounded-full bg-white/80 animate-pulse" />
                              <div className="absolute -right-4 top-[58%] h-2.5 w-2.5 rounded-full bg-[#00b7d9]/80 animate-pulse" />
                              <div className="absolute inset-0 animate-[spin_18s_linear_infinite]" aria-hidden="true">
                                <div className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#00b7d9]/80 shadow-[0_0_18px_rgba(0,183,217,0.75)]" />
                                <div className="absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-white/80" />
                                <div className="absolute bottom-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#00b7d9]/80" />
                              </div>
                              <span className="font-display text-xl font-bold tracking-[-0.06em] text-[#aef1ff] sm:text-2xl">
                                CV
                              </span>
                            </>
                          ) : (
                            digit
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center justify-center gap-3 text-[0.68rem] uppercase tracking-[0.18em] text-slate-300">
                      <span className="inline-flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-[#00b7d9]" />
                        {statuses[0]}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-white/80" />
                        {statuses[1]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
