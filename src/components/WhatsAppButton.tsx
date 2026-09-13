import { MessageCircle } from "lucide-react";

export const WHATSAPP_PHONE_NUMBER = "447404749903";
export const WHATSAPP_MESSAGE = "Hi Cedar Vertex, I'd like to discuss a project.";

export default function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}${
    WHATSAPP_MESSAGE ? `?text=${encodeURIComponent(WHATSAPP_MESSAGE)}` : ""
  }`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Cedar Vertex on WhatsApp"
      title="Chat with us"
      className="group fixed bottom-4 right-4 z-50 inline-flex items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_28px_rgba(37,211,102,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1fb55f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B7D9] focus-visible:ring-offset-2 focus-visible:ring-offset-bg md:bottom-6 md:right-6"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm md:h-14 md:w-14">
        <MessageCircle className="h-6 w-6 md:h-7 md:w-7" aria-hidden="true" />
      </span>

      <span className="hidden pr-4 text-sm font-medium md:inline-flex">
        Chat with us
      </span>
    </a>
  );
}