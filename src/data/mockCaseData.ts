// mockCaseData.ts

export const mockGeoLocation = [
    { id: "geo-1", lat: 28.6139, lng: 77.2090, label: "Suspect Residence", timestamp: "2026-09-01T10:00:00Z", entity: "Rajesh Sharma", type: "residence", details: { address: "Plot 42, Vasant Vihar", occupants: 3 } },
    { id: "geo-2", lat: 28.6145, lng: 77.2105, label: "Meeting Point Drop", timestamp: "2026-09-02T14:30:00Z", entity: "Rajesh Sharma", type: "movement", details: { vehicle: "DL-4C-9981", duration: "12 mins" } },
    { id: "geo-3", lat: 28.6110, lng: 77.2150, label: "Unregistered Warehouse", timestamp: "2026-09-04T02:15:00Z", entity: "Vikram Malhotra", type: "incident", details: { seized: "50kg Contraband", arrests: 2 } },
    { id: "geo-4", lat: 28.6200, lng: 77.2200, label: "ATM Withdrawal", timestamp: "2026-09-04T08:00:00Z", entity: "Unknown", type: "financial", details: { amount: "₹50,000", card: "HDFC Ends 4432" } },
    { id: "geo-5", lat: 28.5900, lng: 77.1900, label: "Burner Phone Ping", timestamp: "2026-09-05T18:45:00Z", entity: "Phone-9871", type: "communication", details: { imei: "35492109...", duration: "45s ping" } },
];

export const mockFinancialTracing = {
    nodes: [
        { id: "p-rajesh", label: "Rajesh Sharma", type: "person", details: { role: "Primary Suspect", risk: "High" } },
        { id: "p-vikram", label: "Vikram Malhotra", type: "person", details: { role: "Associate", aliases: ["Vicky"] } },
        { id: "c-shell", label: "Apex Logistics LLC", type: "company", details: { regDate: "2024-05-12", director: "Proxy Name" } },
        { id: "a-bank1", label: "HDFC A/C 9901", type: "bank_account", details: { balance: "₹120,000", branch: "Delhi" } },
        { id: "a-bank2", label: "ICICI A/C 4521", type: "bank_account", details: { balance: "₹5,200", flagged: true } },
        { id: "w-crypto", label: "Wallet 0x8A1...", type: "wallet", details: { balance: "14.2 BTC", network: "Bitcoin" } },
        { id: "c-front", label: "Zenith Holdings", type: "company", details: { regDate: "2025-01-20" } },
        { id: "a-bank3", label: "SBI A/C 1122", type: "bank_account", details: { balance: "₹2.1M" } },
        { id: "p-amit", label: "Amit Singh", type: "person", details: { role: "Financier" } },
        { id: "prop-1", label: "Luxury Villa", type: "property", details: { value: "₹45M", location: "Gurgaon" } },
    ],
    edges: [
        { id: "e1", source: "p-rajesh", target: "a-bank1", label: "owns", color: "#64748b" },
        { id: "e2", source: "a-bank1", target: "c-shell", label: "transferred ₹5M", color: "#ef4444" },
        { id: "e3", source: "c-shell", target: "a-bank2", label: "transferred ₹4.8M", color: "#f59e0b" },
        { id: "e4", source: "p-vikram", target: "a-bank2", label: "controls", color: "#64748b" },
        { id: "e5", source: "a-bank2", target: "w-crypto", label: "crypto purchase", color: "#ef4444" },
        { id: "e6", source: "w-crypto", target: "c-front", label: "laundered", color: "#ef4444" },
        { id: "e7", source: "c-front", target: "a-bank3", label: "deposit", color: "#f59e0b" },
        { id: "e8", source: "p-amit", target: "a-bank3", label: "controls", color: "#64748b" },
        { id: "e9", source: "p-amit", target: "prop-1", label: "purchased", color: "#64748b" },
    ]
};

