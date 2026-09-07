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
        className: "bg-surface-200 text-surface-600",
    },
    processing: {
        label: "Processing",
        className: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
    },
    success: {
        label: "Success",
        className: "bg-green-50 text-green-700 ring-1 ring-green-200",
    },
    failed: {
        label: "Failed",
        className: "bg-red-50 text-red-700 ring-1 ring-red-200",
    },
    finish: {
        label: "Finished",
        className: "bg-purple-50 text-purple-700 ring-1 ring-purple-200",
    },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
    const { label, className } = config[status] ?? {
        label: status,
        className: "bg-surface-200 text-surface-600",
    };

    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}
        >
            {label}
        </span>
    );
}
