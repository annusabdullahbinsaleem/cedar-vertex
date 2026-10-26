"use client";

import {
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { CheckCircle2, ChevronDown, MessageCircle, X } from "lucide-react";
import {
  WHATSAPP_MESSAGE,
  WHATSAPP_PHONE_NUMBER,
} from "./WhatsAppButton";
import {
  normalizeProposalPhone,
  proposalCountryCodes,
} from "@/lib/proposal-phone";

type ProposalModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type FormData = {
  name: string;
  email: string;
  company: string;
  mobile: string;
  countryCode: string;
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
  mobile: "",
  countryCode: "+44",
  projectType: "",
  description: "",
  budget: "",
  timeline: "",
};
const idempotencyStorageKey = "cedar-vertex-proposal-retry";
const idempotencyKeyPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const payloadFingerprintPattern = /^[0-9a-f]{64}$/;

type PendingSubmission = {
  fingerprint: string;
  key: string;
};

function isPendingSubmission(value: unknown): value is PendingSubmission {
  return (
    typeof value === "object" &&
    value !== null &&
    "fingerprint" in value &&
    typeof value.fingerprint === "string" &&
    payloadFingerprintPattern.test(value.fingerprint) &&
    "key" in value &&
    typeof value.key === "string" &&
    idempotencyKeyPattern.test(value.key)
  );
}

function readPendingSubmissions(): PendingSubmission[] {
  const pendingValue = window.localStorage.getItem(idempotencyStorageKey);
  let pending: PendingSubmission[] = [];

  if (pendingValue !== null) {
    const parsed: unknown = JSON.parse(pendingValue);
    if (!Array.isArray(parsed) || !parsed.every(isPendingSubmission)) {
      throw new Error("Saved proposal retry information is invalid.");
    }
    pending = parsed;
  }

  const legacyValue = window.sessionStorage.getItem(idempotencyStorageKey);
  if (legacyValue !== null) {
    const legacy: unknown = JSON.parse(legacyValue);
    if (isPendingSubmission(legacy) && !pending.some(({ key }) => key === legacy.key)) {
      pending = [...pending, legacy];
    }
  }

  return pending;
}

function writePendingSubmissions(pending: PendingSubmission[]) {
  if (pending.length === 0) {
    window.localStorage.removeItem(idempotencyStorageKey);
    return;
  }
  window.localStorage.setItem(idempotencyStorageKey, JSON.stringify(pending));
}

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

type ProposalDropdownFieldProps = {
  id: string;
  name: "projectType" | "budget" | "timeline";
  label: string;
  value: string;
  options: string[];
  onChange: (name: "projectType" | "budget" | "timeline", value: string) => void;
  error?: string;
  required?: boolean;
};

function ProposalDropdownField({
  id,
  name,
  label,
  value,
  options,
  onChange,
  error,
  required = false,
}: ProposalDropdownFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const fieldRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const optionValues = ["", ...options];
  const selectedIndex = optionValues.findIndex((option) => option === value);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !fieldRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    optionsRef.current?.scrollIntoView({ block: "nearest" });
    optionRefs.current[Math.max(0, selectedIndex)]?.focus();

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen, selectedIndex]);

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape" && isOpen) {
      event.preventDefault();
      event.stopPropagation();
      setIsOpen(false);
      buttonRef.current?.focus();
      return;
    }

    if (event.key === "Tab" && isOpen) {
      setIsOpen(false);
      return;
    }

    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") {
      return;
    }

    const focusedOption = (event.target as HTMLElement).closest<HTMLElement>(
      "[data-proposal-option-index]",
    );
    if (!focusedOption && event.target !== buttonRef.current) {
      return;
    }

    event.preventDefault();
    if (!isOpen) {
      setIsOpen(true);
      return;
    }

    const currentIndex = focusedOption
      ? Number(focusedOption.dataset.proposalOptionIndex)
      : Math.max(0, selectedIndex);
    const direction = event.key === "ArrowDown" ? 1 : -1;
    const nextIndex = (currentIndex + direction + optionValues.length) % optionValues.length;
    optionRefs.current[nextIndex]?.focus();
  };

  const selectOption = (selectedValue: string) => {
    onChange(name, selectedValue);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  return (
    <div ref={fieldRef} className="space-y-1.5" onKeyDown={handleKeyDown}>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      <button
        ref={buttonRef}
        type="button"
        id={id}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={`${id}-options`}
        aria-required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onClick={() => setIsOpen((open) => !open)}
        className={`flex w-full items-center justify-between gap-2 rounded-xl border bg-white px-3.5 py-2.5 text-left text-sm text-ink outline-none transition-colors focus:border-accent ${error ? "border-red-500" : "border-line"}`}
      >
        <span>{value || "Select an option"}</span>
        <ChevronDown
          className={`shrink-0 text-ink-soft transition-transform ${isOpen ? "rotate-180" : ""}`}
          size={16}
          strokeWidth={2}
          aria-hidden="true"
        />
      </button>
      <div
        ref={optionsRef}
        className={`max-h-48 overflow-hidden rounded-xl border border-line bg-white p-1 pr-2 shadow-lg ${isOpen ? "" : "hidden"}`}
      >
        <div
          id={`${id}-options`}
          role="listbox"
          aria-label={`${label} options`}
          className="max-h-44 overflow-y-auto overscroll-contain px-1 py-1"
        >
          {["Select an option", ...options].map((option, index) => {
            const optionValue = index === 0 ? "" : option;

            return (
              <button
                key={optionValue || "empty"}
                ref={(element) => {
                  optionRefs.current[index] = element;
                }}
                type="button"
                role="option"
                aria-selected={value === optionValue}
                data-proposal-option-index={index}
                tabIndex={-1}
                onClick={() => selectOption(optionValue)}
                className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-sm outline-none transition-colors hover:bg-accent-tint focus:bg-accent-tint ${value === optionValue ? "font-medium text-accent-dark" : "text-ink"}`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

const emailPattern = /^[A-Za-z0-9!#$%&*+/=?^_`{|}~-]+(?:'[A-Za-z0-9!#$%&*+/=?^_`{|}~-]+)*(?:\.[A-Za-z0-9!#$%&*+/=?^_`{|}~-]+(?:'[A-Za-z0-9!#$%&*+/=?^_`{|}~-]+)*)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;
const focusableSelector = [
  'a[href]',
  'button:not([disabled]):not([tabindex="-1"])',
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
  const [isCountryCodeOpen, setIsCountryCodeOpen] = useState(false);
  const [requiresNewSubmissionConfirmation, setRequiresNewSubmissionConfirmation] =
    useState(false);
  const selectedCountryCode = proposalCountryCodes.find(
    ({ value }) => value === formData.countryCode,
  );
  const initialInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const mobileFieldRef = useRef<HTMLDivElement>(null);
  const countryCodeButtonRef = useRef<HTMLButtonElement>(null);
  const countryCodeOptionsRef = useRef<HTMLDivElement>(null);
  const countryCodeOptionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const triggerElementRef = useRef<HTMLElement | null>(null);
  const isSubmittingRef = useRef(false);
  const idempotencyRef = useRef<{ payload: string; key: string } | null>(null);
  const allowNewSubmissionRef = useRef(false);

  const closeModal = useCallback(() => {
    setIsCountryCodeOpen(false);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isCountryCodeOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !mobileFieldRef.current?.contains(event.target)
      ) {
        setIsCountryCodeOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    countryCodeOptionsRef.current?.scrollIntoView({ block: "nearest" });
    const selectedIndex = proposalCountryCodes.findIndex(
      ({ value }) => value === formData.countryCode,
    );
    countryCodeOptionRefs.current[Math.max(0, selectedIndex)]?.focus();

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isCountryCodeOpen, formData.countryCode]);

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
        closeModal();
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
  }, [isOpen, closeModal]);

  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}${
    WHATSAPP_MESSAGE ? `?text=${encodeURIComponent(WHATSAPP_MESSAGE)}` : ""
  }`;

  const updateField = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    if (isSubmittingRef.current) {
      return;
    }

    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: undefined,
      ...(name === "countryCode" ? { mobile: undefined } : {}),
    }));
  };

  const updateDropdownField = (
    name: "projectType" | "budget" | "timeline",
    value: string,
  ) => {
    if (isSubmittingRef.current) {
      return;
    }

    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const selectCountryCode = (countryCode: string) => {
    setFormData((current) => ({ ...current, countryCode }));
    setErrors((current) => ({
      ...current,
      countryCode: undefined,
      mobile: undefined,
    }));
    setIsCountryCodeOpen(false);
    countryCodeButtonRef.current?.focus();
  };

  const handleCountryCodeKeyDown = (
    event: ReactKeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.key === "Escape" && isCountryCodeOpen) {
      event.preventDefault();
      event.stopPropagation();
      setIsCountryCodeOpen(false);
      countryCodeButtonRef.current?.focus();
      return;
    }

    if (event.key === "Tab" && isCountryCodeOpen) {
      setIsCountryCodeOpen(false);
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      const focusedOption = (event.target as HTMLElement).closest<HTMLElement>(
        "[data-country-code-index]",
      );
      if (!focusedOption && event.target !== countryCodeButtonRef.current) {
        return;
      }

      event.preventDefault();
      if (!isCountryCodeOpen) {
        setIsCountryCodeOpen(true);
        return;
      }

      const selectedIndex = proposalCountryCodes.findIndex(
        ({ value }) => value === formData.countryCode,
      );
      const currentIndex = focusedOption
        ? Number(focusedOption.dataset.countryCodeIndex)
        : Math.max(0, selectedIndex);
      const direction = event.key === "ArrowDown" ? 1 : -1;
      const nextIndex =
        (currentIndex + direction + proposalCountryCodes.length) %
        proposalCountryCodes.length;
      countryCodeOptionRefs.current[nextIndex]?.focus();
    }
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

    if (normalizeProposalPhone(data.mobile, data.countryCode) === undefined) {
      nextErrors.mobile = "Please enter a valid mobile number.";
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
    const allowNewSubmission = allowNewSubmissionRef.current;
    allowNewSubmissionRef.current = false;
    if (isSubmittingRef.current) {
      return;
    }

    const nextErrors = validateForm(formData);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setIsSubmitted(false);
      return;
    }

    setErrors({});
    const payload = JSON.stringify(formData);
    isSubmittingRef.current = true;
    setIsSubmitting(true);

    try {
      const fingerprint = Array.from(
        new Uint8Array(
          await crypto.subtle.digest(
            "SHA-256",
            new TextEncoder().encode(payload),
          ),
        ),
        (byte) => byte.toString(16).padStart(2, "0"),
      ).join("");
      let pendingSubmissions: PendingSubmission[];
      try {
        pendingSubmissions = readPendingSubmissions();
      } catch {
        setErrors({
          form: "We couldn't safely check your previous submission. Please enable browser storage and try again.",
        });
        return;
      }

      let idempotencyKey =
        idempotencyRef.current?.payload === payload
          ? idempotencyRef.current.key
          : pendingSubmissions.find((entry) => entry.fingerprint === fingerprint)?.key;

      if (
        !idempotencyKey &&
        pendingSubmissions.length > 0 &&
        !allowNewSubmission
      ) {
        setRequiresNewSubmissionConfirmation(true);
        setErrors({
          form: "Your browser has an earlier proposal attempt that wasn't confirmed. Its original details aren't stored, so you can't restore them here. Re-enter the same details to retry safely, or choose below to send these details as a new proposal.",
        });
        return;
      }

      idempotencyKey ??= crypto.randomUUID();
      setRequiresNewSubmissionConfirmation(false);
      idempotencyRef.current = { payload, key: idempotencyKey };

      const pendingEntry = { fingerprint, key: idempotencyKey };
      if (!pendingSubmissions.some(({ key }) => key === idempotencyKey)) {
        pendingSubmissions = [...pendingSubmissions, pendingEntry];
      }
      try {
        writePendingSubmissions(pendingSubmissions);
      } catch {
        setErrors({
          form: "We couldn't save a retry key in this browser, so your proposal was not sent. Enable browser storage and try again.",
        });
        return;
      }

      const response = await fetch("/api/proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, idempotencyKey }),
      });
      const result: unknown = await response.json();
      if (
        !response.ok ||
        typeof result !== "object" ||
        result === null ||
        !("success" in result) ||
        result.success !== true
      ) {
        throw new Error("Proposal submission was not confirmed.");
      }

      idempotencyRef.current = null;
      pendingSubmissions = allowNewSubmission
        ? []
        : pendingSubmissions.filter(({ key }) => key !== idempotencyKey);
      try {
        writePendingSubmissions(pendingSubmissions);
        const legacyValue = window.sessionStorage.getItem(idempotencyStorageKey);
        if (legacyValue !== null) {
          const legacy: unknown = JSON.parse(legacyValue);
          if (
            allowNewSubmission ||
            (isPendingSubmission(legacy) && legacy.key === idempotencyKey)
          ) {
            window.sessionStorage.removeItem(idempotencyStorageKey);
          }
        }
      } catch {
        console.warn("Could not clear completed proposal retry metadata.");
      }
      setIsSubmitted(true);
    } catch {
      setErrors({
        form: "Something went wrong while sending your message. Please try again.",
      });
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0f172a]/50 p-3 backdrop-blur-[1px] sm:p-6"
      onClick={closeModal}
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
            onClick={closeModal}
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
                  onClick={closeModal}
                  className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
                >
                  Explore Our Work
                </Link>
                <button
                  type="button"
                  onClick={closeModal}
                  className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full border border-line px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent-dark"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form
              ref={formRef}
              className="space-y-5"
              onSubmit={handleSubmit}
              noValidate
            >
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

                <div
                  ref={mobileFieldRef}
                  className="space-y-1.5 sm:col-span-2"
                  onKeyDown={handleCountryCodeKeyDown}
                >
                  <label htmlFor="proposal-mobile" className="text-sm font-medium text-ink">
                    Mobile Number <span className="font-normal text-ink-soft">(optional)</span>
                  </label>
                  <div className="grid grid-cols-[minmax(7rem,0.9fr)_minmax(0,1.6fr)] gap-2">
                    <div className="relative">
                      <button
                        ref={countryCodeButtonRef}
                        type="button"
                        id="proposal-country-code"
                        aria-haspopup="listbox"
                        aria-expanded={isCountryCodeOpen}
                        aria-controls="proposal-country-code-options"
                        aria-label={`Mobile country calling code: ${selectedCountryCode?.label ?? "Choose code"}`}
                        onClick={() => setIsCountryCodeOpen((open) => !open)}
                        className="flex w-full items-center justify-between gap-2 rounded-xl border border-line bg-white px-3 py-2.5 text-left text-sm text-ink outline-none transition-colors focus:border-accent"
                      >
                        <span className="flex min-w-0 items-center gap-2">
                          <span className="text-base leading-none" aria-hidden="true">
                            {selectedCountryCode?.flag}
                          </span>
                          <span className="truncate font-medium">
                            {formData.countryCode}
                          </span>
                        </span>
                        <ChevronDown
                          className={`shrink-0 text-ink-soft transition-transform ${isCountryCodeOpen ? "rotate-180" : ""}`}
                          size={16}
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                    <input
                      id="proposal-mobile"
                      name="mobile"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel-national"
                      value={formData.mobile}
                      onChange={updateField}
                      aria-invalid={Boolean(errors.mobile)}
                      aria-describedby={errors.mobile ? "proposal-mobile-error" : undefined}
                      className="w-full min-w-0 rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft/70 focus:border-accent"
                      placeholder="7700 900123"
                    />
                    <div
                      ref={countryCodeOptionsRef}
                      className={`col-span-2 max-h-48 overflow-hidden rounded-xl border border-line bg-white p-1 pr-2 shadow-lg ${isCountryCodeOpen ? "" : "hidden"}`}
                    >
                      <div
                        id="proposal-country-code-options"
                        role="listbox"
                        aria-label="Mobile country calling code"
                        className="max-h-44 overflow-y-auto overscroll-contain px-1 py-1"
                      >
                        {proposalCountryCodes.map(
                          ({ flag, label, value }, index) => (
                            <button
                              key={value}
                              ref={(element) => {
                                countryCodeOptionRefs.current[index] = element;
                              }}
                              type="button"
                              role="option"
                              aria-selected={formData.countryCode === value}
                              data-country-code-index={index}
                              tabIndex={-1}
                              onClick={() => selectCountryCode(value)}
                              className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-sm outline-none transition-colors hover:bg-accent-tint focus:bg-accent-tint ${formData.countryCode === value ? "font-medium text-accent-dark" : "text-ink"}`}
                            >
                              <span
                                className="mr-2 text-base leading-none"
                                aria-hidden="true"
                              >
                                {flag}
                              </span>
                              <span>{label}</span>
                            </button>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                  {errors.mobile && (
                    <p id="proposal-mobile-error" className="text-sm text-red-600">
                      {errors.mobile}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-1">
                  <ProposalDropdownField
                    id="proposal-project-type"
                    name="projectType"
                    label="Project Type"
                    value={formData.projectType}
                    options={projectTypeOptions}
                    onChange={updateDropdownField}
                    error={errors.projectType}
                    required
                  />
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
                <ProposalDropdownField
                  id="proposal-budget"
                  name="budget"
                  label="Approximate Budget"
                  value={formData.budget}
                  options={budgetOptions}
                  onChange={updateDropdownField}
                />

                <ProposalDropdownField
                  id="proposal-timeline"
                  name="timeline"
                  label="Timeline"
                  value={formData.timeline}
                  options={timelineOptions}
                  onChange={updateDropdownField}
                />
              </div>

              {errors.form && (
                <div
                  className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
                  role="alert"
                >
                  <p>{errors.form}</p>
                  {requiresNewSubmissionConfirmation && (
                    <button
                      type="button"
                      onClick={() => {
                        const form = formRef.current;
                        if (form) {
                          allowNewSubmissionRef.current = true;
                          form.requestSubmit();
                        }
                      }}
                      className="mt-2 font-semibold underline"
                    >
                      Submit these details as a new proposal
                    </button>
                  )}
                </div>
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
