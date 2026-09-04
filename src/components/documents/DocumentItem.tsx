import type { Document } from "../../services/documents";
import { useWorkspaceStore } from "../../store/workspaceStore";
import { useDocumentsStore } from "../../store/documentsStore";
import StatusBadge from "../ui/StatusBadge";

interface DocumentItemProps {
    document: Document;
}

export default function DocumentItem({ document }: DocumentItemProps) {
    const selectedDocumentId = useWorkspaceStore(
        (state) => state.selectedDocumentId
    );
    const selectDocument = useWorkspaceStore(
        (state) => state.selectDocument
    );
    const clearDocument = useWorkspaceStore(
        (state) => state.clearDocument
    );
    const deleteDocument = useDocumentsStore(
        (state) => state.deleteDocument
    );

    const isSelected = selectedDocumentId === document.id;

    async function handleDelete(e: React.MouseEvent) {
        e.stopPropagation();

        if (!confirm(`Delete "${document.title}"?`)) return;

        try {
            if (isSelected) clearDocument();
            await deleteDocument(document.id);
        } catch {
            // Error handled silently; document will remain in list if delete fails
        }
    }

    return (
        <div
            className={`group relative w-full rounded-lg border p-4 transition ${
                isSelected
                    ? "border-zinc-600 bg-zinc-800"
                    : "border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900"
            }`}
        >
            <button
                type="button"
                onClick={() => selectDocument(document.id)}
                className="w-full text-left"
            >
                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                        <h3 className="truncate font-medium text-zinc-200">
                            {document.title}
                        </h3>

                        <p className="mt-1 truncate text-sm text-zinc-500">
                            {document.description}
                        </p>
                    </div>

                    <StatusBadge status={document.status} />
                </div>
            </button>

            {/* Delete button */}
            <button
                type="button"
                onClick={handleDelete}
                title="Delete document"
                className={`absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded text-zinc-600 transition hover:bg-red-900/50 hover:text-red-400 ${
                    isSelected
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                }`}
            >
                <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                </svg>
            </button>
        </div>
    );
}