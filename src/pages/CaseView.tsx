import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCasesStore } from "../store/casesStore";
import { useDocumentsStore } from "../store/documentsStore";
import Navbar from "../components/layout/Navbar";
import DocumentList from "../components/documents/DocumentList";


import NetworkGraph from "../components/dashboard/analytics/NetworkGraph";
import GeoLocationView from "../components/dashboard/analytics/GeoLocationView";
import TimelineView from "../components/dashboard/analytics/TimelineView";
import IdentityResolutionView from "../components/dashboard/analytics/IdentityResolutionView";

import { 
    mockFinancialTracing, 
    mockDigitalForensics, 
    mockCommunicationAnalysis, 
    mockForensicEvidence 
} from "../data/mockCaseData";

const SECTIONS = [
    "Geo-Location",
    "Financial Tracing",
    "Timelines of Crime",
    "Digital Forensics",
    "Communication Analysis",
    "Forensic Evidence",
    "Identity Resolution",
    "GNN Output",
];

const MOCK_GNN_DATA = {
  "status": "success",
  "case_id": "FIR 101/2026",
  "meta": {
    "total_nodes": 7,
    "total_edges": 12,
    "evidentiary_edges": 8,
    "predicted_edges": 4,
    "last_analyzed": "2026-09-09T10:00:00+05:30"
  },
  "elements": {
    "nodes": [
      {
        "data": {
          "id": "ENT-PERSON-RAJESH_SHARMA",
          "label": "RAJESH SHARMA",
          "type": "person",
          "badge": "Primary Suspect",
          "risk_score": 0.95,
          "attributes": { "source": "FIR 101", "role": "Syndicate Head" }
        }
      },
      {
        "data": {
          "id": "ENT-PERSON-VIKRAM_MALHOTRA",
          "label": "VIKRAM MALHOTRA",
          "type": "person",
          "badge": "Associate",
          "risk_score": 0.88,
          "attributes": { "source": "Call Records" }
        }
      },
      {
        "data": {
          "id": "ENT-PHONE-9871",
          "label": "BURNER 9871",
          "type": "phone",
          "badge": "Evidentiary",
          "risk_score": 0.72,
          "attributes": { "carrier": "Airtel" }
        }
      },
      {
        "data": {
          "id": "ENT-BANK-HDFC",
          "label": "HDFC A/C 9901",
          "type": "bank_account",
          "badge": "Laundering Hub",
          "risk_score": 0.91,
          "attributes": { "balance": "₹120,000" }
        }
      },
      {
        "data": {
          "id": "ENT-COMPANY-APEX",
          "label": "APEX LOGISTICS",
          "type": "company",
          "badge": "Front Company",
          "risk_score": 0.85,
          "attributes": { "regDate": "2024" }
        }
      },
      {
        "data": {
          "id": "ENT-PERSON-AMIT",
          "label": "AMIT SINGH",
          "type": "person",
          "badge": "Candidate Financier",
          "risk_score": 0.78,
          "attributes": {}
        }
      },
      {
        "data": {
          "id": "ENT-WALLET-BTC",
          "label": "WALLET 0x8A1",
          "type": "wallet",
          "badge": "High Risk",
          "risk_score": 0.99,
          "attributes": { "balance": "14.2 BTC" }
        }
      }
    ],
    "edges": [
      {
        "data": {
          "id": "edge-ev-1",
          "source": "ENT-PERSON-RAJESH_SHARMA",
          "target": "ENT-PERSON-VIKRAM_MALHOTRA",
          "label": "co_accused (FIR 101)",
          "category": "evidentiary",
          "style": "solid",
          "color": "#64748b"
        }
      },
      {
        "data": {
          "id": "edge-ev-2",
          "source": "ENT-PERSON-RAJESH_SHARMA",
          "target": "ENT-PHONE-9871",
          "label": "owner",
          "category": "evidentiary",
          "style": "solid",
          "color": "#64748b"
        }
      },
      {
        "data": {
          "id": "edge-ev-3",
          "source": "ENT-PERSON-RAJESH_SHARMA",
          "target": "ENT-BANK-HDFC",
          "label": "signatory",
          "category": "evidentiary",
          "style": "solid",
          "color": "#64748b"
        }
      },
      {
        "data": {
          "id": "edge-ev-4",
          "source": "ENT-BANK-HDFC",
          "target": "ENT-COMPANY-APEX",
          "label": "transferred",
          "category": "evidentiary",
          "style": "solid",
          "color": "#64748b"
        }
      },
      {
        "data": {
          "id": "edge-ev-5",
          "source": "ENT-PERSON-VIKRAM_MALHOTRA",
          "target": "ENT-COMPANY-APEX",
          "label": "director",
          "category": "evidentiary",
          "style": "solid",
          "color": "#64748b"
        }
      },
      {
        "data": {
          "id": "edge-ev-6",
          "source": "ENT-PERSON-AMIT",
          "target": "ENT-BANK-HDFC",
          "label": "depositor",
          "category": "evidentiary",
          "style": "solid",
          "color": "#64748b"
        }
      },
      {
        "data": {
          "id": "edge-pred-1",
          "source": "ENT-PERSON-AMIT",
          "target": "ENT-COMPANY-APEX",
          "label": "hidden_owner (92%)",
          "category": "hypothesis",
          "style": "dashed",
          "color": "#ef4444",
          "probability": 0.92
        }
      },
      {
        "data": {
          "id": "edge-pred-2",
          "source": "ENT-PHONE-9871",
          "target": "ENT-PERSON-VIKRAM_MALHOTRA",
          "label": "frequent_contact (88%)",
          "category": "hypothesis",
          "style": "dashed",
          "color": "#ef4444",
          "probability": 0.88
        }
      },
      {
        "data": {
          "id": "edge-pred-3",
          "source": "ENT-COMPANY-APEX",
          "target": "ENT-WALLET-BTC",
          "label": "launder_path (96%)",
          "category": "hypothesis",
          "style": "dashed",
          "color": "#ef4444",
          "probability": 0.96
        }
      }
    ]
  }
};

