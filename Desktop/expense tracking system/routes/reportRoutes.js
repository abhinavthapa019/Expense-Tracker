const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");

const {
    getDashboard,
    getCategoryReport,
    getMonthlyReport
} = require("../controllers/reportController");

router.get("/dashboard", authenticateToken, getDashboard);
router.get("/categories", authenticateToken, getCategoryReport);
router.get("/monthly", authenticateToken, getMonthlyReport);

module.exports = router;