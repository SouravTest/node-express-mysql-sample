const express = require("express");
// const pool = require("./database/dbConnect");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authenticate = require("./middleware/authMiddleware");

const { uploadSingle,uploadMultiple  } = require("./middleware/uploadMiddleware");

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

app.post("/upload-single", uploadSingle, (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  res.json({
    message: "Single image uploaded",
    file: req.file.filename,
  });
});


app.post("/upload-multiple", uploadMultiple, (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }

  const filenames = req.files.map(file => file.filename);
  res.json({
    message: "Multiple images uploaded",
    files: filenames,
  });
});



app.listen(process.env.PORT, () =>
  console.log(
    `Server running on port ${process.env.PORT}  \n http://localhost:${process.env.PORT}`
  )
);
