const db = require("../config/database");

const db = require("../config/database");

// Dashboard
async function getDashboard(req, res) {

    const user_id = req.user.id;

    try {

        const incomeSql = `
            SELECT
            COALESCE(SUM(amount),0) AS totalIncome
            FROM transactions
            WHERE user_id = ?
            AND type = 'income'
        `;

        const expenseSql = `
            SELECT
            COALESCE(SUM(amount),0) AS totalExpense
            FROM transactions
            WHERE user_id = ?
            AND type = 'expense'
        `;

        const loanSql = `
            SELECT
            COALESCE(SUM(remaining_amount),0) AS loanGiven
            FROM loans
            WHERE user_id = ?
            AND loan_type = 'given'
            AND status = 'active'
        `;

        const borrowedLoanSql = `
    SELECT
        COALESCE(SUM(remaining_amount),0) AS loanBorrowed
    FROM loans
    WHERE user_id = ?
    AND loan_type = 'borrowed'
    AND status = 'active'
`;
const [
    [incomeRows],
    [expenseRows],
    [loanGivenRows],
    [loanBorrowedRows]
] = await Promise.all([
    db.query(incomeSql, [user_id]),
    db.query(expenseSql, [user_id]),
    db.query(loanSql, [user_id]),
    db.query(borrowedLoanSql, [user_id])
]);
        const totalIncome = incomeRows[0].totalIncome;
        const totalExpense = expenseRows[0].totalExpense;
        const loanGiven = loanRows[0].loanGiven;
        const loanBorrowed = loanBorrowedRows[0].loanBorrowed;

        const currentBalance =
            totalIncome -
            totalExpense -
            loanGiven+ loanBorrowed;;

        return res.status(200).json({
            totalIncome,
            totalExpense,
            loanGiven,
            loanBorrowed,
            currentBalance
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Server Error"
        });

    }

}

async function getCategoryReport(req, res) {

    const user_id = req.user.id;

    try {

        const sql = `
            SELECT
                category,
                SUM(amount) AS total
            FROM transactions
            WHERE user_id = ?
            AND type = 'expense'
            GROUP BY category
            ORDER BY total DESC
        `;

        const [rows] = await db.query(sql, [user_id]);

        return res.status(200).json({
            categories: rows
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Server Error"
        });

    }

}

async function getMonthlyReport(req, res) {

    const user_id = req.user.id;

    try {

        const sql = `
            SELECT
                YEAR(transaction_date) AS year,
                MONTH(transaction_date) AS month,
                SUM(
                    CASE
                        WHEN type='income'
                        THEN amount
                        ELSE 0
                    END
                ) AS totalIncome,

                SUM(
                    CASE
                        WHEN type='expense'
                        THEN amount
                        ELSE 0
                    END
                ) AS totalExpense

            FROM transactions

            WHERE user_id = ?

            GROUP BY
                YEAR(transaction_date),
                MONTH(transaction_date)

            ORDER BY
                YEAR(transaction_date),
                MONTH(transaction_date);
        `;

        const [rows] = await db.query(sql, [user_id]);

        return res.status(200).json({
            monthlyReport: rows
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Server Error"
        });

    }

}

module.exports = {
    getDashboard,
    getCategoryReport,
    getMonthlyReport
};