export const mockTimeline = [
    { id: "tl-1", date: "2026-08-15", time: "14:00", type: "communication", entity: "Rajesh Sharma", location: "Delhi", description: "First contact established with Vikram via encrypted app.", confidence: 0.95, details: { app: "Signal", metadata: "IP Logged" } },
    { id: "tl-2", date: "2026-08-20", time: "09:30", type: "financial", entity: "Apex Logistics LLC", location: "Mumbai", description: "Shell company registered using forged documents.", confidence: 0.88, details: { docs: "Fake Aadhaar", agent: "Unknown" } },
    { id: "tl-3", date: "2026-09-01", time: "10:00", type: "movement", entity: "Rajesh Sharma", location: "Suspect Residence", description: "Subject observed leaving residence with heavy luggage.", confidence: 0.99, details: { vehicle: "Black SUV" } },
    { id: "tl-4", date: "2026-09-03", time: "22:00", type: "movement", entity: "Vikram Malhotra", location: "Warehouse", description: "Arrived at location.", confidence: 0.90, details: {} },
    { id: "tl-5", date: "2026-09-04", time: "02:15", type: "incident", entity: "Vikram Malhotra", location: "Unregistered Warehouse", description: "Warehouse raid. Seized 50kg contraband.", confidence: 1.0, details: { officers: 12, seized: "Contraband, Cash" } },
    { id: "tl-6", date: "2026-09-04", time: "08:00", type: "financial", entity: "Unknown", location: "ATM", description: "Cash withdrawal of ₹50,000 near warehouse.", confidence: 0.75, details: { camera: "Masked individual" } },
    { id: "tl-7", date: "2026-09-05", time: "18:45", type: "communication", entity: "Phone-9871", location: "South Delhi", description: "Burner phone activated and pinged local tower.", confidence: 0.92, details: { towerId: "DEL-442" } },
    { id: "tl-8", date: "2026-09-06", time: "04:30", type: "movement", entity: "Rajesh Sharma", location: "Airport", description: "Attempted to board international flight.", confidence: 1.0, details: { flight: "EK-512", intercepted: true } },
];

export const mockDigitalForensics = {
    nodes: [
        { id: "d-laptop", label: "MacBook Pro", type: "device", details: { os: "macOS 14", seized: true } },
        { id: "d-phone", label: "iPhone 14", type: "device", details: { unlocked: false } },
        { id: "f-ledger", label: "accounts_2026.xlsx", type: "file", details: { size: "45KB", encrypted: true } },
        { id: "f-photo", label: "IMG_9912.jpg", type: "file", details: { exif: "GPS Found" } },
        { id: "f-deleted", label: "passwords.txt", type: "deleted_file", details: { recoveredVia: "Deep Scan" } },
        { id: "a-telegram", label: "Telegram App", type: "application", details: { version: "10.2" } },
        { id: "a-signal", label: "Signal", type: "application", details: { messages: 450 } },
        { id: "f-script", label: "wipe.sh", type: "file", details: { type: "Bash Script" } },
    ],
    edges: [
        { id: "e1", source: "d-laptop", target: "f-ledger", label: "contains", color: "#64748b" },
        { id: "e2", source: "d-laptop", target: "f-deleted", label: "recovered from", color: "#f59e0b" },
        { id: "e3", source: "d-phone", target: "f-photo", label: "captured by", color: "#64748b" },
        { id: "e4", source: "d-phone", target: "a-telegram", label: "installed", color: "#64748b" },
        { id: "e5", source: "a-telegram", target: "f-ledger", label: "shared via", color: "#ef4444" },
        { id: "e6", source: "d-phone", target: "a-signal", label: "installed", color: "#64748b" },
        { id: "e7", source: "d-laptop", target: "f-script", label: "executed", color: "#ef4444" },
    ]
};

