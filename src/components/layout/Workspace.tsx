import { useEffect, useState } from "react";

import { useDocumentsStore } from "../../store/documentsStore";
import { useWorkspaceStore } from "../../store/workspaceStore";
import { useCasesStore } from "../../store/casesStore";
import type { Document } from "../../services/documents";

import DocumentList from "../documents/DocumentList";
import DocumentViewer from "../documents/DocumentViewer";
import UploadDocument from "../upload/UploadDocument";
import Loader from "../ui/Loader";
import Button from "../ui/Button";

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
        addDocument,
    } = useDocumentsStore();

    const cases = useCasesStore((state) => state.cases);
    const selectedCase = cases.find((c) => c.id === selectedCaseId);

    const [showUpload, setShowUpload] = useState(false);

    useEffect(() => {
        if (selectedCaseId) {
            fetchDocuments(selectedCaseId);
        }
    }, [selectedCaseId, fetchDocuments]);

    // ── No case selected ──────────────────────────────────────────────────────
    if (!selectedCaseId) {
        return (
            <main className="flex min-w-0 flex-1 items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-zinc-800">
                        <svg
                            className="h-7 w-7 text-zinc-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                            />
                        </svg>
                    </div>

                    <h1 className="text-lg font-medium text-zinc-200">
                        Select a case
                    </h1>

                    <p className="mt-1 text-sm text-zinc-600">
                        Choose a case from the sidebar to view its documents.
                    </p>
                </div>
            </main>
        );
    }

    // ── Document viewer ───────────────────────────────────────────────────────
    const selectedDocument = documents.find(
        (d) => d.id === selectedDocumentId
    );

    if (selectedDocument) {
        return (
            <main className="min-w-0 flex-1 overflow-y-auto p-8">
                <DocumentViewer document={selectedDocument} />
            </main>
        );
    }

    // ── Case workspace ────────────────────────────────────────────────────────
    return (
        <>
            <main className="min-w-0 flex-1 overflow-y-auto p-8">
                {/* Header */}
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-semibold text-white">
                            {selectedCase?.name ?? "Case Workspace"}
                        </h1>

                        {!isLoading && !error && (
                            <p className="mt-1 text-sm text-zinc-500">
                                {documents.length}{" "}
                                {documents.length === 1
                                    ? "document"
                                    : "documents"}
                            </p>
                        )}
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowUpload(true)}
                    >
                        <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                            />
                        </svg>
                        Upload
                    </Button>
                </div>

                {/* States */}
                {isLoading && <Loader label="Loading documents…" />}

                {error && !isLoading && (
                    <div className="rounded-lg border border-zinc-800 p-6">
                        <p className="text-sm text-red-400">{error}</p>
                        <button
                            type="button"
                            onClick={() =>
                                selectedCaseId &&
                                fetchDocuments(selectedCaseId)
                            }
                            className="mt-2 text-xs text-zinc-500 underline hover:text-zinc-300"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {!isLoading && !error && (
                    <DocumentList documents={documents} />
                )}
            </main>

            {/* Upload modal */}
            {showUpload && selectedCaseId && (
                <UploadDocument
                    caseId={selectedCaseId}
                    onUploaded={(doc: Document) => {
                        addDocument(doc);
                    }}
                    onClose={() => setShowUpload(false)}
                />
            )}
        </>
    );
}