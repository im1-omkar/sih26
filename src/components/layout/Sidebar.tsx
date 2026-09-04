const cases = [
    {
        id: "1",
        name: "Financial Fraud Investigation",
    },
    {
        id: "2",
        name: "Cybercrime Investigation",
    },
    {
        id: "3",
        name: "Corporate Dispute",
    },
];

export default function Sidebar() {
    return (
        <aside className="flex w-72 shrink-0 flex-col border-r border-zinc-800">
            {/* Header */}
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

            {/* Case list */}
            <div className="flex-1 overflow-y-auto p-2">
                {cases.map((caseItem) => (
                    <button
                        key={caseItem.id}
                        type="button"
                        className="mb-1 w-full rounded-lg px-3 py-3 text-left text-sm text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                    >
                        {caseItem.name}
                    </button>
                ))}
            </div>
        </aside>
    );
}