export const mockCommunicationAnalysis = {
    nodes: [
        { id: "p-rajesh", label: "Rajesh (Target)", type: "person", details: { risk: "High" } },
        { id: "p-vikram", label: "Vikram", type: "person", details: { risk: "High" } },
        { id: "p-amit", label: "Amit", type: "person", details: { risk: "Medium" } },
        { id: "p-unknown1", label: "+91-9871...", type: "phone", details: { provider: "Airtel" } },
        { id: "p-unknown2", label: "+44-7700...", type: "phone", details: { provider: "O2 UK" } },
        { id: "p-unknown3", label: "+1-555...", type: "phone", details: { provider: "Verizon" } },
        { id: "p-sarah", label: "Sarah (Alias)", type: "person", details: { role: "Courier" } },
    ],
    edges: [
        { id: "e1", source: "p-rajesh", target: "p-vikram", label: "142 calls", color: "#ef4444", weight: 5 },
        { id: "e2", source: "p-rajesh", target: "p-amit", label: "12 calls", color: "#f59e0b", weight: 2 },
        { id: "e3", source: "p-vikram", target: "p-unknown1", label: "45 calls", color: "#ef4444", weight: 3 },
        { id: "e4", source: "p-vikram", target: "p-unknown2", label: "8 calls", color: "#64748b", weight: 1 },
        { id: "e5", source: "p-amit", target: "p-unknown1", label: "2 calls", color: "#64748b", weight: 1 },
        { id: "e6", source: "p-rajesh", target: "p-unknown3", label: "34 calls", color: "#f59e0b", weight: 2 },
        { id: "e7", source: "p-sarah", target: "p-unknown3", label: "18 calls", color: "#f59e0b", weight: 2 },
    ]
};

export const mockForensicEvidence = {
    nodes: [
        { id: "scene-1", label: "Warehouse", type: "location", details: { address: "Plot 12, Ind. Area" } },
        { id: "ev-1", label: "Fingerprint FP-01", type: "evidence", details: { quality: "Partial" } },
        { id: "ev-2", label: "DNA Sample D-44", type: "evidence", details: { matched: true } },
        { id: "obj-1", label: "Pry Bar", type: "object", details: { material: "Steel" } },
        { id: "p-vikram", label: "Vikram Malhotra", type: "person", details: { status: "Arrested" } },
        { id: "ev-3", label: "CCTV Footage", type: "evidence", details: { duration: "4h" } },
        { id: "scene-2", label: "Getaway Vehicle", type: "location", details: { plates: "Fake" } },
        { id: "ev-4", label: "Hair follicle", type: "evidence", details: { matched: false } },
    ],
    edges: [
        { id: "e1", source: "scene-1", target: "obj-1", label: "found at", color: "#64748b" },
        { id: "e2", source: "obj-1", target: "ev-1", label: "extracted from", color: "#f59e0b" },
        { id: "e3", source: "ev-1", target: "p-vikram", label: "matches (99%)", color: "#ef4444" },
        { id: "e4", source: "scene-1", target: "ev-2", label: "found at", color: "#64748b" },
        { id: "e5", source: "scene-1", target: "ev-3", label: "recorded at", color: "#64748b" },
        { id: "e6", source: "ev-3", target: "p-vikram", label: "identifies", color: "#ef4444" },
        { id: "e7", source: "scene-2", target: "ev-4", label: "found at", color: "#64748b" },
        { id: "e8", source: "scene-2", target: "p-vikram", label: "used by", color: "#ef4444" },
    ]
};

export const mockIdentityResolution = {
    target: "Rajesh Sharma",
    candidates: [
        {
            id: "cand-1",
            name: "Rajesh K. Sharma",
            confidence: 94,
            matchingAttributes: ["DOB: 1985-04-12", "Phone: +91-9871...", "City: Delhi"],
            conflictingAttributes: ["Address: Plot 42 vs Flat 12"],
            source: "Telecom DB"
        },
        {
            id: "cand-2",
            name: "R. Sharma",
            confidence: 71,
            matchingAttributes: ["Phone: +91-9871..."],
            conflictingAttributes: ["DOB: Unknown", "City: Noida"],
            source: "Bank KYC"
        },
        {
            id: "cand-3",
            name: "Rajesh Sharma",
            confidence: 42,
            matchingAttributes: ["Name Match"],
            conflictingAttributes: ["DOB: 1990-01-01", "Phone: +91-9999..."],
            source: "Traffic Challan"
        }
    ]
};
