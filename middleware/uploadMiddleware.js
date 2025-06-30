const fs = require("fs");
const multer = require("multer");
const path = require("path");

const uploadDir = path.join(__dirname, "../uploads");

// Auto-create uploads folder if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

//storage config
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"uploads/");
    },
    filename: function(req,file,cb){
        const ext = path.extname(file.originalname);
        const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1E9) + ext;
        cb(null,uniqueName);
    },
});

//option for filter file type
const fileFilter = (req,file,cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null,true);
    }else{
         cb(new Error("Only .jpg, .jpeg, .png images are allowed"), false);
    }
};


const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});

// Middlewares
const uploadSingle = upload.single("image");         // for single file upload
const uploadMultiple = upload.array("images", 5);    // for multiple files (max 5)

module.exports = { uploadSingle, uploadMultiple };