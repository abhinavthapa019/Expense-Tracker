async function register(req, res) {
  const { username, email, password } = req.body;
  const bcrypt = require("bcrypt");
  const pool = require("../config/database");

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

  return res.status(201).json({
    message: "User registered successfully"
  });
}

module.exports = { register };
