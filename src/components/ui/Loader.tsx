export default function Loader({ label = "Loading..." }: { label?: string }) {
    return (
        <div className="flex items-center gap-2 text-sm text-zinc-500">
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-zinc-600 border-t-zinc-300" />
            {label}
        </div>
    );
}
