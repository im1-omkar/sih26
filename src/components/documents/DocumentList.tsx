import type { Document } from "../../services/documents";
import DocumentItem from "./DocumentItem";

interface DocumentListProps {
    documents: Document[];
}

export default function DocumentList({ documents }: DocumentListProps) {
    if (documents.length === 0) {
        return (
            <div className="rounded-lg border border-dashed border-zinc-800 p-10 text-center">
                <p className="text-sm text-zinc-600">
                    No documents in this case yet.
                </p>
                <p className="mt-1 text-xs text-zinc-700">
                    Upload a document to get started.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {documents.map((document) => (
                <DocumentItem key={document.id} document={document} />
            ))}
        </div>
    );
}
