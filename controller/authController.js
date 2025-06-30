const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../database/dbconnect");

// Simple email regex
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const register = async (req, res) => {

  if (!req.body) {
    return res.status(400).json({ message: "Request body is missing.", success: false });
  }

  const { name, email, phone, user_name, password, role } = req.body;
  
  if (!name || !email || !user_name || !password) {
    return res
      .status(400)
      .json({ message: "All required fields must be filled.",success:false });
  }
  

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Invalid email format.",success:false });
  }
  try {
    const hash = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (name, email, phone, user_name, password, role) VALUES (?, ?, ?, ?, ?, ?)",
      [name, email, phone, user_name, hash, role || "user"]
    );

    res.status(201).json({ message: "User registered successfully.",success:true });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error : "+error ,success:false });
  }
};

const login = async (req, res) => {

  if (!req.body) {
    return res.status(400).json({ message: "Request body is missing.", success: false });
  }
  
  const { user_name, password } = req.body;

  if (!user_name || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required.",success:false });
  }

  try {
    const [users] = await pool.query(
      "SELECT * FROM users WHERE user_name = ?",
      [user_name]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid username or password." ,success:false});
    }
    const user = users[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid username or password.",success:false });
    }

    const token = jwt.sign({id:user.id,role:user.role,user_name:user.user_name},process.env.JWT_SECRET,{expiresIn:"1d"});

    res.status(200)
    .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        sameSite: "strict",
      })
    .json({  
      message :"Login success" , success:true , token , user : {id : user.id , name: user.name,user_name: user.user_name,role: user.role}
    })
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error : "+error ,success:false });
  }
};

module.exports = { register, login };
