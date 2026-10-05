const multer = require("multer");

const imageFileFilter = (req, file, cb) => {
    if (file.mimetype && (file.mimetype.startsWith("image/") || /\.(jpg|jpeg|png|webp)$/i.test(file.originalname))) {
        cb(null, true);
    } else {
        cb(new Error("Only image files (JPG, PNG, WEBP) are allowed!"), false);
    }
};

const userPhotoUpload = multer({
    storage: multer.diskStorage({}),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
    fileFilter: imageFileFilter,
}).single("shopImages");

const billproductPhotoUpload = multer({
    storage: multer.diskStorage({}),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
    fileFilter: imageFileFilter,
}).array("billphoto", 5);

module.exports = { userPhotoUpload, billproductPhotoUpload };