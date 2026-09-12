import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost-light";
  showIcon?: boolean;
  className?: string;
};

const variants = {
  primary:
    "bg-primary text-white hover:bg-primary-dark",
  secondary:
    "bg-transparent text-ink border border-ink/20 hover:border-ink hover:bg-ink hover:text-bg",
  "ghost-light":
    "bg-transparent text-white border border-white/40 hover:border-white hover:bg-white hover:text-ink",
};

export default function Button({
  href,
  children,
  variant = "primary",
  showIcon = true,
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200 ${variants[variant]} ${className}`}
    >
      {children}
      {showIcon && (
        <ArrowUpRight
          size={16}
          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      )}
    </Link>
  );
}
