import { Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Transactions from "./pages/transactions/Transactions";
import Loans from "./pages/loans/Loans";
import Reports from "./pages/reports/Reports";
import MainLayout from "./layouts/MainLayout";

function App() {
    return (
     <Routes>

    {/* Public Routes */}

    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* Protected Layout */}

    <Route element={<MainLayout />}>

        <Route
            path="/dashboard"
            element={<Dashboard />}
        />

        <Route
            path="/transactions"
            element={<Transactions />}
        />

        <Route
            path="/loans"
            element={<Loans />}
        />

        <Route
            path="/reports"
            element={<Reports />}
        />

    </Route>

</Routes>
    );
}

export default App;