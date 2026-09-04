import type { Document, DocumentStatus } from "../documents";

const now = new Date().toISOString();

let mockDocuments: Document[] = [
    // ───────────── Case 1 ─────────────

    {
        id: "doc-1",
        title: "Police Incident Report",
        description: "Official incident report collected from the precinct.",
        status: "success",
        object_key: "doc-1/police_incident_report.pdf",
        extracted_information: {
            document_type: "Police Report",
            incident_date: "2026-08-21",
            location: "Mumbai",
            officer: "Rajesh Sharma",
        },
        case_id: "case-1",
        created_at: now,
        updated_at: now,
    },

    {
        id: "doc-2",
        title: "Bank Transaction Records",
        description:
            "Transaction records related to the suspected fraudulent activity.",
        status: "processing",
        object_key: "doc-2/bank_transaction_records.pdf",
        extracted_information: null,
        case_id: "case-1",
        created_at: now,
        updated_at: now,
    },

    {
        id: "doc-3",
        title: "Financial Statement",
        description: "Financial statement submitted as supporting evidence.",
        status: "finish",
        object_key: "doc-3/financial_statement.pdf",
        extracted_information: {
            document_type: "Financial Statement",
            account_holder: "Acme Holdings",
            reporting_period: "2025-2026",
            suspicious_transactions: 7,
        },
        case_id: "case-1",
        created_at: now,
        updated_at: now,
    },

    // ───────────── Case 2 ─────────────

    {
        id: "doc-4",
        title: "Server Logs",
        description: "Server access logs collected during the investigation.",
        status: "success",
        object_key: "doc-4/server_logs.txt",
        extracted_information: {
            document_type: "Server Logs",
            total_events: 12483,
            suspicious_ips: 14,
        },
        case_id: "case-2",
        created_at: now,
        updated_at: now,
    },

    {
        id: "doc-5",
        title: "Email Communications",
        description: "Email correspondence between relevant individuals.",
        status: "processing",
        object_key: "doc-5/email_communications.pdf",
        extracted_information: null,
        case_id: "case-2",
        created_at: now,
        updated_at: now,
    },

    {
        id: "doc-6",
        title: "Network Traffic Report",
        description:
            "Analysis of network traffic captured during the incident.",
        status: "failed",
        object_key: "doc-6/network_traffic_report.pdf",
        extracted_information: null,
        case_id: "case-2",
        created_at: now,
        updated_at: now,
    },

    // ───────────── Case 3 ─────────────

    {
        id: "doc-7",
        title: "Contract Agreement",
        description: "Original agreement between the two parties.",
        status: "finish",
        object_key: "doc-7/contract_agreement.pdf",
        extracted_information: {
            document_type: "Contract",
            parties: ["Company A", "Company B"],
            contract_date: "2025-04-12",
        },
        case_id: "case-3",
        created_at: now,
        updated_at: now,
    },

    {
        id: "doc-8",
        title: "Legal Notice",
        description:
            "Legal notice issued regarding the contractual dispute.",
        status: "success",
        object_key: "doc-8/legal_notice.pdf",
        extracted_information: {
            document_type: "Legal Notice",
            issuing_party: "Company A",
            notice_date: "2026-07-10",
        },
        case_id: "case-3",
        created_at: now,
        updated_at: now,
    },
];

const delay = (ms = 500) =>
    new Promise((resolve) => setTimeout(resolve, ms));

// ─── Public service functions ─────────────────────────────────────────────────

export async function getDocuments(
    caseId?: string
): Promise<Document[]> {
    await delay();

    if (!caseId) {
        return [...mockDocuments];
    }

    return mockDocuments.filter(
        (document) => document.case_id === caseId
    );
}

export async function getDocument(id: string): Promise<Document> {
    await delay();

    const document = mockDocuments.find((d) => d.id === id);

    if (!document) {
        throw new Error("Document not found");
    }

    return { ...document };
}

export async function deleteDocument(
    id: string
): Promise<{ message: string }> {
    await delay();

    const exists = mockDocuments.some((d) => d.id === id);

    if (!exists) {
        throw new Error("Document not found");
    }

    mockDocuments = mockDocuments.filter((d) => d.id !== id);

    return { message: `Document ${id} deleted` };
}

export async function getDownloadUrl(
    id: string
): Promise<{ download_url: string }> {
    await delay();

    const document = mockDocuments.find((d) => d.id === id);

    if (!document) {
        throw new Error("Document not found");
    }

    // Use a real public PDF so the iframe actually renders something
    return {
        download_url:
            "https://arxiv.org/pdf/1706.03762",
    };
}

// ─── Helpers used by mock/upload.ts ──────────────────────────────────────────

/** Add a document to the mock store (used when a new upload is initiated). */
export function addMockDocument(doc: Document): void {
    mockDocuments = [...mockDocuments, doc];
}

/** Retrieve a document synchronously (used by confirmUpload). */
export function getMockDocument(id: string): Document {
    const doc = mockDocuments.find((d) => d.id === id);
    if (!doc) throw new Error("Document not found");
    return { ...doc };
}

/** Update a document's status in-place (used by confirmUpload to simulate processing). */
export function updateMockDocumentStatus(
    id: string,
    status: DocumentStatus
): void {
    mockDocuments = mockDocuments.map((d) =>
        d.id === id
            ? { ...d, status, updated_at: new Date().toISOString() }
            : d
    );
}