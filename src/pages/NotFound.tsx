import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-surface-50">
            <div className="text-center">
                <h1 className="text-6xl font-extrabold text-surface-300">404</h1>
                <p className="mt-3 text-lg font-bold text-surface-800">Page not found</p>
                <p className="mt-2 text-sm text-surface-500">
                    The page you're looking for doesn't exist.
                </p>
                <Link
                    to="/"
                    className="mt-6 inline-block rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}