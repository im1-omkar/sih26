export default function Loader({ label = "Loading..." }: { label?: string }) {
    return (
        <div className="flex items-center gap-2 text-sm text-surface-500">
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-surface-300 border-t-brand-600" />
            {label}
        </div>
    );
}
