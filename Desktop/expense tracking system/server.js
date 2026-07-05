const express= require("express");
const app= express();

const authRoutes=require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionalRoutes");
const loanRoutes=require("./routes/loanRoutes")


app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("api/loan",loanRoutes);

app.listen(3000,()=>{
    console.log("server is running on port 3000");
});


const pool = require("./config/database");

async function testConnection() {
    try {
        const [rows] = await pool.query("SELECT 100 AS hhhhhhhhhtest");
        console.log(rows);
    } catch (error) {
        console.error(error);
    }
}

testConnection();