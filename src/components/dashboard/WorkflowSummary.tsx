const steps = [
    { label: "Input", sublabel: "Upload", status: "completed" as const, icon: "↑" },
    { label: "Processing", sublabel: "OCR & Parse", status: "completed" as const, icon: "⚙" },
    { label: "Extraction", sublabel: "Entities", status: "processing" as const, icon: "◎" },
    { label: "Detection", sublabel: "Relationships", status: "pending" as const, icon: "⬡" },
    { label: "Graph", sublabel: "Construction", status: "pending" as const, icon: "◇" },
    { label: "Analysis", sublabel: "Insights", status: "pending" as const, icon: "△" },
    { label: "Result", sublabel: "Complete", status: "pending" as const, icon: "✓" },
];

type StepStatus = "completed" | "processing" | "pending" | "warning";

const statusStyles: Record<StepStatus, { bg: string; border: string; text: string; icon: string; line: string }> = {
    completed: {
        bg: "bg-green-50",
        border: "border-green-200",
        text: "text-green-700",
        icon: "bg-green-500 text-white",
        line: "bg-green-300",
    },
    processing: {
        bg: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-700",
        icon: "bg-blue-500 text-white animate-pulse",
        line: "bg-surface-300",
    },
    pending: {
        bg: "bg-surface-50",
        border: "border-surface-200",
        text: "text-surface-500",
        icon: "bg-surface-200 text-surface-400",
        line: "bg-surface-200",
    },
    warning: {
        bg: "bg-amber-50",
        border: "border-amber-200",
        text: "text-amber-700",
        icon: "bg-amber-500 text-white",
        line: "bg-amber-300",
    },
};

export default function WorkflowSummary() {
    return (
        <div className="rounded-xl border border-surface-200 bg-surface-0 p-5">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-surface-500">
                Workflow Pipeline
            </h3>

            <div className="flex items-center overflow-x-auto">
                {steps.map((step, i) => {
                    const style = statusStyles[step.status];

                    return (
                        <div key={step.label} className="flex items-center">
                            {/* Step card */}
                            <div
                                className={`flex min-w-[100px] flex-col items-center rounded-lg border p-3 transition hover:shadow-sm ${style.bg} ${style.border}`}
                            >
                                <div
                                    className={`mb-2 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${style.icon}`}
                                >
                                    {step.status === "completed" ? "✓" : step.icon}
                                </div>
                                <span className={`text-xs font-bold ${style.text}`}>
                                    {step.label}
                                </span>
                                <span className="mt-0.5 text-[10px] text-surface-400">
                                    {step.sublabel}
                                </span>
                            </div>

                            {/* Connector line */}
                            {i < steps.length - 1 && (
                                <div className={`mx-1.5 h-0.5 w-6 shrink-0 rounded-full ${style.line}`} />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
