import type { Case } from "../../services/cases";
import CaseItem from "./CaseItem";

interface CaseListProps {
    cases: Case[];
    onEdit: (caseItem: Case) => void;
    onDelete: (caseItem: Case) => void;
}

export default function CaseList({
    cases,
    onEdit,
    onDelete,
}: CaseListProps) {
    if (cases.length === 0) {
        return (
            <p className="px-3 py-4 text-sm text-zinc-600">
                No cases yet. Create one to get started.
            </p>
        );
    }

    return (
        <div>
            {cases.map((caseItem) => (
                <CaseItem
                    key={caseItem.id}
                    caseItem={caseItem}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}
