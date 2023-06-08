import { Routes, Route } from "react-router-dom";
import { Presentation } from "./pages/Presentation";
import { Login } from "./pages/Login";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Presentation />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}
