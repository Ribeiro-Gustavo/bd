import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home/home";
import LoginPage from "./pages/LoginP/loginpage";

export default function RouteApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />/
                <Route path="/Home" element={<Home />} />/
            </Routes>

        </BrowserRouter>
    )
}