import { Routes, Route } from "react-router-dom";
import { Presentation } from "./pages/Presentation";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Presentation/>}/>
        </Routes>
    )
}