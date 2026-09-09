import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FileText, Map, Phone, FileSpreadsheet } from "lucide-react";

export function LandingProblem() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // We want elements to start scattered (far out) and move to center
    const x1 = useTransform(scrollYProgress, [0.2, 0.5], [-500, 0]);
    const y1 = useTransform(scrollYProgress, [0.2, 0.5], [-300, 0]);
    
    const x2 = useTransform(scrollYProgress, [0.2, 0.5], [500, 0]);
    const y2 = useTransform(scrollYProgress, [0.2, 0.5], [-200, 0]);
    
    const x3 = useTransform(scrollYProgress, [0.2, 0.5], [-400, 0]);
    const y3 = useTransform(scrollYProgress, [0.2, 0.5], [300, 0]);
    
    const x4 = useTransform(scrollYProgress, [0.2, 0.5], [400, 0]);
    const y4 = useTransform(scrollYProgress, [0.2, 0.5], [300, 0]);

    const opacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
    const scale = useTransform(scrollYProgress, [0.5, 0.8], [1, 5]);
    const fadeOut = useTransform(scrollYProgress, [0.6, 0.8], [1, 0]);

    return (
        <section ref={containerRef} className="py-48 bg-white relative overflow-hidden h-[150vh]">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
                
                <motion.div style={{ opacity: fadeOut }} className="text-center z-30 mb-20">
                    <h2 className="text-4xl md:text-6xl font-black text-surface-900 tracking-tight max-w-4xl mx-auto leading-tight">
                        Investigations take weeks. <br/>
                        <span className="text-surface-400">Data is fragmented. Evidence is buried.</span>
                    </h2>
                </motion.div>

                <div className="relative w-full max-w-5xl h-[600px] flex items-center justify-center">
                    
                    {/* Fragment 1 */}
                    <motion.div style={{ x: x1, y: y1, opacity: fadeOut }} className="absolute z-10 w-64 p-4 bg-surface-50 border border-surface-200 rounded-xl shadow-lg -rotate-6">
                        <div className="flex items-center gap-3 mb-3 border-b border-surface-200 pb-2">
                            <FileSpreadsheet className="text-emerald-600" />
                            <div className="font-bold text-surface-900">Bank Statement.csv</div>
                        </div>
                        <div className="space-y-2">
                            <div className="h-2 w-full bg-surface-200 rounded" />
                            <div className="h-2 w-3/4 bg-surface-200 rounded" />
                            <div className="h-2 w-5/6 bg-emerald-200 rounded" />
                        </div>
                    </motion.div>

                    {/* Fragment 2 */}
                    <motion.div style={{ x: x2, y: y2, opacity: fadeOut }} className="absolute z-10 w-56 p-4 bg-surface-50 border border-surface-200 rounded-xl shadow-lg rotate-6">
                        <div className="flex items-center gap-3 mb-3 border-b border-surface-200 pb-2">
                            <Phone className="text-blue-600" />
                            <div className="font-bold text-surface-900">CDR Dump_Aug.txt</div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between"><span className="text-xs text-surface-500">Duration</span><span className="text-xs font-bold">14m 22s</span></div>
                            <div className="flex justify-between"><span className="text-xs text-surface-500">Cell Tower</span><span className="text-xs font-bold">Sector 44</span></div>
                        </div>
                    </motion.div>

                    {/* Fragment 3 */}
                    <motion.div style={{ x: x3, y: y3, opacity: fadeOut }} className="absolute z-10 w-60 p-4 bg-surface-50 border border-surface-200 rounded-xl shadow-lg rotate-3">
                        <div className="flex items-center gap-3 mb-3 border-b border-surface-200 pb-2">
                            <FileText className="text-amber-600" />
                            <div className="font-bold text-surface-900">FIR_Copy_22.pdf</div>
                        </div>
                        <div className="text-xs text-surface-600 line-clamp-3">
                            "The suspect was last seen entering the premises of a shell corporation registered under..."
                        </div>
                    </motion.div>

                    {/* Fragment 4 */}
                    <motion.div style={{ x: x4, y: y4, opacity: fadeOut }} className="absolute z-10 w-48 p-4 bg-surface-50 border border-surface-200 rounded-xl shadow-lg -rotate-12">
                        <div className="flex items-center gap-3 mb-3 border-b border-surface-200 pb-2">
                            <Map className="text-purple-600" />
                            <div className="font-bold text-surface-900">GPS Log</div>
                        </div>
                        <div className="w-full h-20 bg-surface-200 rounded flex items-center justify-center">
                            <div className="w-3 h-3 bg-purple-500 rounded-full shadow-[0_0_0_4px_rgba(168,85,247,0.2)]" />
                        </div>
                    </motion.div>

                    {/* Center Unified Node */}
                    <motion.div style={{ opacity }} className="absolute z-20 w-32 h-32 bg-brand-600 rounded-full flex items-center justify-center shadow-2xl shadow-brand-500/50 text-white font-black text-2xl tracking-tighter">
                        Nexus
                    </motion.div>

                    {/* Full screen expanding flash */}
                    <motion.div style={{ scale, opacity: opacity }} className="absolute z-0 w-32 h-32 bg-brand-50 rounded-full" />
                </div>

            </div>
        </section>
    );
}
