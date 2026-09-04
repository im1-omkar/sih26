import type { Document } from "../../services/documents";
import { useWorkspaceStore } from "../../store/workspaceStore";

interface DocumentItemProps {
    document: Document;
}

export default function DocumentItem({
    document,
}: DocumentItemProps) {
    const selectedDocumentId = useWorkspaceStore(
        (state) => state.selectedDocumentId
    );

    const selectDocument = useWorkspaceStore(
        (state) => state.selectDocument
    );

    const isSelected =
        selectedDocumentId === document.id;

    return (
        <button
            type="button"
            onClick={() => selectDocument(document.id)}
            className={`w-full rounded-lg border p-4 text-left transition ${isSelected
                    ? "border-zinc-600 bg-zinc-800"
                    : "border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900"
                }`}
        >
            <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                    <h3 className="truncate font-medium text-zinc-200">
                        {document.title}
                    </h3>

                    <p className="mt-1 truncate text-sm text-zinc-500">
                        {document.description}
                    </p>
                </div>

                <span className="shrink-0 text-xs uppercase text-zinc-500">
                    {document.status}
                </span>
            </div>
        </button>
    );
}