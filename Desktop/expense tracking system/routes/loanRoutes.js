const express = require("express");
const router = express.Router();

const {
    createLoan,
    getLoans,
    getLoanById,
    deleteLoan,
    repayLoan
} = require("../controllers/loanController");

const authenticateToken = require("../middleware/authMiddleware");

// Create Loan
router.post("/", authenticateToken, createLoan);

// Get All Loans
router.get("/", authenticateToken, getLoans);

// Get Single Loan
router.get("/:id", authenticateToken, getLoanById);


// Delete Loan
router.delete("/:id", authenticateToken, deleteLoan);

// Repay Loan
router.post("/:id/repay", authenticateToken, repayLoan);

module.exports = router;