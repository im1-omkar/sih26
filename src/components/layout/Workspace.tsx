import { useEffect } from "react";

import { useWorkspaceStore } from "../../store/workspaceStore";
import { useDocumentsStore } from "../../store/documentsStore";

export default function Workspace() {
    const selectedCaseId = useWorkspaceStore(
        (state) => state.selectedCaseId
    );

    const {
        documents,
        isLoading,
        error,
        fetchDocuments,
    } = useDocumentsStore();

    useEffect(() => {
        if (selectedCaseId) {
            fetchDocuments(selectedCaseId);
        }
    }, [selectedCaseId, fetchDocuments]);

    if (!selectedCaseId) {
        return (
            <main className="flex min-w-0 flex-1 items-center justify-center">
                <div className="text-center">
                    <h1 className="text-xl font-medium text-zinc-200">
                        Select a case
                    </h1>

                    <p className="mt-2 text-sm text-zinc-500">
                        Choose a case from the sidebar to view its
                        documents.
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-w-0 flex-1 overflow-y-auto p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold">
                    Case Workspace
                </h1>

                <p className="mt-1 text-sm text-zinc-500">
                    Case ID: {selectedCaseId}
                </p>
            </div>

            <div>
                <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-zinc-400">
                    Documents
                </h2>

                {isLoading && (
                    <p className="text-sm text-zinc-500">
                        Loading documents...
                    </p>
                )}

                {error && (
                    <p className="text-sm text-red-400">
                        {error}
                    </p>
                )}

                {!isLoading && !error && (
                    <div className="space-y-2">
                        {documents.map((document) => (
                            <div
                                key={document.id}
                                className="rounded-lg border border-zinc-800 p-4 transition hover:border-zinc-700"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium">
                                            {document.title}
                                        </h3>

                                        <p className="mt-1 text-sm text-zinc-500">
                                            {document.description}
                                        </p>
                                    </div>

                                    <span className="text-xs uppercase text-zinc-400">
                                        {document.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}