const DUMMY_LLM_OUTPUT = `[System] Initiating deep case analysis...
[Analysis] Analyzing FIR 101/2026 entities and cross-referencing with global watchlists.
[Insight] Rajesh Sharma exhibits a 85% risk score based on frequency of intermediary communications and overlapping financial footprints.
[Insight] Vikram Malhotra identified as Candidate Associate with 82.4% co-conspirator probability.
[Recommendation] Recommend immediate interrogation under BNS Section 61 (Criminal Conspiracy). Subject acts as high-frequency intermediary.
[Status] Analysis complete. 2 key individuals identified. 1 actionable recommendation generated.`;

export default function CaseView() {
    const { caseId } = useParams();
    const cases = useCasesStore((state) => state.cases);
    const fetchCases = useCasesStore((state) => state.fetchCases);
    const { documents, fetchDocuments } = useDocumentsStore();

    const [activeSection, setActiveSection] = useState("GNN Output");
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const [llmText, setLlmText] = useState("");
    
    useEffect(() => {
        if (cases.length === 0) fetchCases();
        if (caseId) fetchDocuments(caseId);
    }, [caseId, cases.length, fetchCases, fetchDocuments]);

    const caseData = cases.find(c => c.id === caseId);

    // Clear selection when section changes
    useEffect(() => {
        setSelectedItem(null);
    }, [activeSection]);

    // LLM Typewriter Effect
    useEffect(() => {
        setLlmText("");
        let currentIdx = 0;
        const interval = setInterval(() => {
            if (currentIdx <= DUMMY_LLM_OUTPUT.length) {
                setLlmText(DUMMY_LLM_OUTPUT.slice(0, currentIdx));
                currentIdx += Math.floor(Math.random() * 4) + 1;
            } else {
                clearInterval(interval);
            }
        }, 20);
        return () => clearInterval(interval);
    }, []);

    // Create a normalized wrapper for onSelect to extract data properly from GNN vs Network Graph vs Geo
    const handleNodeSelect = (item: any) => {
        setSelectedItem(item);
    };

    return (
        <div className="flex h-screen flex-col bg-surface-50">
            <Navbar />

            {/* Header */}
            <div className="border-b border-surface-200 bg-white px-6 py-4 shadow-sm z-10 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <Link to="/dashboard" className="text-brand-600 hover:underline text-sm font-semibold">← Back to Dashboard</Link>
                    <h1 className="text-2xl font-bold text-surface-900 border-l border-surface-300 pl-4">
                        Case: {caseData?.name || caseId}
                    </h1>
                </div>

                {/* Section Toggles */}
                <div className="flex flex-wrap items-center gap-2">
                    {SECTIONS.map((sec) => (
                        <button
                            key={sec}
                            onClick={() => setActiveSection(sec)}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                                activeSection === sec 
                                    ? "bg-brand-600 text-white shadow" 
                                    : "bg-surface-100 text-surface-600 hover:bg-surface-200"
                            }`}
                        >
                            {sec}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex min-h-0 flex-1 overflow-hidden">
                {/* Left Panel: Documents */}
                <div className="w-72 border-r border-surface-200 bg-surface-0 shadow-sm flex flex-col overflow-hidden shrink-0">
                    <div className="p-4 border-b border-surface-200 bg-surface-50">
                        <h2 className="text-sm font-bold uppercase tracking-wider text-surface-600">Case Documents</h2>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4">
                        <DocumentList documents={documents} />
                    </div>
                </div>

                {/* Center Panel: Active Section & LLM Output */}
                <div className="flex-1 flex flex-col overflow-hidden bg-surface-50">
                    <div className="flex-1 p-6 overflow-y-auto">
                        <div className="bg-white rounded-xl border border-surface-200 shadow-sm h-full flex flex-col overflow-hidden">
                            <div className="p-4 border-b border-surface-200 bg-surface-50">
                                <h2 className="text-base font-bold text-surface-900">{activeSection}</h2>
                            </div>
                            <div className="flex-1 relative bg-surface-50/50">
                                {activeSection === "GNN Output" && <NetworkGraph theme="digital" data={{ nodes: MOCK_GNN_DATA.elements.nodes.map(n => n.data), edges: MOCK_GNN_DATA.elements.edges.map(e => e.data) }} onNodeClick={(id) => handleNodeSelect(MOCK_GNN_DATA.elements.nodes.find(n => n.data.id === id)?.data)} />}
                                {activeSection === "Geo-Location" && <GeoLocationView onSelect={handleNodeSelect} />}
                                {activeSection === "Timelines of Crime" && <TimelineView onSelect={handleNodeSelect} />}
                                {activeSection === "Identity Resolution" && <IdentityResolutionView />}
                                
                                {activeSection === "Financial Tracing" && <NetworkGraph theme="financial" data={mockFinancialTracing} onNodeClick={(id) => handleNodeSelect(mockFinancialTracing.nodes.find(n => n.id === id))} />}
                                {activeSection === "Digital Forensics" && <NetworkGraph theme="digital" data={mockDigitalForensics} onNodeClick={(id) => handleNodeSelect(mockDigitalForensics.nodes.find(n => n.id === id))} />}
                                {activeSection === "Communication Analysis" && <NetworkGraph theme="communication" data={mockCommunicationAnalysis} onNodeClick={(id) => handleNodeSelect(mockCommunicationAnalysis.nodes.find(n => n.id === id))} />}
                                {activeSection === "Forensic Evidence" && <NetworkGraph theme="evidence" data={mockForensicEvidence} onNodeClick={(id) => handleNodeSelect(mockForensicEvidence.nodes.find(n => n.id === id))} />}
                            </div>
                        </div>
                    </div>

                    {/* Bottom LLM Output Panel */}
                    <div className="h-48 border-t border-surface-200 bg-surface-900 p-4 shrink-0 overflow-y-auto font-mono text-sm text-brand-300">
                        <div className="flex items-center gap-2 mb-2 text-white">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            <h3 className="font-bold">LLM Analysis Terminal</h3>
                        </div>
                        <pre className="whitespace-pre-wrap">{llmText}<span className="animate-pulse text-white">_</span></pre>
                    </div>
                </div>

                {/* Right Panel: Node Details */}
                <div className={`transition-all duration-300 ease-in-out border-l border-surface-200 shadow-sm bg-white flex shrink-0 ${selectedItem ? 'w-80 opacity-100' : 'w-0 opacity-0 overflow-hidden border-none'}`}>
                    <div className="w-80 flex flex-col h-full overflow-hidden">
                        <div className="p-4 border-b border-surface-200 bg-surface-50 flex items-center justify-between">
                            <h2 className="text-sm font-bold uppercase tracking-wider text-surface-600">Details</h2>
                            <button onClick={() => setSelectedItem(null)} className="text-surface-400 hover:text-surface-600 text-lg leading-none">&times;</button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-6">
                            {selectedItem && (
                                <>
                                    <div>
                                        <div className="text-xs text-surface-400 uppercase tracking-wider mb-1">ID</div>
                                        <div className="font-mono text-xs text-surface-800 break-all">{selectedItem.id}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-surface-400 uppercase tracking-wider mb-1">{selectedItem.name ? 'Name' : 'Label'}</div>
                                        <div className="font-bold text-surface-900 text-lg">{selectedItem.label || selectedItem.name || selectedItem.title || selectedItem.entity}</div>
                                    </div>
                                    {selectedItem.type && (
                                        <div>
                                            <div className="text-xs text-surface-400 uppercase tracking-wider mb-1">Type</div>
                                            <div className="capitalize inline-block px-2 py-1 bg-surface-100 rounded text-xs font-semibold text-surface-700">{selectedItem.type}</div>
                                        </div>
                                    )}
                                    {selectedItem.risk_score !== undefined && (
                                        <div>
                                            <div className="text-xs text-surface-400 uppercase tracking-wider mb-1">Risk Score</div>
                                            <div className="text-xl font-bold text-red-600">{(selectedItem.risk_score * 100).toFixed(1)}%</div>
                                        </div>
                                    )}
                                    {selectedItem.confidence !== undefined && (
                                        <div>
                                            <div className="text-xs text-surface-400 uppercase tracking-wider mb-1">Confidence</div>
                                            <div className="text-xl font-bold text-brand-600">{(selectedItem.confidence * 100).toFixed(0)}%</div>
                                        </div>
                                    )}

                                    {/* Generic Key-Value Details mapping */}
                                    {selectedItem.details && Object.keys(selectedItem.details).length > 0 && (
                                        <div className="pt-4 border-t border-surface-200">
                                            <div className="text-xs text-surface-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                Extracted Metadata
                                            </div>
                                            <div className="bg-surface-50 border border-surface-200 p-3 rounded-lg text-sm text-surface-700 space-y-2">
                                                {Object.entries(selectedItem.details).map(([key, val]) => (
                                                    <div key={key} className="flex justify-between gap-4 border-b border-surface-200 pb-1 last:border-0 last:pb-0">
                                                        <span className="font-semibold text-surface-500 capitalize">{key}:</span>
                                                        <span className="text-right">{String(val)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    
                                    {selectedItem.attributes && Object.keys(selectedItem.attributes).length > 0 && (
                                        <div className="pt-4 border-t border-surface-200">
                                            <div className="text-xs text-surface-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                                OCR / Content Analysis
                                            </div>
                                            <div className="bg-surface-100 p-3 rounded-lg text-xs font-mono text-surface-600">
                                                {Object.entries(selectedItem.attributes).map(([key, val]) => (
                                                    <div key={key}>
                                                        <span className="font-bold">{key}:</span> {String(val)}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
