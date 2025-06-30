const express = require("express");
// const pool = require("./database/dbConnect");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authenticate = require("./middleware/authMiddleware");

//routes import
const authRoutes = require("./routes/authRoute"); 


const app = express();

app.use(cors()); //allow all hosts
app.use(express.json()); //for accept json input
app.use(express.urlencoded({ extended: true })); //for accept x-form input
app.use(cookieParser());

// Routes--
app.get("/", (req, res) => {
  res.send("Server Working ... 😊 ");
});

// Routes
app.use("/api/auth", authRoutes);

app.get("/api/protected", authenticate, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});

app.listen(process.env.PORT, () =>
  console.log(
    `Server running on port ${process.env.PORT}  \n http://localhost:${process.env.PORT}`
  )
);
