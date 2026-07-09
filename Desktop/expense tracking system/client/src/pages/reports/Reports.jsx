import { useEffect, useState } from "react";
import * as reportService from "../../services/reportService";

function Reports() {
	const [categoryRows, setCategoryRows] = useState([]);
	const [monthlyRows, setMonthlyRows] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		async function loadReports() {
			try {
				setLoading(true);
				setError("");

				const [categoryData, monthlyData] = await Promise.all([
					reportService.getCategoryReport(),
					reportService.getMonthlyReport(),
				]);

				setCategoryRows(Array.isArray(categoryData?.categories) ? categoryData.categories : []);
				setMonthlyRows(Array.isArray(monthlyData?.monthlyReport) ? monthlyData.monthlyReport : []);
			} catch (err) {
				setError(err.response?.data?.message || "Failed to load reports.");
			} finally {
				setLoading(false);
			}
		}

		loadReports();
	}, []);

	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-3xl font-bold">Reports</h1>
				<p className="mt-1 text-gray-600">Category and monthly performance breakdown.</p>
			</div>

			{error ? <div className="rounded-lg bg-red-100 px-4 py-3 text-red-700">{error}</div> : null}

			<section className="rounded-xl bg-white p-5 shadow-sm">
				<h2 className="mb-4 text-xl font-semibold">Expense by Category</h2>
				<div className="overflow-x-auto">
					<table className="min-w-full">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Category</th>
								<th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-600">Total</th>
							</tr>
						</thead>
						<tbody>
							{loading ? (
								<tr>
									<td colSpan={2} className="px-4 py-6 text-center text-gray-500">
										Loading category report...
									</td>
								</tr>
							) : categoryRows.length === 0 ? (
								<tr>
									<td colSpan={2} className="px-4 py-6 text-center text-gray-500">
										No category data.
									</td>
								</tr>
							) : (
								categoryRows.map((row, idx) => (
									<tr key={`${row.category || "uncategorized"}-${idx}`} className="border-t">
										<td className="px-4 py-3 text-sm font-medium text-gray-900">{row.category || "Uncategorized"}</td>
										<td className="px-4 py-3 text-right text-sm font-semibold text-gray-900">${Number(row.total).toFixed(2)}</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</section>

			<section className="rounded-xl bg-white p-5 shadow-sm">
				<h2 className="mb-4 text-xl font-semibold">Monthly Income vs Expense</h2>
				<div className="overflow-x-auto">
					<table className="min-w-full">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Month</th>
								<th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-600">Income</th>
								<th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-600">Expense</th>
								<th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-600">Net</th>
							</tr>
						</thead>
						<tbody>
							{loading ? (
								<tr>
									<td colSpan={4} className="px-4 py-6 text-center text-gray-500">
										Loading monthly report...
									</td>
								</tr>
							) : monthlyRows.length === 0 ? (
								<tr>
									<td colSpan={4} className="px-4 py-6 text-center text-gray-500">
										No monthly data.
									</td>
								</tr>
							) : (
								monthlyRows.map((row, idx) => {
									const income = Number(row.totalIncome) || 0;
									const expense = Number(row.totalExpense) || 0;
									const net = income - expense;

									return (
										<tr key={`${row.year}-${row.month}-${idx}`} className="border-t">
											<td className="px-4 py-3 text-sm font-medium text-gray-900">
												{String(row.year)}-{String(row.month).padStart(2, "0")}
											</td>
											<td className="px-4 py-3 text-right text-sm font-semibold text-emerald-600">${income.toFixed(2)}</td>
											<td className="px-4 py-3 text-right text-sm font-semibold text-rose-600">${expense.toFixed(2)}</td>
											<td className={`px-4 py-3 text-right text-sm font-semibold ${net >= 0 ? "text-blue-700" : "text-rose-700"}`}>${net.toFixed(2)}</td>
										</tr>
									);
								})
							)}
						</tbody>
					</table>
				</div>
			</section>
		</div>
	);
}

export default Reports;
