import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-zinc-950 text-white">
            <div className="text-center">
                <p className="text-7xl font-bold text-zinc-700">404</p>

                <h1 className="mt-4 text-2xl font-semibold">
                    Page not found
                </h1>

                <p className="mt-2 text-zinc-500">
                    The page you are looking for doesn't exist.
                </p>

                <Link
                    to="/"
                    className="mt-8 inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800"
                >
                    ← Back to home
                </Link>
            </div>
        </div>
    );
}