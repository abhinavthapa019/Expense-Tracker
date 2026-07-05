
const db=require("../config/database");

const createLoan = async (req, res) => {
    try {
        const userId = req.user.id;

        const {
            loan_type,
            person_name,
            original_amount,
            due_date,
            notes
        } = req.body;

        // Basic Validation
        if (!loan_type || !person_name || !original_amount) {
            return res.status(400).json({
                message: "Loan type, person name and original amount are required."
            });
        }

        // Remaining amount always starts equal to original amount
        const remaining_amount = original_amount;

        const sql = `
            INSERT INTO loans (
                user_id,
                loan_type,
                person_name,
                original_amount,
                remaining_amount,
                due_date,
                notes
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const [result] = await db.query(sql, [
            userId,
            loan_type,
            person_name,
            original_amount,
            remaining_amount,
            due_date || null,
            notes || null
        ]);

        res.status(201).json({
            message: "Loan created successfully.",
            loanId: result.insertId
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

async function getLoans(req, res) {
    const user_id = req.user.id;

    try {

        const sql = `
            SELECT *
            FROM loans
            WHERE user_id = ?
            ORDER BY created_at DESC
        `;

        const [rows] = await db.query(sql, [user_id]);

        return res.status(200).json({
            message: "Loans retrieved successfully.",
            loans: rows
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Server Error"
        });

    }
}

async function getLoanById(req, res) {
    const user_id = req.user.id;
    const id = req.params.id;

    try {

        const sql = `
            SELECT *
            FROM loans
            WHERE id = ? AND user_id = ?
        `;

        const [rows] = await db.query(sql, [id, user_id]);

        if (rows.length === 0) {
            return res.status(404).json({
                message: "Loan not found."
            });
        }

        return res.status(200).json({
            message: "Loan retrieved successfully.",
            loan: rows[0]
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Server Error"
        });

    }
}




// Delete Loan
async function deleteLoan(req, res) {

    const user_id = req.user.id;
    const id = req.params.id;

    try {

        const sql = `
            DELETE FROM loans
            WHERE id = ? AND user_id = ?
        `;

        const [result] = await db.query(sql, [id, user_id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Loan not found."
            });
        }

        return res.status(200).json({
            message: "Loan deleted successfully."
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Server Error"
        });

    }
}
// Repay Loan
async function repayLoan(req, res) {
    const user_id = req.user.id;
    const id = req.params.id;
    const { amount } = req.body;

    try {

        // Validation
        if (!amount || amount <= 0) {
            return res.status(400).json({
                message: "Repayment amount must be greater than zero."
            });
        }

        // Find the loan
        const sql = `
            SELECT *
            FROM loans
            WHERE id = ? AND user_id = ?
        `;

        const [rows] = await db.query(sql, [id, user_id]);

        // Loan doesn't exist
        if (rows.length === 0) {
            return res.status(404).json({
                message: "Loan not found."
            });
        }

        const loan = rows[0];

        // Business Rule
        if (amount > loan.remaining_amount) {
            return res.status(400).json({
                message: "Repayment amount cannot exceed the remaining loan amount."
            });
        }

        // Calculate new remaining balance
        const remaining_amount = loan.remaining_amount - amount;

        // Determine status
        const status =
            remaining_amount === 0
                ? "completed"
                : "active";

        // Update loan
        const updateSql = `
            UPDATE loans
            SET
                remaining_amount = ?,
                status = ?
            WHERE id = ? AND user_id = ?
        `;

        await db.query(updateSql, [
            remaining_amount,
            status,
            id,
            user_id
        ]);

        return res.status(200).json({
            message: "Repayment recorded successfully.",
            remaining_amount,
            status
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Server Error"
        });

    }
}
module.exports = {
  createLoan,
  getLoans,
  getLoanById,
  deleteLoan,
  repayLoan
};
