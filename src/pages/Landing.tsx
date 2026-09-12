import { lazy, Suspense, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import dashboardImage from "../assets/dashboard.png";
import graphImage from "../assets/graph.png";

const HeroScene = lazy(() => import("../components/landing/HeroScene.tsx"));

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
    }),
};

const agencies = [
    { name: "CBI", logo: "https://www.uxdt.nic.in/wp-content/uploads/2020/06/Preview-10.png" },
    { name: "Police", logo: "https://static.toiimg.com/thumb/msid-75646130,width-1280,height-720,resizemode-72/75646130.jpg" },
    { name: "Cyber Crime Department", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC6yJg0sRArBXtZJY31pwvBj_lZO0Fz_cCxqFjeYAYniiewLPKPa70rnY&s=10" },
    { name: "Intelligence Bureau", logo: "https://static.india.com/wp-content/uploads/2018/03/intelligence-bureau.jpg?impolicy=Medium_Resize&w=1200&h=800" },
    { name: "Financial Intelligence Unit", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/42/Financial_Intelligence_Unit%E2%80%94India_Logo.svg/1280px-Financial_Intelligence_Unit%E2%80%94India_Logo.svg.png?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=thumbnail" },
    { name: "Interpol", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa0YiAEL8rFwAGXWTjrfFeh6pPvwXAlfhxlKNqlr6BGg&s" },
];

const features = [
    {
        icon: (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" /></svg>
        ),
        title: "Evidentiary Data Ingestion",
        desc: "Securely upload and parse unstructured Call Detail Records (CDRs), financial ledgers, and FIRs maintaining strict cryptographic chain of custody.",
    },
    {
        icon: (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
        ),
        title: "Threat Actor Profiling",
        desc: "Automatically correlate identifiers across datasets to build comprehensive profiles of suspects, alias networks, and associated vehicles.",
    },
    {
        icon: (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m9.586-3.828a4.5 4.5 0 0 0-1.242-7.244l-4.5-4.5a4.5 4.5 0 0 0-6.364 6.364l1.757 1.757" /></svg>
        ),
        title: "Forensic Link Analysis",
        desc: "Deploy advanced Graph Neural Networks to expose hidden syndicate hierarchies, money laundering loops, and illicit communication hubs.",
    },
];

export default function Landing() {
    useEffect(() => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.onload = () => {
            if ((window as any).voiceflow) {
                (window as any).voiceflow.chat.load({
                    verify: { projectID: '6aa244d58daada4dbce49a3e' },
                    url: 'https://general-runtime.voiceflow.com',
                    voice: {
                        url: "https://runtime-api.voiceflow.com"
                    }
                });
            }
        };
        script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);
    return (
        <div className="min-h-screen bg-surface-0 font-sans text-surface-900">
            {/* ── Nav ─────────────────────────────────── */}
            <nav className="relative z-20 mx-auto flex h-20 max-w-[1200px] items-center justify-between px-6">
                <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
                        <svg
                            className="h-4.5 w-4.5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="m21 21-4.35-4.35m2.1-5.4a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9.5 11.5a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0Z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7.5 17.5c.8-1.4 2.1-2.2 4.5-2.2s3.7.8 4.5 2.2"
                            />
                        </svg>
                    </div>
                    <span className="text-3xl font-bold tracking-tight text-surface-900">AstraX</span>
                </div>
                <div className="flex items-center gap-6">
                    <Link
                        to="/dashboard"
                        className="rounded bg-brand-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-700"
                    >
                        Dashboard
                    </Link>
                </div>
            </nav>

            {/* ── Hero ────────────────────────────────── */}
            <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32 bg-gradient-to-b from-brand-50/50 to-surface-0">
                <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply">
                    <Suspense fallback={null}>
                        <HeroScene />
                    </Suspense>
                </div>

                <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:flex lg:items-center lg:gap-12">
                    <div className="max-w-2xl lg:w-1/2">
                        <motion.h1
                            initial="hidden"
                            animate="visible"
                            variants={fadeUp}
                            custom={0}
                            className="text-4xl font-extrabold leading-[1.1] tracking-tight text-surface-900 sm:text-5xl lg:text-6xl"
                        >
                            Digital Forensics & 
                            
                            <span className="text-brand-600"> Threat Intelligence.</span>
                        </motion.h1>

                        <motion.p
                            initial="hidden"
                            animate="visible"
                            variants={fadeUp}
                            custom={1}
                            className="mt-6 text-lg leading-relaxed text-surface-700 sm:text-xl"
                        >
                            Empowering law enforcement agencies to automatically analyze structured and unstructured crime-related data, map connections, and identify key influencers in criminal organizations.
                        </motion.p>

                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeUp}
                            custom={2}
                            className="mt-8 flex flex-wrap items-center gap-4"
                        >
                            <Link
                                to="/dashboard"
                                className="rounded bg-brand-600 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700"
                            >
                                Enter Dashboard
                            </Link>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                        className="mt-16 lg:mt-0 lg:w-1/2"
                    >
                        <div className="relative rounded-2xl bg-white shadow-2xl ring-1 ring-surface-200/50">
                            <img
                                src={dashboardImage}
                                alt="Dashboard Mockup"
                                className="w-full rounded-2xl object-cover"
                            />

                            {/* Decorative elements */}
                            <div className="absolute -left-8 top-1/4 hidden rounded-lg border border-surface-200 bg-white p-4 shadow-lg sm:block w-48">
                                <div className="mb-2 flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold">Suspect</div>
                                    <div>
                                        <div className="h-2 w-16 rounded bg-surface-200"></div>
                                        <div className="mt-1 h-1.5 w-10 rounded bg-surface-100"></div>
                                    </div>
                                </div>
                                <div className="h-1.5 w-full rounded bg-surface-100 mt-3"></div>
                                <div className="h-1.5 w-2/3 rounded bg-surface-100 mt-1"></div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Marquee (Trusted Agencies) ────────── */}
            <section className="border-y border-surface-200 bg-surface-50 py-8 overflow-hidden">
                <div className="mx-auto max-w-[1200px] px-6 mb-4 text-center">
                    <p className="text-sm font-semibold tracking-wider text-surface-500 uppercase">
                        Integrating data silos across departments
                    </p>
                </div>

                <div className="relative flex w-full overflow-hidden">
                    <div className="animate-marquee flex whitespace-nowrap items-center">
                        {[...agencies, ...agencies, ...agencies].map((agency, i) => (
                            <div
                                key={i}
                                className="mx-8 flex h-14 w-32 shrink-0 items-center justify-center"
                            >
                                <img
                                    src={agency.logo}
                                    alt={agency.name}
                                    title={agency.name}
                                    className="max-h-12 max-w-28 object-contain opacity-60  transition hover:opacity-100 hover:grayscale-0"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── The Problem We Solve ───────────────── */}
            <section className="py-24 bg-white">
                <div className="mx-auto max-w-[1200px] px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        custom={0}
                        className="mb-16 max-w-3xl"
                    >
                        <h2 className="text-3xl font-extrabold tracking-tight text-surface-900 sm:text-4xl">
                            The Challenge of Fragmented Intelligence
                        </h2>
                        <p className="mt-6 text-lg leading-relaxed text-surface-600">
                            Modern criminal activities are increasingly organized and interconnected. Criminals operate through complex networks involving associates, intermediaries, financial channels, and hidden locations.
                        </p>
                        <p className="mt-4 text-lg leading-relaxed text-surface-600">
                            While law enforcement collects vast volumes of data from FIRs, Call Detail Records (CDRs), surveillance, and social media, this intelligence is highly fragmented. Manual analysis is labor-intensive, slow, and prone to missing the critical links that connect the dots.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── Features ────────────────────────────── */}
            <section className="py-24 bg-surface-50">
                <div className="mx-auto max-w-[1200px] px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        custom={0}
                        className="mb-16 text-center max-w-3xl mx-auto"
                    >
                        <h2 className="text-3xl font-extrabold tracking-tight text-surface-900 sm:text-4xl">
                            A unified analytical ecosystem
                        </h2>
                        <p className="mt-4 text-lg text-surface-600">
                            Leveraging AI, Machine Learning, and Graph Analytics to assist investigators in mapping criminal networks.
                        </p>
                    </motion.div>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((f, i) => (
                            <motion.div
                                key={f.title}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                variants={fadeUp}
                                custom={i}
                                className="group rounded-xl bg-white p-8 shadow-sm ring-1 ring-surface-200 transition hover:shadow-md"
                            >
                                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                                    {f.icon}
                                </div>
                                <h3 className="text-xl font-bold text-surface-900">{f.title}</h3>
                                <p className="mt-3 leading-relaxed text-surface-600">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Visual Insights Section ───────────────── */}
            <section className="py-24 bg-white">
                <div className="mx-auto max-w-[1200px] px-6 lg:flex lg:items-center lg:gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="lg:w-1/2"
                    >
                        <div className="overflow-hidden rounded-2xl shadow-xl ring-1 ring-surface-200">
                            <img
                                src={graphImage}
                                alt="Network Graph Visualization"
                                className="w-full object-cover"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        custom={0}
                        className="mt-12 lg:mt-0 lg:w-1/2"
                    >
                        <h2 className="text-3xl font-extrabold tracking-tight text-surface-900 sm:text-4xl">
                            Identify Key Influencers Instantly
                        </h2>
                        <p className="mt-6 text-lg leading-relaxed text-surface-600">
                            Our system doesn't just extract data—it understands it. By detecting suspicious patterns and unusual activities across fragmented datasets, we provide actionable, visual intelligence for active investigations.
                        </p>

                        <ul className="mt-8 space-y-4">
                            <li className="flex items-start gap-3">
                                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-surface-900">Pattern Detection</h4>
                                    <p className="text-surface-600">Flag suspicious transactions and communications automatically.</p>
                                </div>
                            </li>

                            <li className="flex items-start gap-3">
                                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-surface-900">Actionable Intelligence</h4>
                                    <p className="text-surface-600">Generate insights to help dismantle organized networks effectively.</p>
                                </div>
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </section>

            {/* ── Footer ──────────────────────────────── */}
            <footer className="bg-surface-900 py-12 text-surface-400">
                <div className="mx-auto max-w-[1200px] px-6 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center">
                    <div className="flex items-center gap-2 mb-4 sm:mb-0">
                        <div className="flex h-6 w-6 items-center justify-center rounded bg-surface-700">
                            <svg className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                            </svg>
                        </div>
                        <span className="text-sm font-semibold text-white">Nexus OS</span>
                    </div>
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} Advanced Intelligence Platform.
                    </p>
                </div>
            </footer>
        </div>
    );
}

