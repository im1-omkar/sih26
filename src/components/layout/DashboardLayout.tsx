import { useEffect, useState } from "react";
import { useWorkspaceStore } from "../../store/workspaceStore";
import { useDocumentsStore } from "../../store/documentsStore";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Workspace from "./Workspace";
import DocumentViewer from "../documents/DocumentViewer";

export default function DashboardLayout() {
    const selectedDocumentId = useWorkspaceStore((state) => state.selectedDocumentId);
    const documents = useDocumentsStore((state) => state.documents);
    const selectedDocument = documents.find((d) => d.id === selectedDocumentId);

    const [leftOpen, setLeftOpen] = useState(true);
    const [rightOpen, setRightOpen] = useState(false);

    // Auto-open the document panel when a document is selected
    useEffect(() => {
        if (selectedDocumentId) {
            setRightOpen(true);
        }
    }, [selectedDocumentId]);

    return (
        <div className="flex h-screen flex-col bg-surface-50">
            <Navbar />
            
            {/* Toolbar for toggling panels (VS Code style) */}
            <div className="flex items-center justify-between border-b border-surface-200 bg-surface-100 px-4 py-1.5 shadow-sm z-10">
                <button 
                    onClick={() => setLeftOpen(!leftOpen)}
                    className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold text-surface-600 hover:bg-surface-200"
                >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
                    {leftOpen ? "Hide Cases" : "Show Cases"}
                </button>

                {selectedDocumentId && (
                    <button 
                        onClick={() => setRightOpen(!rightOpen)}
                        className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold text-surface-600 hover:bg-surface-200"
                    >
                        {rightOpen ? "Hide Document" : "Show Document"}
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" /></svg>
                    </button>
                )}
            </div>

            <div className="flex min-h-0 flex-1 overflow-hidden">
                {/* Left Panel: Cases */}
                <div className={`transition-all duration-300 ease-in-out border-r border-surface-200 shadow-sm flex shrink-0 ${leftOpen ? 'w-72 opacity-100' : 'w-0 opacity-0 overflow-hidden border-none'}`}>
                    <div className="w-72 flex shrink-0 h-full">
                        <Sidebar />
                    </div>
                </div>

                {/* Middle Panel: Workspace */}
                <div className="flex min-w-0 flex-1 flex-col shadow-inner bg-surface-50">
                    <Workspace />
                </div>

                {/* Right Panel: Document Viewer */}
                <div className={`transition-all duration-300 ease-in-out border-l border-surface-200 shadow-sm bg-white flex shrink-0 ${rightOpen && selectedDocument ? 'w-[500px] opacity-100' : 'w-0 opacity-0 overflow-hidden border-none'}`}>
                    <div className="w-[500px] flex shrink-0 h-full p-4 overflow-y-auto">
                        {selectedDocument ? (
                            <DocumentViewer document={selectedDocument} />
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}