import { USE_MOCK_API } from "../config";

import * as mockUpload from "./mock/upload";
import { apiRequest } from "./api";
import type { Document, DocumentType } from "./documents";

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

// ─────────────────────────────────────────────────────────────────────────────
// INITIATE UPLOAD
// POST /api/documents/upload/initiate
// ─────────────────────────────────────────────────────────────────────────────

export async function initiateUpload(
    data: InitiateUploadInput
): Promise<InitiateUploadResponse> {
    if (USE_MOCK_API) {
        return mockUpload.initiateUpload(data);
    }

    return apiRequest<InitiateUploadResponse>(
        "/api/documents/upload/initiate",
        {
            method: "POST",
            body: JSON.stringify(data),
        }
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// UPLOAD FILE TO STORAGE (presigned URL)
// This is a direct PUT to S3/MinIO — NOT through the backend.
// In mock mode this is a no-op (we skip the actual upload).
// ─────────────────────────────────────────────────────────────────────────────

export async function uploadToStorage(
    uploadUrl: string,
    file: File
): Promise<void> {
    if (USE_MOCK_API) {
        // Simulate a brief upload delay
        await new Promise((resolve) => setTimeout(resolve, 800));
        return;
    }

    const response = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: {
            "Content-Type": file.type || "application/octet-stream",
        },
    });

    if (!response.ok) {
        throw new Error(
            `Upload to storage failed with status ${response.status}`
        );
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// CONFIRM UPLOAD
// POST /api/documents/upload/confirm
// ─────────────────────────────────────────────────────────────────────────────

export async function confirmUpload(
    documentId: string,
    success: boolean
): Promise<Document> {
    if (USE_MOCK_API) {
        return mockUpload.confirmUpload(documentId, success);
    }

    return apiRequest<Document>("/api/documents/upload/confirm", {
        method: "POST",
        body: JSON.stringify({ document_id: documentId, success }),
    });
}
