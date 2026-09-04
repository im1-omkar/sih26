export default function Navbar() {
    return (
        <nav className="flex h-16 items-center justify-between border-b border-zinc-800 px-6">
            <div className="text-lg font-semibold">
                Document Management
            </div>

            <div className="flex items-center gap-4">
                <span className="text-sm text-zinc-400">
                    Workspace
                </span>

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-sm">
                    O
                </div>
            </div>
        </nav>
    );
}