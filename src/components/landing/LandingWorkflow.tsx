import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { UploadCloud, Link as LinkIcon, Brain, CheckCircle, Search, FileDown } from "lucide-react";

const steps = [
    { title: "Collect", icon: <UploadCloud />, desc: "Ingest unstructured FIRs, call logs, bank statements, and raw intelligence." },
    { title: "Connect", icon: <LinkIcon />, desc: "The platform's ETL pipeline automatically links entities, IDs, and dates." },
    { title: "Analyze", icon: <Brain />, desc: "Graph Neural Networks search for money laundering loops and hidden patterns." },
    { title: "Verify", icon: <CheckCircle />, desc: "Investigator reviews high-confidence links and approves evidence chains." },
    { title: "Discover", icon: <Search />, desc: "Spatial and chronological visualizers expose the truth." },
    { title: "Report", icon: <FileDown />, desc: "Generate court-ready comprehensive PDFs with full audit trails." }
];

export function LandingWorkflow() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    return (
        <section ref={containerRef} className="py-32 bg-surface-950 text-white relative">
            <div className="max-w-5xl mx-auto px-6">
                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-6xl font-black mb-6">The Investigation Workflow</h2>
                    <p className="text-xl text-surface-400">A seamless pipeline from raw data to conviction.</p>
                </div>

                <div className="relative">
                    {/* Progress Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-surface-800 -translate-x-1/2" />
                    <motion.div 
                        className="absolute left-1/2 top-0 w-1 bg-gradient-to-b from-brand-500 to-purple-500 -translate-x-1/2 origin-top"
                        style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
                    />

                    <div className="space-y-32">
                        {steps.map((step, i) => {
                            const isEven = i % 2 === 0;
                            return (
                                <div key={i} className={`flex items-center justify-between w-full relative ${isEven ? 'flex-row-reverse' : ''}`}>
                                    <div className="w-5/12" />
                                    
                                    <div className="absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl bg-surface-900 border-2 border-surface-700 flex items-center justify-center text-brand-400 z-10 shadow-xl">
                                        {step.icon}
                                    </div>
                                    
                                    <motion.div 
                                        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        className={`w-5/12 ${isEven ? 'text-right' : 'text-left'}`}
                                    >
                                        <h3 className="text-3xl font-bold mb-4">{step.title}</h3>
                                        <p className="text-lg text-surface-400 leading-relaxed">{step.desc}</p>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
