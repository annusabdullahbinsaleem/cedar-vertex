"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProposalModal from "@/components/ProposalModal";

const ProposalModalContext = createContext<(() => void) | null>(null);

export function ProposalModalTrigger({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  const openProposal = useContext(ProposalModalContext);
  if (!openProposal) {
    throw new Error("ProposalModalTrigger must be used inside CaseStudyShell.");
  }

  return (
    <button type="button" className={className} onClick={openProposal}>
      {children}
    </button>
  );
}

export default function CaseStudyShell({ children }: { children: ReactNode }) {
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
      <ProposalModalContext.Provider value={handleOpenProposal}>
        <Navbar onOpenProposal={handleOpenProposal} />
        {children}
        <Footer />
      </ProposalModalContext.Provider>
    </>
  );
}
