"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle2, MessageCircle, X } from "lucide-react";
import {
  WHATSAPP_MESSAGE,
  WHATSAPP_PHONE_NUMBER,
} from "./WhatsAppButton";

type ProposalModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type FormData = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  description: string;
  budget: string;
  timeline: string;
};

type FormErrors = Partial<Record<keyof FormData | "form", string>>;

const initialFormData: FormData = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  description: "",
  budget: "",
  timeline: "",
};

const projectTypeOptions = [
  "Website",
  "Web App",
  "Mobile App",
  "UI/UX / Product Design",
  "SEO",
  "Branding / Graphic Design",
  "Not Sure",
];

const budgetOptions = [
  "Under £1,000",
  "£1,000–£2,500",
  "£2,500–£5,000",
  "£5,000–£10,000",
  "£10,000+",
  "Not sure yet",
];

const timelineOptions = [
  "ASAP",
  "Within 1 month",
  "1–3 months",
  "3–6 months",
  "Flexible / Not sure",
];

const emailPattern = /^[A-Za-z0-9!#$%&*+/=?^_`{|}~-]+(?:'[A-Za-z0-9!#$%&*+/=?^_`{|}~-]+)*(?:\.[A-Za-z0-9!#$%&*+/=?^_`{|}~-]+(?:'[A-Za-z0-9!#$%&*+/=?^_`{|}~-]+)*)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;
const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

export default function ProposalModal({ isOpen, onClose }: ProposalModalProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const initialInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    triggerElementRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !modalRef.current) {
        return;
      }

      const focusableElements = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => {
        const { display, visibility } = window.getComputedStyle(element);

        return (
          !element.hasAttribute("disabled") &&
          element.getAttribute("aria-hidden") !== "true" &&
          display !== "none" &&
          visibility !== "hidden"
        );
      });

      if (focusableElements.length === 0) {
        event.preventDefault();
        modalRef.current.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey) {
        if (activeElement === firstElement || !modalRef.current.contains(activeElement)) {
          event.preventDefault();
          lastElement.focus();
        }

        return;
      }

      if (activeElement === lastElement || !modalRef.current.contains(activeElement)) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => {
      initialInputRef.current?.focus();
    }, 0);

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      window.clearTimeout(focusTimer);
      triggerElementRef.current?.focus();
      triggerElementRef.current = null;
    };
  }, [isOpen, onClose]);

  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}${
    WHATSAPP_MESSAGE ? `?text=${encodeURIComponent(WHATSAPP_MESSAGE)}` : ""
  }`;

  const updateField = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: undefined,
    }));
  };

  const validateForm = (data: FormData) => {
    const nextErrors: FormErrors = {};

    if (!data.name.trim()) {
      nextErrors.name = "Please enter your name.";
    }

    if (!data.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!emailPattern.test(data.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!data.company.trim()) {
      nextErrors.company = "Please enter your company name.";
    }

    if (!data.projectType.trim()) {
      nextErrors.projectType = "Please choose a project type.";
    }

    if (!data.description.trim()) {
      nextErrors.description =
        "Please tell us a little about your project or goals.";
    }

    return nextErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateForm(formData);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setIsSubmitted(false);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      // Replace this placeholder with a real form submission endpoint when available.
      // Example:
      // await fetch("/api/proposal", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });

      setIsSubmitted(true);
    } catch {
      setErrors({
        form: "Something went wrong while sending your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0f172a]/50 p-3 backdrop-blur-[1px] sm:p-6"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="proposal-modal-title"
        tabIndex={-1}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl border border-line bg-bg text-ink shadow-[0_32px_80px_-28px_rgba(20,19,31,0.45)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-line bg-bg/95 px-5 py-4 backdrop-blur-sm sm:px-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-accent-dark">
              Cedar Vertex
            </p>
            <h2 id="proposal-modal-title" className="mt-1 font-display text-2xl">
              {isSubmitted ? "Proposal Received!" : "Get a Proposal"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close proposal form"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-accent hover:text-accent-dark"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="max-h-[calc(90vh-5.5rem)] overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
          {isSubmitted ? (
            <div className="space-y-5">
              <div className="flex flex-col items-center rounded-2xl border border-line bg-accent-tint px-4 py-6 text-center sm:px-6">
                <CheckCircle2
                  className="text-accent-dark"
                  size={48}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <p className="mt-4 text-base font-medium text-ink">
                  Thanks for reaching out to Cedar Vertex. We&apos;ve received your
                  project details and will review them carefully.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  We&apos;ll review your request and get back to you as soon as
                  possible.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/#work"
                  onClick={onClose}
                  className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
                >
                  Explore Our Work
                </Link>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full border border-line px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent-dark"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5 sm:col-span-1">
                  <label htmlFor="proposal-name" className="text-sm font-medium text-ink">
                    Name
                  </label>
                  <input
                    ref={initialInputRef}
                    id="proposal-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={updateField}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "proposal-name-error" : undefined}
                    className="w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft/70 focus:border-accent"
                    placeholder="Your name"
                    required
                  />
                  {errors.name && (
                    <p
                      id="proposal-name-error"
                      className="text-sm text-red-600"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5 sm:col-span-1">
                  <label htmlFor="proposal-email" className="text-sm font-medium text-ink">
                    Email
                  </label>
                  <input
                    id="proposal-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={updateField}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "proposal-email-error" : undefined}
                    className="w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft/70 focus:border-accent"
                    placeholder="you@example.com"
                    required
                  />
                  {errors.email && (
                    <p
                      id="proposal-email-error"
                      className="text-sm text-red-600"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5 sm:col-span-1">
                  <label htmlFor="proposal-company" className="text-sm font-medium text-ink">
                    Company
                  </label>
                  <input
                    id="proposal-company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={updateField}
                    aria-invalid={Boolean(errors.company)}
                    aria-describedby={errors.company ? "proposal-company-error" : undefined}
                    className="w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft/70 focus:border-accent"
                    placeholder="Your company"
                    required
                  />
                  {errors.company && (
                    <p
                      id="proposal-company-error"
                      className="text-sm text-red-600"
                    >
                      {errors.company}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5 sm:col-span-1">
                  <label htmlFor="proposal-project-type" className="text-sm font-medium text-ink">
                    Project Type
                  </label>
                  <select
                    id="proposal-project-type"
                    name="projectType"
                    value={formData.projectType}
                    onChange={updateField}
                    aria-invalid={Boolean(errors.projectType)}
                    aria-describedby={errors.projectType ? "proposal-project-type-error" : undefined}
                    className="w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-accent"
                    required
                  >
                    <option value="">Select an option</option>
                    {projectTypeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.projectType && (
                    <p
                      id="proposal-project-type-error"
                      className="text-sm text-red-600"
                    >
                      {errors.projectType}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="proposal-description" className="text-sm font-medium text-ink">
                  What do you need?
                </label>
                <textarea
                  id="proposal-description"
                  name="description"
                  value={formData.description}
                  onChange={updateField}
                  aria-invalid={Boolean(errors.description)}
                  aria-describedby={errors.description ? "proposal-description-error" : undefined}
                  className="min-h-28 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft/70 focus:border-accent"
                  placeholder="Tell us briefly about your project, goals, or what you need help with."
                  required
                />
                {errors.description && (
                  <p
                    id="proposal-description-error"
                    className="text-sm text-red-600"
                  >
                    {errors.description}
                  </p>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="proposal-budget" className="text-sm font-medium text-ink">
                    Approximate Budget
                  </label>
                  <select
                    id="proposal-budget"
                    name="budget"
                    value={formData.budget}
                    onChange={updateField}
                    className="w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-accent"
                  >
                    <option value="">Select an option</option>
                    {budgetOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="proposal-timeline" className="text-sm font-medium text-ink">
                    Timeline
                  </label>
                  <select
                    id="proposal-timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={updateField}
                    className="w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-accent"
                  >
                    <option value="">Select an option</option>
                    {timelineOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {errors.form && (
                <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {errors.form}
                </p>
              )}

              <div className="space-y-3 pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className="w-full rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center justify-center gap-2">
                      <span
                        className="h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white"
                        aria-hidden="true"
                      />
                      <span>Sending...</span>
                      <span className="sr-only">Your proposal is being sent.</span>
                    </span>
                  ) : (
                    "Get My Proposal"
                  )}
                </button>

                <p className="text-center text-xs leading-relaxed text-slate-500">
                  By submitting, you agree to our Privacy Policy. We use your details only to respond to your enquiry.
                </p>

                <div className="border-t border-slate-100 pt-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-wrap items-center justify-between gap-2 text-sm font-medium text-accent-dark transition-colors hover:text-primary"
                  >
                    <span className="inline-flex items-center gap-2">
                      <MessageCircle size={16} aria-hidden="true" />
                      <span>Prefer a quick chat?</span>
                    </span>
                    <span>Message us on WhatsApp.</span>
                  </a>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
