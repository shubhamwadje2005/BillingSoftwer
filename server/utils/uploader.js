const multer = require("multer")


const userPhotoUpload = multer({ storage: multer.diskStorage({}) }).single("shopImages")
const billproductPhotoUpload = multer({ storage: multer.diskStorage([]) }).array("billphoto")


module.exports = { userPhotoUpload, billproductPhotoUpload }