import { useEffect, useState } from "react";

import type { Document } from "../../services/documents";
import { getDownloadUrl } from "../../services/documents";
import { useWorkspaceStore } from "../../store/workspaceStore";
import { useDocumentsStore } from "../../store/documentsStore";

import StatusBadge from "../ui/StatusBadge";
import Loader from "../ui/Loader";

interface DocumentViewerProps {
    document: Document;
}

const VIEWABLE_STATUSES = new Set(["success", "finish"]);

export default function DocumentViewer({ document }: DocumentViewerProps) {
    const clearDocument = useWorkspaceStore((state) => state.clearDocument);
    const deleteFromStore = useDocumentsStore((state) => state.deleteDocument);

    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
    const [urlLoading, setUrlLoading] = useState(false);
    const [urlError, setUrlError] = useState<string | null>(null);

    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    // Fetch download URL when a viewable document is selected
    useEffect(() => {
        if (!VIEWABLE_STATUSES.has(document.status)) {
            setDownloadUrl(null);
            setUrlError(null);
            return;
        }

        let cancelled = false;

        async function fetchUrl() {
            setUrlLoading(true);
            setUrlError(null);
            setDownloadUrl(null);

            try {
                const { download_url } = await getDownloadUrl(document.id);
                if (!cancelled) setDownloadUrl(download_url);
            } catch (err) {
                if (!cancelled) {
                    setUrlError(
                        err instanceof Error
                            ? err.message
                            : "Failed to load document URL"
                    );
                }
            } finally {
                if (!cancelled) setUrlLoading(false);
            }
        }

        fetchUrl();

        return () => {
            cancelled = true;
        };
    }, [document.id, document.status]);

    async function handleDelete() {
        if (!confirm(`Delete "${document.title}"?`)) return;

        setIsDeleting(true);
        setDeleteError(null);

        try {
            await deleteFromStore(document.id);
            clearDocument();
        } catch (err) {
            setDeleteError(
                err instanceof Error ? err.message : "Failed to delete document"
            );
            setIsDeleting(false);
        }
    }

    return (
        <div className="flex h-full flex-col">
            {/* ── Header ───────────────────────────────────────────────── */}
            <div className="border-b border-zinc-800 pb-5">
                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => clearDocument()}
                                title="Back to documents"
                                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-zinc-500 transition hover:bg-zinc-800 hover:text-zinc-200"
                            >
                                ←
                            </button>

                            <h1 className="truncate text-xl font-semibold text-white">
                                {document.title}
                            </h1>
                        </div>

                        <p className="mt-2 pl-10 text-sm text-zinc-500">
                            {document.description}
                        </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                        <StatusBadge status={document.status} />

                        {/* Open in new tab */}
                        {downloadUrl && (
                            <a
                                href={downloadUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Open in new tab"
                                className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-700 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
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
                                        strokeWidth={1.5}
                                        d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                                    />
                                </svg>
                            </a>
                        )}

                        {/* Delete */}
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={isDeleting}
                            title="Delete document"
                            className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-800 text-zinc-600 transition hover:border-red-800 hover:bg-red-900/30 hover:text-red-400 disabled:opacity-50"
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
                                    strokeWidth={1.5}
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {deleteError && (
                    <p className="mt-2 text-sm text-red-400">{deleteError}</p>
                )}
            </div>

            {/* ── Body ─────────────────────────────────────────────────── */}
            <div className="flex flex-1 flex-col gap-6 overflow-y-auto py-6">

                {/* Document preview */}
                {VIEWABLE_STATUSES.has(document.status) && (
                    <section>
                        <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-zinc-500">
                            Document Preview
                        </h2>

                        {urlLoading && <Loader label="Loading document…" />}

                        {urlError && (
                            <div className="rounded-lg border border-zinc-800 p-6 text-sm text-red-400">
                                {urlError}
                            </div>
                        )}

                        {downloadUrl && !urlLoading && (
                            <div className="overflow-hidden rounded-lg border border-zinc-800">
                                <iframe
                                    src={downloadUrl}
                                    title={document.title}
                                    className="h-[520px] w-full bg-white"
                                />
                            </div>
                        )}
                    </section>
                )}

                {/* Status-specific messages for non-viewable docs */}
                {document.status === "processing" && (
                    <div className="rounded-lg border border-blue-900/50 bg-blue-950/30 p-5 text-sm text-blue-300">
                        <div className="flex items-center gap-2">
                            <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-blue-800 border-t-blue-400" />
                            This document is currently being processed. The
                            preview will be available when processing is
                            complete.
                        </div>
                    </div>
                )}

                {document.status === "pending" && (
                    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-5 text-sm text-zinc-500">
                        This document is pending upload confirmation.
                    </div>
                )}

                {document.status === "failed" && (
                    <div className="rounded-lg border border-red-900/50 bg-red-950/30 p-5 text-sm text-red-400">
                        Processing failed for this document. No preview is
                        available.
                    </div>
                )}

                {/* Metadata */}
                <section>
                    <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-zinc-500">
                        Metadata
                    </h2>

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <div>
                            <p className="text-xs text-zinc-600">
                                Document ID
                            </p>
                            <p className="mt-1 truncate text-sm text-zinc-300">
                                {document.id}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-zinc-600">Case ID</p>
                            <p className="mt-1 truncate text-sm text-zinc-300">
                                {document.case_id}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-zinc-600">Created</p>
                            <p className="mt-1 text-sm text-zinc-300">
                                {new Date(
                                    document.created_at
                                ).toLocaleString()}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-zinc-600">Updated</p>
                            <p className="mt-1 text-sm text-zinc-300">
                                {new Date(
                                    document.updated_at
                                ).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Extracted information */}
                <section>
                    <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-zinc-500">
                        Extracted Information
                    </h2>

                    {document.extracted_information ? (
                        <pre className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-sm text-zinc-300">
                            {JSON.stringify(
                                document.extracted_information,
                                null,
                                2
                            )}
                        </pre>
                    ) : (
                        <div className="rounded-lg border border-zinc-800 p-6 text-sm text-zinc-500">
                            {document.status === "processing"
                                ? "Extraction is in progress."
                                : document.status === "failed"
                                  ? "Extraction failed for this document."
                                  : "No extracted information available yet."}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}