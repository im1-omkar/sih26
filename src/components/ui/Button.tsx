import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: "sm" | "md";
}

const variantClasses: Record<Variant, string> = {
    primary:
        "bg-white text-zinc-900 hover:bg-zinc-200 disabled:opacity-50",
    ghost:
        "border border-zinc-700 text-zinc-300 hover:bg-zinc-800 disabled:opacity-50",
    danger:
        "bg-red-600 text-white hover:bg-red-700 disabled:opacity-50",
};

const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
};

export default function Button({
    variant = "primary",
    size = "md",
    className = "",
    children,
    ...props
}: ButtonProps) {
    return (
        <button
            type="button"
            className={`inline-flex items-center justify-center gap-1.5 rounded-lg font-medium transition ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
