import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Fingerprint, Map, FileText, Smartphone, Database, Building, CreditCard } from "lucide-react";

export function LandingHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 2]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={containerRef} className="relative h-[200vh] bg-surface-950 overflow-hidden">
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center perspective-2000">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_70%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_40%,transparent_100%)]" />

                <motion.div style={{ opacity }} className="relative z-20 text-center mb-20 px-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-900 border border-surface-700 text-brand-400 text-sm font-bold tracking-widest uppercase mb-8"
                    >
                        <Search className="w-4 h-4" /> Nexus OS Intelligence
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-[0.9]"
                    >
                        Solve the <br/> <span className="text-transparent bg-clip-text bg-gradient-to-br from-brand-400 via-purple-400 to-emerald-400">Invisible.</span>
                    </motion.h1>
                </motion.div>

                {/* 3D Investigation Visualization */}
                <motion.div 
                    style={{ scale, opacity }} 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none transform-style-3d"
                >
                    <motion.div 
                        animate={{ rotateY: 360, rotateX: 10 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="w-full h-full relative transform-style-3d"
                    >
                        {/* Central Case Node */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-surface-900/80 backdrop-blur-xl border border-surface-700 rounded-3xl flex flex-col items-center justify-center shadow-[0_0_100px_rgba(59,130,246,0.3)] z-50">
                            <Database className="w-12 h-12 text-brand-500 mb-2" />
                            <div className="text-xs text-surface-400 font-bold uppercase tracking-widest">Active Case</div>
                            <div className="text-lg font-black text-white">CASE-2026-0147</div>
                        </div>

                        {/* Orbiting Nodes */}
                        <OrbitNode icon={<Fingerprint />} label="Suspect Profile" color="text-purple-400" border="border-purple-500/30" bg="bg-purple-500/10" radius={250} angle={0} />
                        <OrbitNode icon={<Map />} label="Location Ping" color="text-emerald-400" border="border-emerald-500/30" bg="bg-emerald-500/10" radius={320} angle={60} />
                        <OrbitNode icon={<CreditCard />} label="Wire Transfer" color="text-amber-400" border="border-amber-500/30" bg="bg-amber-500/10" radius={280} angle={120} />
                        <OrbitNode icon={<Smartphone />} label="Encrypted Call" color="text-blue-400" border="border-blue-500/30" bg="bg-blue-500/10" radius={350} angle={180} />
                        <OrbitNode icon={<FileText />} label="Bank Statement" color="text-rose-400" border="border-rose-500/30" bg="bg-rose-500/10" radius={260} angle={240} />
                        <OrbitNode icon={<Building />} label="Shell Company" color="text-cyan-400" border="border-cyan-500/30" bg="bg-cyan-500/10" radius={310} angle={300} />

                        {/* Connection Lines (SVG) */}
                        <svg className="absolute inset-0 w-full h-full -z-10">
                            <circle cx="400" cy="400" r="250" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />
                            <circle cx="400" cy="400" r="350" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                            {/* Lines connecting to center - simplified for visual */}
                            <line x1="400" y1="400" x2="650" y2="400" stroke="rgba(168,85,247,0.3)" strokeWidth="2" />
                            <line x1="400" y1="400" x2="260" y2="157" stroke="rgba(59,130,246,0.3)" strokeWidth="2" />
                            <line x1="400" y1="400" x2="260" y2="643" stroke="rgba(244,63,94,0.3)" strokeWidth="2" />
                        </svg>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

function OrbitNode({ icon, label, color, border, bg, radius, angle }: any) {
    const x = Math.cos(angle * (Math.PI / 180)) * radius;
    const y = Math.sin(angle * (Math.PI / 180)) * radius;

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 + (angle/360) }}
            className={`absolute top-1/2 left-1/2 w-40 p-4 rounded-xl backdrop-blur-md border ${border} ${bg} flex flex-col items-center justify-center transform-style-3d`}
            style={{ 
                x: `calc(-50% + ${x}px)`, 
                y: `calc(-50% + ${y}px)`,
                translateZ: `${Math.sin(angle) * 100}px` 
            }}
        >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 bg-surface-900 ${color}`}>
                {icon}
            </div>
            <div className="text-xs font-bold text-white text-center">{label}</div>
        </motion.div>
    );
}
