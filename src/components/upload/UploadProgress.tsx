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
        <div className="mt-4 rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
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
                                        ? "bg-red-600 text-white"
                                        : isDone
                                          ? "bg-green-600 text-white"
                                          : isCurrent
                                            ? "border-2 border-blue-400 bg-transparent text-blue-400"
                                            : "border border-zinc-600 bg-transparent text-zinc-600"
                                }`}
                            >
                                {isDone ? "✓" : i + 1}
                            </div>

                            {i < stageOrder.length - 1 && (
                                <div
                                    className={`h-px w-4 ${
                                        isDone
                                            ? "bg-green-600"
                                            : "bg-zinc-700"
                                    }`}
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Status label */}
            <p
                className={`text-sm font-medium ${
                    stage === "error"
                        ? "text-red-400"
                        : stage === "done"
                          ? "text-green-400"
                          : "text-zinc-300"
                }`}
            >
                {stage === "error" && error ? error : stageLabels[stage]}
            </p>

            {/* Spinner for in-progress stages */}
            {stage !== "done" && stage !== "error" && (
                <div className="mt-2 flex items-center gap-2">
                    <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-zinc-600 border-t-zinc-300" />
                    <span className="text-xs text-zinc-500">In progress</span>
                </div>
            )}

            {/* Done state */}
            {stage === "done" && document && (
                <div className="mt-3">
                    <p className="text-xs text-zinc-500">
                        <span className="font-medium text-zinc-400">
                            {document.title}
                        </span>{" "}
                        has been uploaded. Status:{" "}
                        <span className="text-zinc-300">
                            {document.status}
                        </span>
                    </p>

                    <button
                        type="button"
                        onClick={onDone}
                        className="mt-3 rounded-lg bg-white px-4 py-1.5 text-xs font-semibold text-zinc-900 hover:bg-zinc-200"
                    >
                        Done
                    </button>
                </div>
            )}
        </div>
    );
}
