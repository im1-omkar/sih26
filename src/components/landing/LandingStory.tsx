import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function LandingBeforeAfter() {
    return (
        <section className="py-32 bg-white text-center">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl md:text-6xl font-black text-surface-900 mb-16">The paradigm shift.</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Before */}
                    <div className="bg-surface-50 p-12 rounded-3xl border border-surface-200">
                        <div className="text-surface-400 font-bold uppercase tracking-widest mb-8">Before</div>
                        <ul className="space-y-6 text-left max-w-sm mx-auto">
                            <li className="flex items-center gap-4 text-surface-600 font-medium text-lg"><div className="w-2 h-2 bg-rose-500 rounded-full" /> Multiple disconnected spreadsheets</li>
                            <li className="flex items-center gap-4 text-surface-600 font-medium text-lg"><div className="w-2 h-2 bg-rose-500 rounded-full" /> Manual entity cross-referencing</li>
                            <li className="flex items-center gap-4 text-surface-600 font-medium text-lg"><div className="w-2 h-2 bg-rose-500 rounded-full" /> Lost relationships in complex cases</li>
                            <li className="flex items-center gap-4 text-surface-600 font-medium text-lg"><div className="w-2 h-2 bg-rose-500 rounded-full" /> Days spent parsing bank statements</li>
                        </ul>
                    </div>

                    {/* After */}
                    <div className="bg-brand-50 p-12 rounded-3xl border border-brand-200 shadow-xl shadow-brand-500/10">
                        <div className="text-brand-600 font-bold uppercase tracking-widest mb-8">With Nexus OS</div>
                        <ul className="space-y-6 text-left max-w-sm mx-auto">
                            <li className="flex items-center gap-4 text-brand-900 font-bold text-lg"><div className="w-2 h-2 bg-brand-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" /> Unified intelligent workspace</li>
                            <li className="flex items-center gap-4 text-brand-900 font-bold text-lg"><div className="w-2 h-2 bg-brand-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" /> Automated AI entity resolution</li>
                            <li className="flex items-center gap-4 text-brand-900 font-bold text-lg"><div className="w-2 h-2 bg-brand-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" /> Interactive 3D relationship graphs</li>
                            <li className="flex items-center gap-4 text-brand-900 font-bold text-lg"><div className="w-2 h-2 bg-brand-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" /> Instant financial tracing</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function LandingFooter() {
    return (
        <footer className="bg-surface-950 pt-32 pb-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_70%)] pointer-events-none" />
            
            <div className="max-w-5xl mx-auto px-6 relative z-10 text-center mb-32">
                <motion.h2 
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8"
                >
                    Ready to solve?
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                    className="text-2xl text-surface-400 mb-12 max-w-2xl mx-auto"
                >
                    Stop drowning in paperwork. Let the AI connect the dots so you can close the case.
                </motion.p>

                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                    <Link to="/dashboard" className="inline-flex items-center justify-center gap-3 bg-white text-surface-900 px-12 py-6 rounded-full text-2xl font-bold transition-all hover:bg-brand-50 hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(59,130,246,0.4)]">
                        Launch Nexus OS <ArrowRight className="w-8 h-8" />
                    </Link>
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-6 border-t border-surface-800 pt-12 flex flex-col md:flex-row justify-between items-center text-surface-500">
                <div className="font-bold tracking-widest uppercase text-sm mb-4 md:mb-0 text-white">
                    Nexus OS
                </div>
                <div className="text-sm">
                    Built for Smart India Hackathon 2026 (PS-189). Mock Data Demo.
                </div>
            </div>
        </footer>
    );
}
