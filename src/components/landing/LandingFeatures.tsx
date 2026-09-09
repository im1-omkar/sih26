import { motion } from "framer-motion";
import { Shield, Brain, LineChart, FileSearch, HardDrive, Network } from "lucide-react";

export function LandingAnalytics() {
    return (
        <section className="py-32 bg-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.1),transparent_50%)]" />
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-black text-surface-900 mb-6 leading-tight">
                            Scale your <br/> investigations.
                        </h2>
                        <p className="text-xl text-surface-600 mb-12">
                            Process millions of rows of telecom data and thousands of bank transactions in seconds. The platform automatically flags anomalies and generates live statistics.
                        </p>
                        
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <div className="text-5xl font-black text-brand-600 mb-2">10M+</div>
                                <div className="text-surface-500 font-bold">Records Processed</div>
                            </div>
                            <div>
                                <div className="text-5xl font-black text-emerald-600 mb-2">99.8%</div>
                                <div className="text-surface-500 font-bold">Entity Resolution Accuracy</div>
                            </div>
                            <div>
                                <div className="text-5xl font-black text-purple-600 mb-2">&lt;2s</div>
                                <div className="text-surface-500 font-bold">Query Response Time</div>
                            </div>
                            <div>
                                <div className="text-5xl font-black text-amber-600 mb-2">256-bit</div>
                                <div className="text-surface-500 font-bold">End-to-end Encryption</div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-brand-500 rounded-3xl rotate-3 scale-105 opacity-10" />
                        <div className="relative bg-surface-900 rounded-3xl p-8 shadow-2xl text-white">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><LineChart className="text-brand-400"/> Live Case Telemetry</h3>
                            
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-sm mb-2"><span className="text-surface-400">Suspicious Transactions</span><span className="font-bold text-rose-400">High Risk</span></div>
                                    <div className="h-3 w-full bg-surface-800 rounded-full overflow-hidden">
                                        <motion.div initial={{ width: 0 }} whileInView={{ width: "75%" }} transition={{ duration: 1.5 }} className="h-full bg-rose-500" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-2"><span className="text-surface-400">Entity Relationships Mapped</span><span className="font-bold text-emerald-400">1,284 Nodes</span></div>
                                    <div className="h-3 w-full bg-surface-800 rounded-full overflow-hidden">
                                        <motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }} transition={{ duration: 2 }} className="h-full bg-emerald-500" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-2"><span className="text-surface-400">Document Processing Queue</span><span className="font-bold text-brand-400">Complete</span></div>
                                    <div className="h-3 w-full bg-surface-800 rounded-full overflow-hidden">
                                        <motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }} transition={{ duration: 1 }} className="h-full bg-brand-500" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function LandingUseCases() {
    const cases = [
        { title: "Financial Fraud", desc: "Trace multi-layered money laundering through shell accounts.", icon: <HardDrive className="text-emerald-500"/> },
        { title: "Organized Crime", desc: "Map hierarchies and communication networks of syndicates.", icon: <Network className="text-purple-500"/> },
        { title: "Cyber Crime", desc: "Analyze digital footprints, IPs, and crypto ledgers.", icon: <Brain className="text-blue-500"/> },
        { title: "Missing Persons", desc: "Correlate last known locations, CCTV, and phone pings.", icon: <FileSearch className="text-amber-500"/> },
    ];

    return (
        <section className="py-32 bg-surface-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-black text-surface-900 mb-4">Adaptable to any investigation</h2>
                    <p className="text-xl text-surface-600">Built for specialized intelligence units.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cases.map((c, i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-surface-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-surface-50 border border-surface-100 flex items-center justify-center mb-6">
                                {c.icon}
                            </div>
                            <h3 className="text-xl font-bold text-surface-900 mb-3">{c.title}</h3>
                            <p className="text-surface-600 leading-relaxed">{c.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function LandingSecurity() {
    return (
        <section className="py-32 bg-surface-950 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.1),transparent_50%)]" />
            <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">
                <div className="w-full md:w-1/2">
                    <div className="relative w-full aspect-square max-w-md mx-auto">
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-2 border-dashed border-emerald-500/30 rounded-full" />
                        <motion.div animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute inset-8 border border-emerald-500/20 rounded-full" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Shield className="w-32 h-32 text-emerald-500" strokeWidth={1} />
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-0 left-1/2 -translate-x-1/2 bg-surface-900 border border-emerald-500/50 text-emerald-400 px-4 py-2 rounded-full text-xs font-bold shadow-[0_0_20px_rgba(16,185,129,0.2)]">AES-256 Encrypted</motion.div>
                            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }} className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-surface-900 border border-emerald-500/50 text-emerald-400 px-4 py-2 rounded-full text-xs font-bold shadow-[0_0_20px_rgba(16,185,129,0.2)]">Audit Logged</motion.div>
                            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 4, repeat: Infinity, delay: 2 }} className="absolute top-1/2 -left-12 -translate-y-1/2 bg-surface-900 border border-emerald-500/50 text-emerald-400 px-4 py-2 rounded-full text-xs font-bold shadow-[0_0_20px_rgba(16,185,129,0.2)]">Role Based Access</motion.div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2">
                    <h2 className="text-4xl md:text-5xl font-black mb-6">Military-Grade Security Architecture</h2>
                    <p className="text-xl text-surface-400 mb-8">
                        Chain of custody is everything. Every action, upload, and AI query is cryptographically logged to ensure evidence integrity holds up in court.
                    </p>
                    <ul className="space-y-4">
                        {["Strict Role-Based Access Control (RBAC)", "Immutable Audit Trails", "Air-gapped deployment ready", "End-to-End Data Encryption"].map((item, i) => (
                            <li key={i} className="flex items-center gap-4">
                                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                                    <Shield className="w-3 h-3" />
                                </div>
                                <span className="font-medium text-surface-200">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
