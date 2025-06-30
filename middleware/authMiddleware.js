const jwt = require("jsonwebtoken");

const authenticate = (req, res , next ) =>{
    const mode =  process.env.AUTH_MODE || "cookie";
    let token;

    if(mode === "cookie"){
        token = req.cookies?.token;
    }else if(mode === "header"){
        const authHeader = req.headers.authorization;
        if(authHeader && authHeader.startsWith("Bearer ")){
            token = authHeader.split(" ")[1];
        }
    }

    if(!token){
        return res.status(401).json({ message: "Unauthorized: No token provided" ,status:false});
    }

    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decode;
        next();
    }catch(errror){
        return res.status(401).json({message: "Unauthorized: Invalid token" ,status:false})
    }
}


module.exports = authenticate;