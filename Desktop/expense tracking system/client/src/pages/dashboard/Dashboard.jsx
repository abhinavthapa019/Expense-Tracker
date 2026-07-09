import { useEffect, useState } from "react";
import * as reportService from "../../services/reportService";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalIncome: 0,
    totalExpense: 0,
    loanGiven: 0,
    loanBorrowed: 0,
    currentBalance: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await reportService.getDashboard();
        setDashboardData(response || {});
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <h2 className="text-xl font-semibold">Loading dashboard...</h2>;
  }

  if (error) {
    return <div className="rounded-lg bg-red-100 p-4 text-red-700">{error}</div>;
  }

  const totalIncome = Number(dashboardData.totalIncome) || 0;
  const totalExpense = Number(dashboardData.totalExpense) || 0;
  const loanGiven = Number(dashboardData.loanGiven) || 0;
  const loanBorrowed = Number(dashboardData.loanBorrowed) || 0;
  const currentBalance = Number(dashboardData.currentBalance) || 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-1 text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Overview of your financial position.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Income</p>
          <p className="mt-1 text-2xl font-semibold text-emerald-600">${totalIncome.toFixed(2)}</p>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Expense</p>
          <p className="mt-1 text-2xl font-semibold text-rose-600">${totalExpense.toFixed(2)}</p>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Loan Given</p>
          <p className="mt-1 text-2xl font-semibold text-indigo-600">${loanGiven.toFixed(2)}</p>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Loan Borrowed</p>
          <p className="mt-1 text-2xl font-semibold text-amber-600">${loanBorrowed.toFixed(2)}</p>
        </div>
        <div className="rounded-xl bg-blue-600 p-5 text-white shadow-sm">
          <p className="text-sm text-blue-100">Current Balance</p>
          <p className="mt-1 text-2xl font-bold">${currentBalance.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;