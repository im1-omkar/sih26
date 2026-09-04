import type {
    Case,
    CreateCaseInput,
    UpdateCaseInput,
} from "../cases";

let mockCases: Case[] = [
    {
        id: "case-1",
        name: "Financial Fraud Heavy Investigation",
        created_at: "2026-09-01T10:00:00Z",
        updated_at: "2026-09-01T10:00:00Z",
    },
    {
        id: "case-2",
        name: "Cybercrime Investigation",
        created_at: "2026-09-02T11:30:00Z",
        updated_at: "2026-09-02T11:30:00Z",
    },
    {
        id: "case-3",
        name: "Corporate Dispute",
        created_at: "2026-09-03T14:20:00Z",
        updated_at: "2026-09-03T14:20:00Z",
    },
];

const delay = (ms = 500) =>
    new Promise((resolve) => setTimeout(resolve, ms));

export async function getCases(): Promise<Case[]> {
    await delay();

    return [...mockCases];
}

export async function getCase(id: string): Promise<Case> {
    await delay();

    const caseItem = mockCases.find(
        (item) => item.id === id
    );

    if (!caseItem) {
        throw new Error("Case not found");
    }

    return { ...caseItem };
}

export async function createCase(
    data: CreateCaseInput
): Promise<Case> {
    await delay();

    const now = new Date().toISOString();

    const newCase: Case = {
        id: crypto.randomUUID(),
        name: data.name,
        created_at: now,
        updated_at: now,
    };

    mockCases = [...mockCases, newCase];

    return { ...newCase };
}

export async function updateCase(
    id: string,
    data: UpdateCaseInput
): Promise<Case> {
    await delay();

    const index = mockCases.findIndex(
        (item) => item.id === id
    );

    if (index === -1) {
        throw new Error("Case not found");
    }

    const updatedCase = {
        ...mockCases[index],
        name: data.name,
        updated_at: new Date().toISOString(),
    };

    mockCases[index] = updatedCase;

    return { ...updatedCase };
}

export async function deleteCase(
    id: string
): Promise<{ message: string }> {
    await delay();

    const exists = mockCases.some(
        (item) => item.id === id
    );

    if (!exists) {
        throw new Error("Case not found");
    }

    mockCases = mockCases.filter(
        (item) => item.id !== id
    );

    return {
        message: `Case ${id} deleted`,
    };
}