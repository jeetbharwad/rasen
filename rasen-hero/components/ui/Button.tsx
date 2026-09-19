import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "filled" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  filled: "bg-white text-navy-950 hover:bg-foam",
  outline:
    "bg-transparent text-white border border-white/70 hover:bg-white/10",
};

export function Button({
  variant = "filled",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-[10px_0px_10px_10px] px-5 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400 ${VARIANT_STYLES[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
