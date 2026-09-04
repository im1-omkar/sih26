import { create } from "zustand";

import type { Document } from "../services/documents";
import { getDocuments } from "../services/mock/documents";

interface DocumentsState {
    documents: Document[];
    isLoading: boolean;
    error: string | null;

    fetchDocuments: (caseId: string) => Promise<void>;
}

export const useDocumentsStore = create<DocumentsState>(
    (set) => ({
        documents: [],
        isLoading: false,
        error: null,

        fetchDocuments: async (caseId: string) => {
            set({
                isLoading: true,
                error: null,
            });

            try {
                const documents = await getDocuments(caseId);

                set({
                    documents,
                    isLoading: false,
                });
            } catch (error) {
                set({
                    isLoading: false,
                    error:
                        error instanceof Error
                            ? error.message
                            : "Failed to load documents",
                });
            }
        },
    })
);