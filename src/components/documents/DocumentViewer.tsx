import type { Document } from "../../services/documents";

interface DocumentViewerProps {
    document: Document;
}

export default function DocumentViewer({
    document,
}: DocumentViewerProps) {
    return (
        <div className="flex h-full flex-col">
            {/* Header */}
            <div className="border-b border-zinc-800 pb-5">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-white">
                            {document.title}
                        </h1>

                        <p className="mt-2 text-sm text-zinc-500">
                            {document.description}
                        </p>
                    </div>

                    <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs uppercase text-zinc-400">
                        {document.status}
                    </span>
                </div>
            </div>

            {/* Details */}
            <div className="flex-1 overflow-y-auto py-6">
                <section>
                    <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-zinc-500">
                        Metadata
                    </h2>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs text-zinc-600">
                                Document ID
                            </p>

                            <p className="mt-1 text-sm text-zinc-300">
                                {document.id}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-zinc-600">
                                Case ID
                            </p>

                            <p className="mt-1 text-sm text-zinc-300">
                                {document.case_id}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-zinc-600">
                                Created
                            </p>

                            <p className="mt-1 text-sm text-zinc-300">
                                {new Date(
                                    document.created_at
                                ).toLocaleString()}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-zinc-600">
                                Updated
                            </p>

                            <p className="mt-1 text-sm text-zinc-300">
                                {new Date(
                                    document.updated_at
                                ).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Extracted information */}
                <section className="mt-10">
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
                            No extracted information available yet.
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}