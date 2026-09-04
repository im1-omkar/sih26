export interface Case {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface CreateCaseInput {
    name: string;
}

export interface UpdateCaseInput {
    name: string;
}

/*
import { apiRequest } from "./api";

export async function getCases(): Promise<Case[]> {
  return apiRequest<Case[]>("/api/cases");
}

export async function getCase(id: string): Promise<Case> {
  return apiRequest<Case>(`/api/cases/${id}`);
}

export async function createCase(
  data: CreateCaseInput
): Promise<Case> {
  return apiRequest<Case>("/api/cases", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateCase(
  id: string,
  data: UpdateCaseInput
): Promise<Case> {
  return apiRequest<Case>(`/api/cases/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteCase(id: string) {
  return apiRequest<{ message: string }>(
    `/api/cases/${id}`,
    {
      method: "DELETE",
    }
  );
}

export async function getCaseDocuments(
  id: string
): Promise<Document[]> {
  return apiRequest<Document[]>(
    `/api/cases/${id}/documents`
  );
}
*/