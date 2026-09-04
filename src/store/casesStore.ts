import { create } from "zustand";

import type { Case } from "../services/cases";
import { getCases } from "../services/mock/cases";

interface CasesState {
    cases: Case[];
    isLoading: boolean;
    error: string | null;

    fetchCases: () => Promise<void>;
}

export const useCasesStore = create<CasesState>((set) => ({
    cases: [],
    isLoading: false,
    error: null,

    fetchCases: async () => {
        set({
            isLoading: true,
            error: null,
        });

        try {
            const cases = await getCases();

            set({
                cases,
                isLoading: false,
            });
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
}));