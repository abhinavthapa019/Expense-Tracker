require("dotenv").config();


const cors = require("cors");
const express= require("express");
const app= express();

app.use(cors());


const reportRoutes = require("./routes/reportRoutes");
const authRoutes=require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionalRoutes");
const loanRoutes=require("./routes/loanRoutes")


app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/loans",loanRoutes);
app.use("/api/reports", reportRoutes);
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK"
    });
});

// app.listen(3000,()=>{
//     console.log("server is running on port 3000");
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const pool = require("./config/database");

async function testConnection() {
    try {
        const [rows] = await pool.query("SELECT 1 AS connection_test");
        console.log(rows);
    } catch (error) {
        console.error(error);
    }
}

testConnection();