const express = require("express");
const router = express.Router();

const { register, login } = require("../controller/authController");

router.post("/register", 
    (req,res)=>{
        res.send("ok");
    }
);
router.post("/login", login);


module.exports = router;