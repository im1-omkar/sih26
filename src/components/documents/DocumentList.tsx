import type { Document } from "../../services/documents";
import DocumentItem from "./DocumentItem";

interface DocumentListProps {
    documents: Document[];
}

export default function DocumentList({ documents }: DocumentListProps) {
    if (documents.length === 0) {
        return (
            <div className="rounded-xl border border-dashed border-surface-300 p-10 text-center">
                <p className="text-sm font-medium text-surface-500">No documents in this case yet.</p>
                <p className="mt-1 text-xs text-surface-400">Upload a document to get started.</p>
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
