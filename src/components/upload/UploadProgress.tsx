import type { Document } from "../../services/documents";

type UploadStage =
    | "idle"
    | "initiating"
    | "uploading"
    | "confirming"
    | "processing"
    | "done"
    | "error";

interface UploadProgressProps {
    stage: UploadStage;
    document: Document | null;
    error: string | null;
    onDone: () => void;
}

const stageLabels: Record<UploadStage, string> = {
    idle: "",
    initiating: "Preparing upload…",
    uploading: "Uploading file…",
    confirming: "Confirming upload…",
    processing: "Processing document…",
    done: "Upload complete",
    error: "Upload failed",
};

const stageOrder: UploadStage[] = [
    "initiating",
    "uploading",
    "confirming",
    "processing",
    "done",
];

export default function UploadProgress({
    stage,
    document,
    error,
    onDone,
}: UploadProgressProps) {
    if (stage === "idle") return null;

    const currentIndex = stageOrder.indexOf(stage);

    return (
        <div className="mt-4 rounded-lg border border-surface-200 bg-surface-50 p-4">
            {/* Step indicators */}
            <div className="mb-4 flex items-center gap-2">
                {stageOrder.map((s, i) => {
                    const isDone = i < currentIndex || stage === "done";
                    const isCurrent = s === stage;
                    const isError = stage === "error" && i === currentIndex;

                    return (
                        <div key={s} className="flex items-center gap-2">
                            <div
                                className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold transition-all ${
                                    isError
                                        ? "bg-red-500 text-white"
                                        : isDone
                                          ? "bg-green-500 text-white"
                                          : isCurrent
                                            ? "border-2 border-brand-500 bg-transparent text-brand-600"
                                            : "border border-surface-300 bg-transparent text-surface-400"
                                }`}
                            >
                                {isDone ? "✓" : i + 1}
                            </div>

                            {i < stageOrder.length - 1 && (
                                <div
                                    className={`h-px w-4 ${
                                        isDone
                                            ? "bg-green-400"
                                            : "bg-surface-300"
                                    }`}
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            <p
                className={`text-sm font-semibold ${
                    stage === "error"
                        ? "text-red-600"
                        : stage === "done"
                          ? "text-green-600"
                          : "text-surface-700"
                }`}
            >
                {stage === "error" && error ? error : stageLabels[stage]}
            </p>

            {stage !== "done" && stage !== "error" && (
                <div className="mt-2 flex items-center gap-2">
                    <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-surface-300 border-t-brand-600" />
                    <span className="text-xs text-surface-500">In progress</span>
                </div>
            )}

            {stage === "done" && document && (
                <div className="mt-3">
                    <p className="text-xs text-surface-500">
                        <span className="font-medium text-surface-700">
                            {document.title}
                        </span>{" "}
                        has been uploaded. Status:{" "}
                        <span className="font-medium text-surface-700">
                            {document.status}
                        </span>
                    </p>

                    <button
                        type="button"
                        onClick={onDone}
                        className="mt-3 rounded-lg bg-brand-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-brand-700"
                    >
                        Done
                    </button>
                </div>
            )}
        </div>
    );
}
