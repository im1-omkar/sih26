import type { DocumentStatus } from "../../services/documents";

interface StatusBadgeProps {
    status: DocumentStatus;
}

const config: Record<
    DocumentStatus,
    { label: string; className: string }
> = {
    pending: {
        label: "Pending",
        className: "bg-zinc-800 text-zinc-400",
    },
    processing: {
        label: "Processing",
        className: "bg-blue-900/60 text-blue-300",
    },
    success: {
        label: "Success",
        className: "bg-green-900/60 text-green-300",
    },
    failed: {
        label: "Failed",
        className: "bg-red-900/60 text-red-300",
    },
    finish: {
        label: "Finished",
        className: "bg-purple-900/60 text-purple-300",
    },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
    const { label, className } = config[status] ?? {
        label: status,
        className: "bg-zinc-800 text-zinc-400",
    };

    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}
        >
            {label}
        </span>
    );
}
