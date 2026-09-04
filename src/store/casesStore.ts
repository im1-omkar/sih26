import { create } from "zustand";

import type { Case } from "../services/cases";
import {
    getCases,
    createCase as svcCreateCase,
    updateCase as svcUpdateCase,
    deleteCase as svcDeleteCase,
} from "../services/cases";
import type { CreateCaseInput, UpdateCaseInput } from "../services/cases";

interface CasesState {
    cases: Case[];
    isLoading: boolean;
    error: string | null;

    fetchCases: () => Promise<void>;
    createCase: (data: CreateCaseInput) => Promise<Case>;
    updateCase: (id: string, data: UpdateCaseInput) => Promise<Case>;
    deleteCase: (id: string) => Promise<void>;
}

export const useCasesStore = create<CasesState>((set) => ({
    cases: [],
    isLoading: false,
    error: null,

    fetchCases: async () => {
        set({ isLoading: true, error: null });

        try {
            const cases = await getCases();
            set({ cases, isLoading: false });
        } catch (error) {
            set({
                isLoading: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to load cases",
            });
        }
    },

    createCase: async (data) => {
        const newCase = await svcCreateCase(data);
        set((state) => ({ cases: [...state.cases, newCase] }));
        return newCase;
    },

    updateCase: async (id, data) => {
        const updated = await svcUpdateCase(id, data);
        set((state) => ({
            cases: state.cases.map((c) => (c.id === id ? updated : c)),
        }));
        return updated;
    },

    deleteCase: async (id) => {
        await svcDeleteCase(id);
        set((state) => ({
            cases: state.cases.filter((c) => c.id !== id),
        }));
    },
}));