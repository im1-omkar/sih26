import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Clock, Map, Activity, Network } from "lucide-react";

const sections = [
    {
        id: "timeline",
        title: "Chronological Timeline",
        desc: "See events as they happened. AI extracts dates from FIRs, CDRs, and bank logs to build an automated, unbroken chain of events.",
        color: "bg-surface-900 text-white",
        icon: <Clock className="w-10 h-10 text-white" />,
        visual: <TimelineVisual />
    },
    {
        id: "geo",
        title: "Geospatial Intelligence",
        desc: "Visualize movement patterns. Overlay CDR tower pings, transaction locations, and CCTV sightings on interactive maps.",
        color: "bg-amber-500 text-amber-950",
        icon: <Map className="w-10 h-10 text-amber-950" />,
        visual: <GeoVisual />
    },
    {
        id: "finance",
        title: "Financial Tracing",
        desc: "Follow the money. Automatically parse thousands of bank statement rows to uncover hidden shell accounts and layering tactics.",
        color: "bg-emerald-600 text-white",
        icon: <Activity className="w-10 h-10 text-white" />,
        visual: <FinanceVisual />
    },
    {
        id: "graph",
        title: "Entity Graphing",
        desc: "Discover hidden networks. Our Graph Neural Network automatically links aliases, shared addresses, and communication clusters.",
        color: "bg-purple-600 text-white",
        icon: <Network className="w-10 h-10 text-white" />,
        visual: <GraphVisual />
    }
];

