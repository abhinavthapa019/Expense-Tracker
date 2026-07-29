require("dotenv").config();

const express= require("express");
const app= express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    next();
});


const reportRoutes = require("./routes/reportRoutes");
const authRoutes=require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionalRoutes");
const loanRoutes=require("./routes/loanRoutes")


app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/loans",loanRoutes);
app.use("/api/reports", reportRoutes);

app.listen(3000,()=>{
    console.log("server is running on port 3000");
});

// //const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

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