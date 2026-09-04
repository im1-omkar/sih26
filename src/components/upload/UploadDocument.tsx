import { useRef, useState } from "react";

import {
    initiateUpload,
    uploadToStorage,
    confirmUpload,
} from "../../services/upload";
import type { Document } from "../../services/documents";

import Modal from "../ui/Modal";
import Button from "../ui/Button";
import UploadProgress from "./UploadProgress";

type UploadStage =
    | "idle"
    | "initiating"
    | "uploading"
    | "confirming"
    | "processing"
    | "done"
    | "error";

interface UploadDocumentProps {
    caseId: string;
    onUploaded: (document: Document) => void;
    onClose: () => void;
}

export default function UploadDocument({
    caseId,
    onUploaded,
    onClose,
}: UploadDocumentProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const [stage, setStage] = useState<UploadStage>("idle");
    const [uploadedDoc, setUploadedDoc] = useState<Document | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const isUploading = stage !== "idle" && stage !== "done" && stage !== "error";

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!file || !title.trim()) return;

        setError(null);

        try {
            // Step 1 — Initiate
            setStage("initiating");
            const objectKey = `${crypto.randomUUID()}/${file.name}`;
            const { document_id, upload_url } = await initiateUpload({
                case_id: caseId,
                title: title.trim(),
                description: description.trim(),
                object_key: objectKey,
            });

            // Step 2 — Upload to storage
            setStage("uploading");
            await uploadToStorage(upload_url, file);

            // Step 3 — Confirm
            setStage("confirming");
            const doc = await confirmUpload(document_id);

            // Step 4 — Processing (doc is now in "processing" status)
            setStage("processing");
            setUploadedDoc(doc);

            // Notify parent immediately so the doc appears in the list
            onUploaded(doc);

            // Brief pause to show the "processing" step
            await new Promise((r) => setTimeout(r, 800));

            setStage("done");
        } catch (err) {
            setStage("error");
            setError(
                err instanceof Error ? err.message : "Upload failed"
            );
        }
    }

    function handleDone() {
        onClose();
    }

    return (
        <Modal title="Upload Document" onClose={isUploading ? () => {} : onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                    <label
                        htmlFor="doc-title"
                        className="mb-1.5 block text-sm text-zinc-400"
                    >
                        Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="doc-title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Police Incident Report"
                        disabled={isUploading}
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-50"
                    />
                </div>

                {/* Description */}
                <div>
                    <label
                        htmlFor="doc-description"
                        className="mb-1.5 block text-sm text-zinc-400"
                    >
                        Description
                    </label>
                    <textarea
                        id="doc-description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Brief description of the document"
                        rows={2}
                        disabled={isUploading}
                        className="w-full resize-none rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-50"
                    />
                </div>

                {/* File picker */}
                <div>
                    <label className="mb-1.5 block text-sm text-zinc-400">
                        File <span className="text-red-500">*</span>
                    </label>

                    <div
                        onClick={() => !isUploading && fileInputRef.current?.click()}
                        className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-zinc-700 px-4 py-6 text-center transition hover:border-zinc-500 ${isUploading ? "cursor-not-allowed opacity-50" : ""}`}
                    >
                        {file ? (
                            <>
                                <p className="text-sm text-zinc-300">
                                    {file.name}
                                </p>
                                <p className="mt-0.5 text-xs text-zinc-600">
                                    {(file.size / 1024).toFixed(1)} KB
                                </p>
                            </>
                        ) : (
                            <>
                                <svg
                                    className="mb-2 h-6 w-6 text-zinc-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                                    />
                                </svg>
                                <p className="text-sm text-zinc-500">
                                    Click to select a file
                                </p>
                            </>
                        )}
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        onChange={(e) =>
                            setFile(e.target.files?.[0] ?? null)
                        }
                    />
                </div>

                {/* Progress */}
                <UploadProgress
                    stage={stage}
                    document={uploadedDoc}
                    error={error}
                    onDone={handleDone}
                />

                {/* Actions — hidden once upload starts */}
                {stage === "idle" && (
                    <div className="flex justify-end gap-2 pt-1">
                        <Button
                            variant="ghost"
                            size="sm"
                            type="button"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="primary"
                            size="sm"
                            type="submit"
                            disabled={!file || !title.trim()}
                        >
                            Upload
                        </Button>
                    </div>
                )}

                {/* Retry on error */}
                {stage === "error" && (
                    <div className="flex justify-end gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            type="button"
                            onClick={onClose}
                        >
                            Close
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            type="submit"
                        >
                            Retry
                        </Button>
                    </div>
                )}
            </form>
        </Modal>
    );
}
