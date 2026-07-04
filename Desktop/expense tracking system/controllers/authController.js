require("dotenv").config();

const jwt = require("jsonwebtoken");
  const bcrypt = require("bcrypt");
  const pool = require("../config/database");

async function register(req, res) {
  const { username, email, password } = req.body;
  console.log(username, email, password);

  // Check if user already exists
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
  if (rows.length > 0) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert new user
  await pool.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [username, email, hashedPassword]
  );

  return res.status(200).json({
    message: "User registered successfully"
  });
}



//login part 
async function login(req,res){


  const {email,password}=req.body;
const [row]=await pool.query("SELECT * FROM users WHERE email=?",
  [email]);
if(row.length===0){
 return res.status(401).json({message:"email or password is invalid"
});}
const user=row[0];

const isamatch=await bcrypt.compare(password, user.password)
if(isamatch){
    const token=jwt.sign(
    {
      id:user.id,
      email:user.email
    },
        process.env.JWT_SECRET,
    {
        expiresIn: "1h"
    }
  )
  return res.status(200).json({message: "email is found",token});
}
return res.status(401).json({message:"invalide"})
}

module.exports = { register,login}
