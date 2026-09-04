import { useEffect } from "react";
import { useCasesStore } from "../../store/casesStore";
import { useWorkspaceStore } from "../../store/workspaceStore";

export default function Sidebar() {
    const {
        cases,
        isLoading,
        error,
        fetchCases,
    } = useCasesStore();

    const {
        selectedCaseId,
        selectCase,
    } = useWorkspaceStore();

    useEffect(() => {
        fetchCases();
    }, [fetchCases]);

    return (
        <aside className="flex w-72 shrink-0 flex-col border-r border-zinc-800">
            <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-4">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
                    Cases
                </h2>

                <button
                    type="button"
                    className="flex h-7 w-7 items-center justify-center rounded-md text-lg text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                >
                    +
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
                {isLoading && (
                    <p className="px-3 py-2 text-sm text-zinc-500">
                        Loading cases...
                    </p>
                )}

                {error && (
                    <p className="px-3 py-2 text-sm text-red-400">
                        {error}
                    </p>
                )}

                {!isLoading &&
                    !error &&
                    cases.map((caseItem) => (
                        <button
                            key={caseItem.id}
                            type="button"
                            onClick={() => selectCase(caseItem.id)}
                            className={`mb-1 w-full rounded-lg px-3 py-3 text-left text-sm transition ${selectedCaseId === caseItem.id
                                    ? "bg-zinc-800 text-white"
                                    : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                                }`}
                        >
                            {caseItem.name}
                        </button>
                    ))}
            </div>
        </aside>
    );
}