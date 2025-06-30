const express = require("express");
const pool = require("./database/dbConnect");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors()); //allow all hosts
app.use(express.json()); //for accept json input
app.use(express.urlencoded({ extended: true })); //for accept x-form input

// Routes--
app.get("/", (req, res) => {
  res.send("Server Working ... 😊 ");
});

// Routes
const authRoutes = require("./routes/authRoute"); 
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () =>
  console.log(
    `Server running on port ${process.env.PORT}  \n http://localhost:${process.env.PORT}`
  )
);
