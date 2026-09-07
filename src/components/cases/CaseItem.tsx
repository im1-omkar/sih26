import { useWorkspaceStore } from "../../store/workspaceStore";
import type { Case } from "../../services/cases";

interface CaseItemProps {
    caseItem: Case;
    onEdit: (caseItem: Case) => void;
    onDelete: (caseItem: Case) => void;
}

export default function CaseItem({ caseItem, onEdit, onDelete }: CaseItemProps) {
    const selectedCaseId = useWorkspaceStore((state) => state.selectedCaseId);
    const selectCase = useWorkspaceStore((state) => state.selectCase);

    const isSelected = selectedCaseId === caseItem.id;

    return (
        <div
            className={`group relative flex items-center rounded-lg px-3 py-2.5 text-sm transition cursor-pointer ${
                isSelected
                    ? "bg-brand-50 text-brand-700 font-semibold"
                    : "text-surface-700 hover:bg-surface-100"
            }`}
            onClick={() => selectCase(caseItem.id)}
        >
            {/* Indicator */}
            {isSelected && (
                <div className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r bg-brand-600" />
            )}

            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-surface-200/70 text-xs font-bold text-surface-500">
                {caseItem.name.charAt(0).toUpperCase()}
            </div>

            <span className="ml-2.5 min-w-0 flex-1 truncate">{caseItem.name}</span>

            {/* Edit / Delete icons */}
            <div className={`flex shrink-0 items-center gap-0.5 ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onEdit(caseItem); }}
                    title="Edit"
                    className="flex h-6 w-6 items-center justify-center rounded text-surface-400 hover:bg-surface-200 hover:text-surface-700"
                >
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" /></svg>
                </button>
                <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onDelete(caseItem); }}
                    title="Delete"
                    className="flex h-6 w-6 items-center justify-center rounded text-surface-400 hover:bg-red-50 hover:text-red-600"
                >
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
                </button>
            </div>
        </div>
    );
}
