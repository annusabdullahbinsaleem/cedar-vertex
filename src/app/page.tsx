"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Work from "@/components/Work";
import WhyUs from "@/components/WhyUs";
import Process from "@/components/Process";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import ProposalModal from "@/components/ProposalModal";

export default function Home() {
  const [isProposalOpen, setIsProposalOpen] = useState(false);

  return (
    <>
      <ProposalModal
        isOpen={isProposalOpen}
        onClose={() => setIsProposalOpen(false)}
      />
      <Navbar onOpenProposal={() => setIsProposalOpen(true)} />
      <main id="main-content">
        <Hero onOpenProposal={() => setIsProposalOpen(true)} />
        <Services />
        <Work />
        <WhyUs />
        <Process />
        <Cta onOpenProposal={() => setIsProposalOpen(true)} />
      </main>
      <Footer />
    </>
  );
}
