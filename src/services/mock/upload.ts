import type { Document, DocumentType } from "../documents";
import {
    addMockDocument,
    getMockDocument,
    updateMockDocumentStatus,
} from "./documents";

export interface InitiateUploadInput {
    case_id: string;
    title: string;
    description: string;
    file_name: string;
    document_type: DocumentType;
}

export interface InitiateUploadResponse {
    document_id: string;
    upload_url: string;
    object_key: string;
}

const delay = (ms = 500) =>
    new Promise((resolve) => setTimeout(resolve, ms));

// ─── Initiate ────────────────────────────────────────────────────────────────

export async function initiateUpload(
    data: InitiateUploadInput
): Promise<InitiateUploadResponse> {
    await delay(400);

    const now = new Date().toISOString();
    const documentId = crypto.randomUUID();
    const objectKey = `${documentId}/${data.file_name}`;

    // Add a pending document to the shared mock store
    const newDoc: Document = {
        id: documentId,
        title: data.title,
        description: data.description,
        status: "pending",
        document_type: data.document_type,
        object_key: objectKey,
        extracted_information: null,
        case_id: data.case_id,
        created_at: now,
        updated_at: now,
    };

    addMockDocument(newDoc);

    // Return a fake presigned URL (the upload step will be a no-op in mock mode)
    return {
        document_id: documentId,
        upload_url: `https://mock-s3.example.com/upload/${objectKey}`,
        object_key: objectKey,
    };
}

// ─── Confirm ─────────────────────────────────────────────────────────────────

export async function confirmUpload(
    documentId: string,
    success: boolean
): Promise<Document> {
    await delay(500);

    if (success) {
        // Move document to "success"
        updateMockDocumentStatus(documentId, "success");
    } else {
        // Mark as failed
        updateMockDocumentStatus(documentId, "failed");
    }

    return getMockDocument(documentId);
}
