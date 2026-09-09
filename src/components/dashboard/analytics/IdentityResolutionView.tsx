import { useState } from "react";
import { mockIdentityResolution } from "../../../data/mockCaseData";

export default function IdentityResolutionView() {
    const [selectedCand, setSelectedCand] = useState(mockIdentityResolution.candidates[0].id);

    const activeCand = mockIdentityResolution.candidates.find(c => c.id === selectedCand);

    return (
        <div className="absolute inset-0 flex flex-col bg-surface-50 p-6 overflow-hidden">
            <div className="mb-6 shrink-0">
                <h3 className="text-surface-900 font-bold text-lg">Identity Resolution</h3>
                <p className="text-surface-500 text-sm">Target Entity: <span className="font-bold text-brand-600">{mockIdentityResolution.target}</span></p>
            </div>

            <div className="flex flex-1 gap-6 overflow-hidden">
                {/* Candidates List */}
                <div className="w-1/3 flex flex-col gap-3 overflow-y-auto pr-2">
                    {mockIdentityResolution.candidates.map(cand => (
                        <div 
                            key={cand.id}
                            onClick={() => setSelectedCand(cand.id)}
                            className={`p-4 rounded-xl border cursor-pointer transition ${
                                selectedCand === cand.id 
                                    ? 'bg-brand-50 border-brand-300 shadow-sm' 
                                    : 'bg-white border-surface-200 hover:border-surface-300 hover:shadow-sm'
                            }`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div className="font-bold text-surface-900">{cand.name}</div>
                                <div className={`text-xs font-bold px-2 py-1 rounded ${
                                    cand.confidence > 80 ? 'bg-green-100 text-green-700' :
                                    cand.confidence > 50 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                                }`}>
                                    {cand.confidence}% Match
                                </div>
                            </div>
                            <div className="text-xs text-surface-500">Source: {cand.source}</div>
                        </div>
                    ))}
                </div>

                {/* Comparison Panel */}
                {activeCand && (
                    <div className="flex-1 bg-white rounded-xl border border-surface-200 shadow-sm flex flex-col overflow-hidden">
                        <div className="p-4 border-b border-surface-200 bg-surface-50 flex justify-between items-center">
                            <h4 className="font-bold text-surface-900">Entity Comparison</h4>
                            <span className="text-xs font-semibold bg-surface-200 text-surface-700 px-2 py-1 rounded">Confidence: {activeCand.confidence}%</span>
                        </div>
                        <div className="flex-1 p-6 overflow-y-auto">
                            <div className="flex items-center gap-8 justify-center mb-8">
                                <div className="text-center">
                                    <div className="w-16 h-16 rounded-full bg-surface-100 border-2 border-surface-200 flex items-center justify-center text-xl font-bold text-surface-400 mx-auto mb-2">
                                        {mockIdentityResolution.target.charAt(0)}
                                    </div>
                                    <div className="font-bold text-sm text-surface-900">{mockIdentityResolution.target}</div>
                                    <div className="text-xs text-surface-400">Target</div>
                                </div>
                                
                                <div className="flex-1 max-w-[100px] h-0.5 bg-surface-200 relative">
                                    <div className="absolute left-1/2 -top-3 transform -translate-x-1/2 bg-white px-2 text-xs font-bold text-surface-400">VS</div>
                                </div>

                                <div className="text-center">
                                    <div className="w-16 h-16 rounded-full bg-brand-100 border-2 border-brand-200 flex items-center justify-center text-xl font-bold text-brand-600 mx-auto mb-2">
                                        {activeCand.name.charAt(0)}
                                    </div>
                                    <div className="font-bold text-sm text-surface-900">{activeCand.name}</div>
                                    <div className="text-xs text-surface-400">{activeCand.source}</div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h5 className="text-xs font-bold uppercase tracking-wider text-green-600 mb-3 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                        Matching Attributes
                                    </h5>
                                    <div className="grid gap-2">
                                        {activeCand.matchingAttributes.map((attr, i) => (
                                            <div key={i} className="bg-green-50 text-green-800 text-sm p-3 rounded border border-green-100">
                                                {attr}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {activeCand.conflictingAttributes.length > 0 && (
                                    <div>
                                        <h5 className="text-xs font-bold uppercase tracking-wider text-red-600 mb-3 flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                            Conflicting Attributes
                                        </h5>
                                        <div className="grid gap-2">
                                            {activeCand.conflictingAttributes.map((attr, i) => (
                                                <div key={i} className="bg-red-50 text-red-800 text-sm p-3 rounded border border-red-100">
                                                    {attr}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
