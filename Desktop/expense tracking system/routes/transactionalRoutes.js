const express = require("express");
const router = express.Router();

const {
    createTransaction,
    getTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction
} = require("../controllers/transactionalController");

const authenticateToken  = require("../middleware/authMiddleware");

// Create a transaction
router.post("/", authenticateToken, createTransaction);

// Get all transactions of logged-in user
router.get("/", authenticateToken, getTransactions);

// Get a single transaction
router.get("/:id", authenticateToken, getTransactionById);

// Update a transaction
router.put("/:id", authenticateToken, updateTransaction);

// Delete a transaction
router.delete("/:id", authenticateToken, deleteTransaction);

module.exports = router;