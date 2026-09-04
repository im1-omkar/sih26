export type DocumentStatus =
    | "pending"
    | "processing"
    | "success"
    | "failed"
    | "finish";

export interface Document {
    id: string;
    title: string;
    description: string;
    status: DocumentStatus;
    object_key: string;
    extracted_information: Record<string, unknown> | null;
    case_id: string;
    created_at: string;
    updated_at: string;
}

export interface InitiateUploadInput {
    title: string;
    description: string;
    file_name: string;
    case_id: string;
}

export interface InitiateUploadResponse {
    document_id: string;
    upload_url: string;
    object_key: string;
}

/*
import { apiRequest } from "./api";

export async function getDocuments(
  caseId?: string
): Promise<Document[]> {
  const query = caseId
    ? `?case_id=${encodeURIComponent(caseId)}`
    : "";

  return apiRequest<Document[]>(
    `/api/documents${query}`
  );
}

export async function getDocument(
  id: string
): Promise<Document> {
  return apiRequest<Document>(
    `/api/documents/${id}`
  );
}

export async function getDownloadUrl(
  id: string
): Promise<{ download_url: string }> {
  return apiRequest(
    `/api/documents/${id}/download`
  );
}

export async function deleteDocument(id: string) {
  return apiRequest<{ message: string }>(
    `/api/documents/${id}`,
    {
      method: "DELETE",
    }
  );
}
*/