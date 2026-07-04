const pool = require("../config/database");

// CREATE TRANSACTION
const createTransaction = async (req, res) => {
    try {
        const {
            type,
            category,
            title,
            amount,
            transaction_date
        } = req.body;

        const userId = req.user.id;

        // Basic Validation
        if (!type || !title || amount === undefined || !transaction_date) {
            return res.status(400).json({
                message: "Please fill all required fields."
            });
        }

        if (amount <= 0) {
            return res.status(400).json({
                message: "Amount must be greater than zero."
            });
        }

        if (type === "expense" && !category) {
            return res.status(400).json({
                message: "Category is required for expenses."
            });
        }

        const sql = `
            INSERT INTO transactions
            (user_id, type, category, title, amount, transaction_date)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        await pool.query(sql, [
            userId,
            type,
          
            category ? category : null,
            title,
            amount,
            transaction_date
        ]);

        res.status(201).json({
            message: "Transaction created successfully."
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error."
        });
    }
};

// GET ALL TRANSACTIONS
const getTransactions = async (req, res) => {
    try {
        const userId = req.user.id;

        const sql = `
            SELECT *
            FROM transactions
            WHERE user_id = ?
            ORDER BY transaction_date DESC, created_at DESC
        `;

        const [rows] = await pool.query(sql, [userId]);

        res.status(200).json(rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error."
        });
    }
};

// GET SINGLE TRANSACTION
const getTransactionById = async (req, res) => {
    try {
        const transactionId = req.params.id;
        const userId = req.user.id;

        const sql = `
            SELECT *
            FROM transactions
            WHERE id = ?
            AND user_id = ?
        `;

        const [rows] = await pool.query(sql, [
            transactionId,
            userId
        ]);

        if (rows.length === 0) {
            return res.status(404).json({
                message: "Transaction not found."
            });
        }

        res.status(200).json(rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error."
        });
    }
};

// UPDATE TRANSACTION
const updateTransaction = async (req, res) => {
    try {
        const transactionId = req.params.id;
        const userId = req.user.id;

        const {
            type,
            category,
            title,
            amount,
            transaction_date
        } = req.body;

        // Basic Validation
        if (!type || !title || amount === undefined || !transaction_date) {
            return res.status(400).json({
                message: "Please fill all required fields."
            });
        }

        if (amount <= 0) {
            return res.status(400).json({
                message: "Amount must be greater than zero."
            });
        }

        if (type === "expense" && !category) {
            return res.status(400).json({
                message: "Category is required for expenses."
            });
        }

        const sql = `
            UPDATE transactions
            SET
                type = ?,
                category = ?,
                title = ?,
                amount = ?,
                transaction_date = ?
            WHERE
                id = ?
                AND user_id = ?
        `;

        const [result] = await pool.query(sql, [
            type,
            category ? category : null,
            title,
            amount,
            transaction_date,
            transactionId,
            userId
        ]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Transaction not found."
            });
        }

        res.status(200).json({
            message: "Transaction updated successfully."
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error."
        });
    }
};

// DELETE TRANSACTION
const deleteTransaction = async (req, res) => {
    try {
        const transactionId = req.params.id;
        const userId = req.user.id;

        const sql = `
            DELETE FROM transactions
            WHERE id = ?
            AND user_id = ?
        `;

        const [result] = await pool.query(sql, [
            transactionId,
            userId
        ]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Transaction not found."
            });
        }

        res.status(200).json({
            message: "Transaction deleted successfully."
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error."
        });
    }
};

module.exports = {
    createTransaction,
    getTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction
};