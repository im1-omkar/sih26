import type { Case } from "../../services/cases";
import { useWorkspaceStore } from "../../store/workspaceStore";

interface CaseItemProps {
    caseItem: Case;
    onEdit: (caseItem: Case) => void;
    onDelete: (caseItem: Case) => void;
}

export default function CaseItem({
    caseItem,
    onEdit,
    onDelete,
}: CaseItemProps) {
    const selectedCaseId = useWorkspaceStore(
        (state) => state.selectedCaseId
    );
    const selectCase = useWorkspaceStore((state) => state.selectCase);

    const isSelected = selectedCaseId === caseItem.id;

    return (
        <div
            className={`group mb-1 flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 transition ${
                isSelected
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-300 hover:bg-zinc-800/60 hover:text-white"
            }`}
        >
            <button
                type="button"
                onClick={() => selectCase(caseItem.id)}
                className="min-w-0 flex-1 text-left"
            >
                <span className="block truncate text-sm">
                    {caseItem.name}
                </span>
            </button>

            {/* Action buttons — visible on hover or when selected */}
            <div
                className={`flex shrink-0 items-center gap-0.5 transition-opacity ${
                    isSelected
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                }`}
            >
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit(caseItem);
                    }}
                    title="Edit case"
                    className="flex h-6 w-6 items-center justify-center rounded text-zinc-500 hover:bg-zinc-700 hover:text-zinc-200"
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
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                        />
                    </svg>
                </button>

                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(caseItem);
                    }}
                    title="Delete case"
                    className="flex h-6 w-6 items-center justify-center rounded text-zinc-500 hover:bg-red-900/50 hover:text-red-400"
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
        </div>
    );
}
