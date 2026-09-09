import { useState } from "react";
import { mockTimeline } from "../../../data/mockCaseData";

export default function TimelineView({ onSelect }: { onSelect?: (item: any) => void }) {
    const [filter, setFilter] = useState("all");

    const filtered = filter === "all" 
        ? mockTimeline 
        : mockTimeline.filter(t => t.type === filter);

    const sorted = [...filtered].sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime());

    return (
        <div className="absolute inset-0 flex flex-col bg-surface-50 p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-8 shrink-0">
                <div>
                    <h3 className="text-surface-900 font-bold text-lg">Chronological Event Timeline</h3>
                    <p className="text-surface-500 text-sm">Sequence of mapped activities</p>
                </div>
                <select 
                    className="bg-white border border-surface-200 text-sm rounded-lg px-3 py-2 text-surface-700 shadow-sm outline-none"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">All Events</option>
                    <option value="incident">Incidents</option>
                    <option value="financial">Financial</option>
                    <option value="communication">Communication</option>
                    <option value="movement">Movement</option>
                </select>
            </div>

            <div className="relative border-l-2 border-brand-200 ml-4 pl-8 flex-1">
                {sorted.map((event, i) => (
                    <div key={event.id} className={`relative mb-8 ${i === sorted.length - 1 ? 'mb-0' : ''}`}>
                        {/* Timeline Dot */}
                        <div className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full bg-white border-4 border-brand-500 shadow-sm z-10" />
                        <div 
                            className="bg-white rounded-xl border border-surface-200 shadow-sm p-4 hover:shadow-md transition cursor-pointer hover:border-brand-300"
                            onClick={() => onSelect && onSelect({
                                id: event.id,
                                label: event.description,
                                type: event.type,
                                confidence: event.confidence,
                                details: {
                                    date: event.date,
                                    time: event.time,
                                    entity: event.entity,
                                    location: event.location,
                                    ...(event as any).details
                                }
                            })}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2 py-1 rounded">
                                        {event.type}
                                    </span>
                                    <span className="text-sm font-semibold text-surface-900">{event.entity}</span>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-surface-700">{event.date}</div>
                                    <div className="text-xs font-mono text-surface-400">{event.time}</div>
                                </div>
                            </div>
                            <p className="text-surface-700 text-sm leading-relaxed mb-3">
                                {event.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs border-t border-surface-100 pt-3">
                                <div className="flex items-center gap-1.5 text-surface-500">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                                    {event.location}
                                </div>
                                <div className="flex items-center gap-1.5 text-surface-500">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    Confidence: {(event.confidence * 100).toFixed(0)}%
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
