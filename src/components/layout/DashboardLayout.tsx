import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Workspace from "./Workspace";

export default function DashboardLayout() {
    return (
        <div className="h-screen w-full overflow-hidden bg-zinc-950 text-white">
            <Navbar />

            <div className="flex h-[calc(100vh-64px)]">
                <Sidebar />
                <Workspace />
            </div>
        </div>
    );
}