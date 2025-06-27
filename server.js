const express = require("express");
const pool = require("./database/dbConnect");
const cors = require("cors");

require("dotenv").config(); //for access env

const app = express();
// const userRoutes = require('./routes/users');

//allow all hosts
app.use(cors());
//for accept json input
app.use(express.json());
//for accept x-form input
app.use(express.urlencoded({ extended: true }));

// app.use('/api/users', userRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
