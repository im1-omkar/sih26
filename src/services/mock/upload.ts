import type { Document } from "../documents";
import {
    addMockDocument,
    getMockDocument,
    updateMockDocumentStatus,
} from "./documents";

export interface InitiateUploadInput {
    case_id: string;
    title: string;
    description: string;
    object_key: string;
}

export interface InitiateUploadResponse {
    document_id: string;
    upload_url: string;
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

    // Add a pending document to the shared mock store
    const newDoc: Document = {
        id: documentId,
        title: data.title,
        description: data.description,
        status: "pending",
        object_key: data.object_key,
        extracted_information: null,
        case_id: data.case_id,
        created_at: now,
        updated_at: now,
    };

    addMockDocument(newDoc);

    // Return a fake presigned URL (the upload step will be a no-op in mock mode)
    return {
        document_id: documentId,
        upload_url: `https://mock-s3.example.com/upload/${data.object_key}`,
    };
}

// ─── Confirm ─────────────────────────────────────────────────────────────────

export async function confirmUpload(documentId: string): Promise<Document> {
    await delay(500);

    // Move document to "processing"
    updateMockDocumentStatus(documentId, "processing");

    // Simulate async backend processing — flip to "success" after 2 seconds
    setTimeout(() => {
        updateMockDocumentStatus(documentId, "success");
    }, 2000);

    return getMockDocument(documentId);
}
