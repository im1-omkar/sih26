import { create } from "zustand";

interface WorkspaceState {
    selectedCaseId: string | null;
    selectedDocumentId: string | null;

    selectCase: (caseId: string) => void;
    selectDocument: (documentId: string) => void;

    clearCase: () => void;
    clearDocument: () => void;
}

export const useWorkspaceStore = create<WorkspaceState>(
    (set) => ({
        selectedCaseId: null,
        selectedDocumentId: null,

        selectCase: (caseId) =>
            set({
                selectedCaseId: caseId,
                selectedDocumentId: null,
            }),

        selectDocument: (documentId) =>
            set({
                selectedDocumentId: documentId,
            }),

        clearCase: () =>
            set({
                selectedCaseId: null,
                selectedDocumentId: null,
            }),

        clearDocument: () =>
            set({
                selectedDocumentId: null,
            }),
    })
);