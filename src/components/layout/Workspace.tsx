import { useEffect } from "react";

import { useDocumentsStore } from "../../store/documentsStore";
import { useWorkspaceStore } from "../../store/workspaceStore";

import DocumentItem from "../documents/DocumentItem";
import DocumentViewer from "../documents/DocumentViewer";

export default function Workspace() {
    const selectedCaseId = useWorkspaceStore(
        (state) => state.selectedCaseId
    );

    const selectedDocumentId = useWorkspaceStore(
        (state) => state.selectedDocumentId
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
                        Choose a case from the sidebar.
                    </p>
                </div>
            </main>
        );
    }

    const selectedDocument = documents.find(
        (document) => document.id === selectedDocumentId
    );

    if (selectedDocument) {
        return (
            <main className="min-w-0 flex-1 overflow-y-auto p-8">
                <DocumentViewer
                    document={selectedDocument}
                />
            </main>
        );
    }

    return (
        <main className="min-w-0 flex-1 overflow-y-auto p-8">
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-white">
                    Case Workspace
                </h1>

                <p className="mt-1 text-sm text-zinc-500">
                    {documents.length}{" "}
                    {documents.length === 1
                        ? "document"
                        : "documents"}
                </p>
            </div>

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
                <div className="space-y-3">
                    {documents.map((document) => (
                        <DocumentItem
                            key={document.id}
                            document={document}
                        />
                    ))}
                </div>
            )}
        </main>
    );
}