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
      <main id="main-content">
        <Hero onOpenProposal={handleOpenProposal} />
        <Services />
        <Work />
        <WhyUs />
        <Process />
        <Cta onOpenProposal={handleOpenProposal} />
      </main>
      <Footer />
    </>
  );
}
