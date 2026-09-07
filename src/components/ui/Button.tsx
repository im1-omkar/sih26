import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "ghost" | "danger";
    size?: "sm" | "md";
    children: ReactNode;
}

const variantClasses = {
    primary:
        "bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-50 shadow-sm",
    ghost:
        "border border-surface-300 bg-surface-0 text-surface-700 hover:bg-surface-100 disabled:opacity-50",
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
            className={`inline-flex items-center justify-center gap-1.5 rounded-lg font-semibold transition ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
