const express= require("express");
const app= express();

const authRoutes=require("./routes/authRoutes");


app.use(express.json());
app.use("/api/auth",authRoutes);

app.listen(3000,()=>{
    console.log("server is running on port 3000");
});



const pool = require("./config/database");

async function testConnection() {
    try {
        const [rows] = await pool.query("SELECT 1 AS test");
        console.log(rows);
    } catch (error) {
        console.error(error);
    }
}

testConnection();