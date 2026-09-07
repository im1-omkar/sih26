import { useEffect, useState } from "react";

import { useDocumentsStore } from "../../store/documentsStore";
import { useWorkspaceStore } from "../../store/workspaceStore";
import { useCasesStore } from "../../store/casesStore";
import type { Document } from "../../services/documents";

import DocumentList from "../documents/DocumentList";
import UploadDocument from "../upload/UploadDocument";
import KnowledgeGraph from "../dashboard/KnowledgeGraph";
import Loader from "../ui/Loader";
import Button from "../ui/Button";

export default function Workspace() {
    const selectedCaseId = useWorkspaceStore((state) => state.selectedCaseId);

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

    if (!selectedCaseId) {
        return (
            <main className="flex min-w-0 flex-1 items-center justify-center bg-surface-50 p-6">
                <div className="text-center rounded-xl border border-surface-200 bg-white p-12 shadow-sm">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-surface-100">
                        <svg className="h-7 w-7 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                        </svg>
                    </div>
                    <h1 className="text-lg font-bold text-surface-800">Select a case</h1>
                    <p className="mt-1 text-sm text-surface-500">Choose a case from the sidebar to view its details.</p>
                </div>
            </main>
        );
    }

    return (
        <>
            <main className="min-w-0 flex-1 overflow-y-auto bg-surface-50 p-6 lg:p-8 space-y-6">
                
                {/* ── Case Summary Card ─────────── */}
                <div className="rounded-xl border border-surface-200 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-start justify-between gap-4">
                        <div>
                            <h1 className="text-xl font-bold text-surface-900">
                                {selectedCase?.name ?? "Case Workspace"}
                            </h1>
                            {!isLoading && !error && (
                                <p className="mt-1 text-sm text-surface-500">
                                    {documents.length} {documents.length === 1 ? "document" : "documents"}
                                </p>
                            )}
                        </div>
                    </div>
                    
                    <div className="text-sm text-surface-600 space-y-3">
                        <p>This case investigates potential irregularities flagged during routine compliance checks. Initial analysis indicates overlapping financial transactions and communications among several unverified entities.</p>
                        <p>Our document extraction pipeline has processed the uploaded files to automatically identify individuals, organizations, and financial accounts. Analysts should review the highlighted relationships to determine if further action is required.</p>
                        <p>Please note that some documents may still be pending manual review or OCR processing. You can track the status of individual files in the documents list below.</p>
                        <p>The interactive knowledge graph provides a real-time visualization of all extracted connections. Use it to trace fund flows and communication networks across the entire case.</p>
                    </div>
                </div>

                {/* ── Knowledge Graph ──────────── */}
                <KnowledgeGraph />

                {/* ── Documents List ────────────────── */}
                <div className="rounded-xl border border-surface-200 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-sm font-bold uppercase tracking-wider text-surface-700">
                            Documents
                        </h2>
                        <Button variant="primary" size="sm" onClick={() => setShowUpload(true)}>
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" /></svg>
                            Upload
                        </Button>
                    </div>

                    {isLoading && <Loader label="Loading documents…" />}

                    {error && !isLoading && (
                        <div className="rounded-xl border border-surface-200 bg-surface-50 p-6">
                            <p className="text-sm text-red-600">{error}</p>
                            <button type="button" onClick={() => fetchDocuments(selectedCaseId)} className="mt-2 text-xs text-surface-500 underline hover:text-surface-700">Retry</button>
                        </div>
                    )}

                    {!isLoading && !error && (
                        <DocumentList documents={documents} />
                    )}
                </div>
            </main>

            {/* Upload modal */}
            {showUpload && (
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