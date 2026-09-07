import type { Case } from "../../services/cases";
import CaseItem from "./CaseItem";

interface CaseListProps {
    cases: Case[];
    onEdit: (caseItem: Case) => void;
    onDelete: (caseItem: Case) => void;
}

export default function CaseList({ cases, onEdit, onDelete }: CaseListProps) {
    if (cases.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center px-4 py-10 text-center">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-surface-100">
                    <svg className="h-5 w-5 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" /></svg>
                </div>
                <p className="text-sm font-medium text-surface-600">No cases yet</p>
                <p className="mt-1 text-xs text-surface-400">Click + to create your first case.</p>
            </div>
        );
    }

    return (
        <div className="space-y-0.5">
            {cases.map((c) => (
                <CaseItem key={c.id} caseItem={c} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </div>
    );
}
