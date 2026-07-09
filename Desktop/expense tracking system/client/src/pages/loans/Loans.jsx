import { useEffect, useState } from "react";
import * as loanService from "../../services/loanService";

const initialLoanForm = {
	loan_type: "given",
	person_name: "",
	original_amount: "",
	due_date: "",
	notes: "",
};

function Loans() {
	const [loanForm, setLoanForm] = useState(initialLoanForm);
	const [repayMap, setRepayMap] = useState({});
	const [loans, setLoans] = useState([]);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState("");

	async function loadLoans() {
		try {
			setLoading(true);
			setError("");
			const data = await loanService.getLoans();
			setLoans(Array.isArray(data?.loans) ? data.loans : []);
		} catch (err) {
			setError(err.response?.data?.message || "Failed to load loans.");
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		loadLoans();
	}, []);

	function handleFormChange(event) {
		const { name, value } = event.target;
		setLoanForm((prev) => ({ ...prev, [name]: value }));
	}

	async function handleCreateLoan(event) {
		event.preventDefault();

		if (!loanForm.person_name || !loanForm.original_amount) {
			setError("Please enter person name and amount.");
			return;
		}

		try {
			setSaving(true);
			setError("");
			await loanService.createLoan({
				...loanForm,
				original_amount: Number(loanForm.original_amount),
			});
			setLoanForm(initialLoanForm);
			await loadLoans();
		} catch (err) {
			setError(err.response?.data?.message || "Failed to create loan.");
		} finally {
			setSaving(false);
		}
	}

	async function handleDeleteLoan(id) {
		try {
			setError("");
			await loanService.deleteLoan(id);
			await loadLoans();
		} catch (err) {
			setError(err.response?.data?.message || "Failed to delete loan.");
		}
	}

	function updateRepayAmount(loanId, value) {
		setRepayMap((prev) => ({
			...prev,
			[loanId]: value,
		}));
	}

	async function handleRepay(loanId) {
		const amount = Number(repayMap[loanId]);

		if (!amount || amount <= 0) {
			setError("Repayment amount must be greater than zero.");
			return;
		}

		try {
			setError("");
			await loanService.repayLoan(loanId, amount);
			setRepayMap((prev) => ({
				...prev,
				[loanId]: "",
			}));
			await loadLoans();
		} catch (err) {
			setError(err.response?.data?.message || "Failed to record repayment.");
		}
	}

	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-3xl font-bold">Loans</h1>
				<p className="mt-1 text-gray-600">Track borrowed and given loans with repayments.</p>
			</div>

			{error ? <div className="rounded-lg bg-red-100 px-4 py-3 text-red-700">{error}</div> : null}

			<form onSubmit={handleCreateLoan} className="grid gap-4 rounded-xl bg-white p-5 shadow-sm md:grid-cols-2">
				<div>
					<label className="mb-2 block text-sm font-medium text-gray-700">Loan Type</label>
					<select name="loan_type" value={loanForm.loan_type} onChange={handleFormChange} className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500">
						<option value="given">Given</option>
						<option value="borrowed">Borrowed</option>
					</select>
				</div>

				<div>
					<label className="mb-2 block text-sm font-medium text-gray-700">Person Name</label>
					<input name="person_name" value={loanForm.person_name} onChange={handleFormChange} className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
				</div>

				<div>
					<label className="mb-2 block text-sm font-medium text-gray-700">Original Amount</label>
					<input
						type="number"
						min="0"
						step="0.01"
						name="original_amount"
						value={loanForm.original_amount}
						onChange={handleFormChange}
						className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<div>
					<label className="mb-2 block text-sm font-medium text-gray-700">Due Date</label>
					<input type="date" name="due_date" value={loanForm.due_date} onChange={handleFormChange} className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
				</div>

				<div className="md:col-span-2">
					<label className="mb-2 block text-sm font-medium text-gray-700">Notes</label>
					<textarea name="notes" value={loanForm.notes} onChange={handleFormChange} rows={3} className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
				</div>

				<div className="md:col-span-2">
					<button disabled={saving} type="submit" className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60">
						{saving ? "Saving..." : "Create Loan"}
					</button>
				</div>
			</form>

			<div className="overflow-hidden rounded-xl bg-white shadow-sm">
				<div className="overflow-x-auto">
					<table className="min-w-full">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Type</th>
								<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Person</th>
								<th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-600">Original</th>
								<th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-600">Remaining</th>
								<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Status</th>
								<th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-600">Actions</th>
							</tr>
						</thead>
						<tbody>
							{loading ? (
								<tr>
									<td colSpan={6} className="px-4 py-6 text-center text-gray-500">
										Loading loans...
									</td>
								</tr>
							) : loans.length === 0 ? (
								<tr>
									<td colSpan={6} className="px-4 py-6 text-center text-gray-500">
										No loans found.
									</td>
								</tr>
							) : (
								loans.map((loan) => (
									<tr key={loan.id} className="border-t">
										<td className="px-4 py-3 text-sm">
											<span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${loan.loan_type === "given" ? "bg-indigo-100 text-indigo-700" : "bg-amber-100 text-amber-700"}`}>
												{loan.loan_type}
											</span>
										</td>
										<td className="px-4 py-3 text-sm font-medium text-gray-900">{loan.person_name}</td>
										<td className="px-4 py-3 text-right text-sm text-gray-800">${Number(loan.original_amount).toFixed(2)}</td>
										<td className="px-4 py-3 text-right text-sm font-semibold text-gray-900">${Number(loan.remaining_amount).toFixed(2)}</td>
										<td className="px-4 py-3 text-sm">
											<span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${loan.status === "completed" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`}>
												{loan.status}
											</span>
										</td>
										<td className="px-4 py-3 text-right text-sm">
											{loan.status !== "completed" ? (
												<div className="inline-flex gap-2">
													<input
														type="number"
														min="0"
														step="0.01"
														placeholder="Repay"
														value={repayMap[loan.id] || ""}
														onChange={(event) => updateRepayAmount(loan.id, event.target.value)}
														className="w-24 rounded-md border px-2 py-1"
													/>
													<button onClick={() => handleRepay(loan.id)} className="rounded-md bg-emerald-600 px-3 py-1.5 font-medium text-white hover:bg-emerald-700">
														Repay
													</button>
												</div>
											) : null}
											<button onClick={() => handleDeleteLoan(loan.id)} className="ml-2 rounded-md bg-rose-600 px-3 py-1.5 font-medium text-white hover:bg-rose-700">
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

export default Loans;
