import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const MainLayout = () => {
  const { logout } = useAuth();

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5 flex flex-col">
        <h1 className="text-2xl font-bold text-blue-600 mb-8">
          Expense Tracker
        </h1>

        <nav className="space-y-2 flex-1">
          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/transactions" className={linkClass}>
            Transactions
          </NavLink>

          <NavLink to="/loans" className={linkClass}>
            Loans
          </NavLink>

          <NavLink to="/reports" className={linkClass}>
            Reports
          </NavLink>
        </nav>

        <button
          onClick={logout}
          className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow px-8 py-4">
          <h2 className="text-xl font-semibold">
            Expense Tracker
          </h2>
        </header>

        {/* Page */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;