import { useEffect, useMemo, useState } from "react";
import * as transactionService from "../../services/transactionService";

const initialForm = {
	type: "expense",
	category: "",
	title: "",
	amount: "",
	transaction_date: "",
};

function Transactions() {
	const [transactions, setTransactions] = useState([]);
	const [formData, setFormData] = useState(initialForm);
	const [editingId, setEditingId] = useState(null);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState("");

	const totals = useMemo(() => {
		return transactions.reduce(
			(acc, item) => {
				const amount = Number(item.amount) || 0;

				if (item.type === "income") {
					acc.income += amount;
				} else {
					acc.expense += amount;
				}

				return acc;
			},
			{ income: 0, expense: 0 }
		);
	}, [transactions]);

	async function loadTransactions() {
		try {
			setLoading(true);
			setError("");
			const data = await transactionService.getTransactions();
			setTransactions(Array.isArray(data) ? data : []);
		} catch (err) {
			setError(err.response?.data?.message || "Failed to load transactions.");
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		loadTransactions();
	}, []);

	function resetForm() {
		setFormData(initialForm);
		setEditingId(null);
	}

	function handleChange(event) {
		const { name, value } = event.target;

		setFormData((prev) => ({
			...prev,
			[name]: value,
			category: name === "type" && value === "income" ? "" : prev.category,
		}));
	}

	async function handleSubmit(event) {
		event.preventDefault();

		if (!formData.title || !formData.amount || !formData.transaction_date) {
			setError("Please fill all required fields.");
			return;
		}

		if (formData.type === "expense" && !formData.category) {
			setError("Category is required for expenses.");
			return;
		}

		const payload = {
			...formData,
			amount: Number(formData.amount),
		};

		try {
			setSaving(true);
			setError("");

			if (editingId) {
				await transactionService.updateTransaction(editingId, payload);
			} else {
				await transactionService.createTransaction(payload);
			}

			resetForm();
			await loadTransactions();
		} catch (err) {
			setError(err.response?.data?.message || "Failed to save transaction.");
		} finally {
			setSaving(false);
		}
	}

	function handleEdit(item) {
		setEditingId(item.id);
		setFormData({
			type: item.type,
			category: item.category || "",
			title: item.title,
			amount: String(item.amount),
			transaction_date: String(item.transaction_date).slice(0, 10),
		});
	}

	async function handleDelete(id) {
		try {
			setError("");
			await transactionService.deleteTransaction(id);

			if (editingId === id) {
				resetForm();
			}

			await loadTransactions();
		} catch (err) {
			setError(err.response?.data?.message || "Failed to delete transaction.");
		}
	}

	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-3xl font-bold">Transactions</h1>
				<p className="mt-1 text-gray-600">Add, edit, and track your income and expenses.</p>
			</div>

			{error ? <div className="rounded-lg bg-red-100 px-4 py-3 text-red-700">{error}</div> : null}

			<div className="grid gap-4 sm:grid-cols-3">
				<div className="rounded-lg bg-white p-4 shadow-sm">
					<p className="text-sm text-gray-500">Total Income</p>
					<p className="mt-1 text-2xl font-semibold text-emerald-600">${totals.income.toFixed(2)}</p>
				</div>
				<div className="rounded-lg bg-white p-4 shadow-sm">
					<p className="text-sm text-gray-500">Total Expense</p>
					<p className="mt-1 text-2xl font-semibold text-rose-600">${totals.expense.toFixed(2)}</p>
				</div>
				<div className="rounded-lg bg-white p-4 shadow-sm">
					<p className="text-sm text-gray-500">Net</p>
					<p className="mt-1 text-2xl font-semibold text-blue-600">${(totals.income - totals.expense).toFixed(2)}</p>
				</div>
			</div>

			<form onSubmit={handleSubmit} className="grid gap-4 rounded-xl bg-white p-5 shadow-sm md:grid-cols-2">
				<div>
					<label className="mb-2 block text-sm font-medium text-gray-700">Type</label>
					<select name="type" value={formData.type} onChange={handleChange} className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500">
						<option value="expense">Expense</option>
						<option value="income">Income</option>
					</select>
				</div>

				<div>
					<label className="mb-2 block text-sm font-medium text-gray-700">Title</label>
					<input name="title" value={formData.title} onChange={handleChange} className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" placeholder="Groceries, Salary, Rent" />
				</div>

				<div>
					<label className="mb-2 block text-sm font-medium text-gray-700">Category {formData.type === "expense" ? "*" : "(optional)"}</label>
					<input
						name="category"
						value={formData.category}
						onChange={handleChange}
						disabled={formData.type === "income"}
						className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
						placeholder="Food, Transport, Utilities"
					/>
				</div>

				<div>
					<label className="mb-2 block text-sm font-medium text-gray-700">Amount</label>
					<input
						type="number"
						min="0"
						step="0.01"
						name="amount"
						value={formData.amount}
						onChange={handleChange}
						className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="0.00"
					/>
				</div>

				<div>
					<label className="mb-2 block text-sm font-medium text-gray-700">Date</label>
					<input
						type="date"
						name="transaction_date"
						value={formData.transaction_date}
						onChange={handleChange}
						className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<div className="flex items-end gap-3 md:col-span-2">
					<button
						type="submit"
						disabled={saving}
						className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
					>
						{saving ? "Saving..." : editingId ? "Update Transaction" : "Add Transaction"}
					</button>
					{editingId ? (
						<button type="button" onClick={resetForm} className="rounded-lg border px-5 py-2.5 font-semibold text-gray-700 transition hover:bg-gray-50">
							Cancel Edit
						</button>
					) : null}
				</div>
			</form>

			<div className="overflow-hidden rounded-xl bg-white shadow-sm">
				<div className="overflow-x-auto">
					<table className="min-w-full">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Date</th>
								<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Title</th>
								<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Type</th>
								<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Category</th>
								<th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-600">Amount</th>
								<th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-600">Actions</th>
							</tr>
						</thead>
						<tbody>
							{loading ? (
								<tr>
									<td colSpan={6} className="px-4 py-6 text-center text-gray-500">
										Loading transactions...
									</td>
								</tr>
							) : transactions.length === 0 ? (
								<tr>
									<td colSpan={6} className="px-4 py-6 text-center text-gray-500">
										No transactions yet.
									</td>
								</tr>
							) : (
								transactions.map((item) => (
									<tr key={item.id} className="border-t">
										<td className="px-4 py-3 text-sm text-gray-700">{String(item.transaction_date).slice(0, 10)}</td>
										<td className="px-4 py-3 text-sm font-medium text-gray-900">{item.title}</td>
										<td className="px-4 py-3 text-sm">
											<span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.type === "income" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
												{item.type}
											</span>
										</td>
										<td className="px-4 py-3 text-sm text-gray-700">{item.category || "-"}</td>
										<td className="px-4 py-3 text-right text-sm font-semibold text-gray-900">${Number(item.amount).toFixed(2)}</td>
										<td className="px-4 py-3 text-right text-sm">
											<button onClick={() => handleEdit(item)} className="mr-2 rounded-md border px-3 py-1.5 font-medium text-gray-700 hover:bg-gray-50">
												Edit
											</button>
											<button onClick={() => handleDelete(item.id)} className="rounded-md bg-rose-600 px-3 py-1.5 font-medium text-white hover:bg-rose-700">
												Delete
											</button>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default Transactions;