export function LandingIntelligence() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: targetRef });
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]); // 4 sections = -75%

    return (
        <section ref={targetRef} className="relative h-[400vh] bg-surface-50">
            <div className="sticky top-0 h-screen overflow-hidden flex items-center">
                <motion.div style={{ x }} className="flex w-[400vw] h-full">
                    {sections.map((sec, i) => (
                        <div key={i} className={`w-[100vw] h-full flex flex-col lg:flex-row items-center p-8 lg:p-24 ${sec.color}`}>
                            <div className="w-full lg:w-1/2 pr-0 lg:pr-20 mb-12 lg:mb-0">
                                <div className="mb-8">{sec.icon}</div>
                                <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-[1.1]">{sec.title}</h2>
                                <p className="text-xl md:text-3xl opacity-80 leading-relaxed font-medium max-w-2xl">{sec.desc}</p>
                            </div>
                            <div className="w-full lg:w-1/2 h-[50vh] lg:h-[80vh] relative flex items-center justify-center">
                                {sec.visual}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

// --- VISUALS ---

function TimelineVisual() {
    return (
        <div className="relative w-full h-full max-w-lg bg-surface-800 rounded-3xl p-8 border border-surface-700 shadow-2xl flex flex-col justify-center overflow-hidden">
            <div className="absolute left-12 top-0 bottom-0 w-1 bg-surface-700" />
            
            <div className="space-y-12 relative z-10">
                <motion.div initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="flex items-center gap-6">
                    <div className="w-4 h-4 rounded-full bg-brand-500 shadow-[0_0_0_4px_rgba(59,130,246,0.2)]" />
                    <div className="flex-1 bg-surface-900 p-4 rounded-xl border border-surface-700">
                        <div className="text-xs text-brand-400 font-bold mb-1">14 Aug 2026, 09:30</div>
                        <div className="text-white font-bold">Fraud Reported</div>
                    </div>
                </motion.div>
                
                <motion.div initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="flex items-center gap-6">
                    <div className="w-4 h-4 rounded-full bg-amber-500 shadow-[0_0_0_4px_rgba(245,158,11,0.2)]" />
                    <div className="flex-1 bg-surface-900 p-4 rounded-xl border border-surface-700">
                        <div className="text-xs text-amber-400 font-bold mb-1">14 Aug 2026, 11:15</div>
                        <div className="text-white font-bold">Funds Wired to Overseas</div>
                    </div>
                </motion.div>

                <motion.div initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="flex items-center gap-6">
                    <div className="w-4 h-4 rounded-full bg-rose-500 shadow-[0_0_0_4px_rgba(244,63,94,0.2)]" />
                    <div className="flex-1 bg-surface-900 p-4 rounded-xl border border-surface-700">
                        <div className="text-xs text-rose-400 font-bold mb-1">15 Aug 2026, 14:20</div>
                        <div className="text-white font-bold">Suspect Device Pinged</div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

function GeoVisual() {
    return (
        <div className="relative w-full h-full max-w-xl bg-amber-400 rounded-3xl p-2 shadow-2xl overflow-hidden border border-amber-300">
            {/* Fake Map background */}
            <div className="absolute inset-0 bg-amber-200/50 [background-size:30px_30px] bg-[linear-gradient(to_right,rgba(255,255,255,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.3)_1px,transparent_1px)]" />
            
            {/* SVG Path representing movement */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <motion.path 
                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeInOut" }}
                    d="M 20 80 Q 40 50 50 30 T 80 20" fill="none" stroke="#78350f" strokeWidth="1.5" strokeDasharray="3 3"
                />
            </svg>

            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.5 }} className="absolute top-[80%] left-[20%] -translate-x-1/2 -translate-y-1/2">
                <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center border-2 border-amber-900">
                    <div className="w-2 h-2 rounded-full bg-amber-900" />
                </div>
                <div className="mt-2 bg-amber-950 text-amber-50 text-[10px] px-2 py-1 rounded font-bold whitespace-nowrap">Point A (ATM)</div>
            </motion.div>

            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 2 }} className="absolute top-[20%] left-[80%] -translate-x-1/2 -translate-y-1/2">
                <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center border-2 border-white shadow-lg shadow-rose-900/50 text-white">
                    <Map className="w-4 h-4" />
                </div>
                <div className="mt-2 bg-amber-950 text-amber-50 text-[10px] px-2 py-1 rounded font-bold whitespace-nowrap">Suspect Hideout</div>
            </motion.div>
        </div>
    );
}

function FinanceVisual() {
    return (
        <div className="relative w-full h-full max-w-xl bg-emerald-950 rounded-3xl p-8 border border-emerald-800 shadow-2xl flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M 30 50 Q 50 30 70 50" fill="none" stroke="#34d399" strokeWidth="0.5" />
                <path d="M 30 50 Q 50 70 70 50" fill="none" stroke="#34d399" strokeWidth="0.5" />
                <path d="M 10 50 L 30 50" fill="none" stroke="#34d399" strokeWidth="0.5" />
                <path d="M 70 50 L 90 50" fill="none" stroke="#34d399" strokeWidth="0.5" />
            </svg>

            <div className="relative z-10 w-full flex justify-between items-center">
                <div className="bg-emerald-900 p-4 rounded-xl border border-emerald-700 text-center">
                    <div className="text-xs text-emerald-400 font-bold mb-1">Source Account</div>
                    <div className="text-white font-mono text-sm">**** 4402</div>
                </div>

                <motion.div animate={{ x: [-10, 10, -10] }} transition={{ duration: 2, repeat: Infinity }} className="bg-emerald-800 px-3 py-1 rounded-full text-emerald-300 text-sm font-bold border border-emerald-600 shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                    ₹ 4,80,000
                </motion.div>

                <div className="bg-emerald-900 p-4 rounded-xl border border-emerald-700 text-center">
                    <div className="text-xs text-emerald-400 font-bold mb-1">Target Account</div>
                    <div className="text-white font-mono text-sm">Crypto Exch</div>
                </div>
            </div>
        </div>
    );
}

function GraphVisual() {
    return (
        <div className="relative w-full h-full max-w-xl bg-purple-950 rounded-3xl border border-purple-800 shadow-2xl overflow-hidden">
            <svg className="absolute inset-0 w-full h-full opacity-40">
                <line x1="20%" y1="20%" x2="50%" y2="50%" stroke="#a855f7" strokeWidth="2" />
                <line x1="80%" y1="20%" x2="50%" y2="50%" stroke="#a855f7" strokeWidth="2" />
                <line x1="50%" y1="80%" x2="50%" y2="50%" stroke="#a855f7" strokeWidth="2" />
                <line x1="20%" y1="80%" x2="50%" y2="50%" stroke="#a855f7" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="80%" y1="80%" x2="50%" y2="50%" stroke="#f43f5e" strokeWidth="2" />
            </svg>

            {/* Nodes */}
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center border-4 border-purple-900 shadow-[0_0_30px_rgba(168,85,247,0.5)] z-10 text-white font-bold text-xl">
                R
            </motion.div>

            <div className="absolute top-[20%] left-[20%] -translate-x-1/2 -translate-y-1/2 bg-surface-900 p-2 rounded border border-surface-700 text-white text-xs font-bold">Alias 1</div>
            <div className="absolute top-[20%] left-[80%] -translate-x-1/2 -translate-y-1/2 bg-surface-900 p-2 rounded border border-surface-700 text-white text-xs font-bold">Alias 2</div>
            <div className="absolute top-[80%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-surface-900 p-2 rounded border border-surface-700 text-white text-xs font-bold">Phone No.</div>
            
            <div className="absolute top-[80%] left-[80%] -translate-x-1/2 -translate-y-1/2 bg-rose-900 p-2 rounded border border-rose-700 text-rose-100 text-xs font-bold shadow-[0_0_15px_rgba(244,63,94,0.5)]">Known Accomplice</div>
        </div>
    );
}
