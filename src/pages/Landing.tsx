import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroScene = lazy(() => import("../components/landing/HeroScene"));

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
    }),
};

const features = [
    {
        icon: (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" /></svg>
        ),
        title: "Smart Upload",
        desc: "Upload documents with presigned URLs. Automatic validation and status tracking throughout the lifecycle.",
    },
    {
        icon: (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
        ),
        title: "Entity Extraction",
        desc: "Automatically extract people, organizations, accounts, and transactions from uploaded documents.",
    },
    {
        icon: (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m9.586-3.828a4.5 4.5 0 0 0-1.242-7.244l-4.5-4.5a4.5 4.5 0 0 0-6.364 6.364l1.757 1.757" /></svg>
        ),
        title: "Relationship Graphs",
        desc: "Visualize connections between entities with interactive knowledge graphs. Discover hidden patterns.",
    },
];

export default function Landing() {
    return (
        <div className="min-h-screen bg-surface-0 font-sans text-surface-900">
            {/* ── Nav ─────────────────────────────────── */}
            <nav className="relative z-20 mx-auto flex h-20 max-w-[1200px] items-center justify-between px-6">
                <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
                        <svg className="h-4.5 w-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-surface-900">DocManager</span>
                </div>
                <div className="flex items-center gap-6">
                    <a href="#features" className="hidden text-sm font-semibold text-surface-700 transition hover:text-brand-600 sm:block">Features</a>
                    <Link
                        to="/dashboard"
                        className="rounded bg-brand-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-700"
                    >
                        Try it free
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
                            Move fast, stay aligned, and build better <span className="text-brand-600">document graphs.</span>
                        </motion.h1>

                        <motion.p
                            initial="hidden"
                            animate="visible"
                            variants={fadeUp}
                            custom={1}
                            className="mt-6 text-lg leading-relaxed text-surface-700 sm:text-xl"
                        >
                            The #1 document intelligence tool used by teams to extract entities, map relationships, and manage cases with precision.
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
                                Get it free
                            </Link>
                            <a
                                href="#features"
                                className="flex items-center gap-2 text-base font-semibold text-surface-700 transition hover:text-brand-600"
                            >
                                Explore features
                                <span aria-hidden="true">→</span>
                            </a>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                        className="mt-16 lg:mt-0 lg:w-1/2"
                    >
                        <div className="relative rounded-2xl bg-white shadow-2xl ring-1 ring-surface-200/50">
                            {/* Dummy Image for Dashboard */}
                            <img
                                src="https://placehold.co/1200x800/f8fafc/1e293b?text=DocManager+Dashboard+Graph&font=roboto"
                                alt="DocManager Dashboard Mockup"
                                className="w-full rounded-2xl object-cover"
                            />
                            {/* Decorative elements to look like a floating UI card */}
                            <div className="absolute -left-8 top-1/4 hidden rounded-lg border border-surface-200 bg-white p-4 shadow-lg sm:block w-48">
                                <div className="mb-2 flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold">R</div>
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

            {/* ── Features ────────────────────────────── */}
            <section id="features" className="py-24 bg-surface-50">
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
                            All your documents. All in one place.
                        </h2>
                        <p className="mt-4 text-lg text-surface-600">
                            Plan, track, and manage all your investigative work with a single, highly visual source of truth.
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
            
            {/* ── Secondary Screenshot Section ───────────────── */}
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
                                src="https://placehold.co/1000x800/eff6ff/1d4ed8?text=Entity+Extraction+Pipeline&font=roboto"
                                alt="Entity Extraction Flow"
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
                            Connect the dots seamlessly
                        </h2>
                        <p className="mt-6 text-lg leading-relaxed text-surface-600">
                            Every document you upload is automatically processed. We extract key entities—people, organizations, transactions—and build a living network graph. Focus on the insights, not the manual data entry.
                        </p>
                        <ul className="mt-8 space-y-4">
                            <li className="flex items-start gap-3">
                                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-surface-900">Automated processing</h4>
                                    <p className="text-surface-600">Presigned S3 uploads trigger immediate analysis.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-surface-900">Visual discovery</h4>
                                    <p className="text-surface-600">Interactive D3 force graphs make hidden links obvious.</p>
                                </div>
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </section>

            {/* ── CTA ─────────────────────────────────── */}
            <section className="bg-brand-600 py-20 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,transparent_100%)]"></div>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={0}
                    className="relative z-10 mx-auto max-w-3xl px-6"
                >
                    <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                        Join the teams building the future
                    </h2>
                    <p className="mt-6 text-xl text-brand-100">
                        Get started with DocManager today and revolutionize your workflow.
                    </p>
                    <Link
                        to="/dashboard"
                        className="mt-8 inline-block rounded bg-white px-8 py-3.5 text-base font-bold text-brand-600 shadow-md transition hover:bg-surface-50"
                    >
                        Get it free
                    </Link>
                </motion.div>
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
                        <span className="text-sm font-semibold text-white">DocManager</span>
                    </div>
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} DocManager Platform.
                    </p>
                </div>
            </footer>
        </div>
    );
}