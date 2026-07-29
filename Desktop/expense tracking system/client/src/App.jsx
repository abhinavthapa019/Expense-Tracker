import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/other_pages/Login";
import Register from "./pages/other_pages/Register";
import Dashboard from "./pages/other_pages/Dashboard";
import Transactions from "./pages/other_pages/Transactions";
import Loans from "./pages/other_pages/Loans";
import Reports from "./pages/other_pages/Reports";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Public Routes */}

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Layout */}

            <Route
                element={
                    <ProtectedRoute>
                        <MainLayout />
                    </ProtectedRoute>
                }
            >
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/transactions" element={<Transactions />} />

        <Route path="/loans" element={<Loans />} />

        <Route path="/reports" element={<Reports />} />

            </Route>

            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    );
}

export default App;