import { Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Dashboard from "../pages/Dashboard";
import CaseView from "../pages/CaseView";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cases/:caseId" element={<CaseView />} />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}