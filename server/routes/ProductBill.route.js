const Product = require("../controller/ProductBill.controller")

const routes = require("express").Router()
const { billproductPhotoUpload } = require("../utils/uploader")

routes
    .post("/add/productbills", billproductPhotoUpload, Product.AddallBill)
    .get("/get/productbills", Product.getallBill)
    .delete("/delete/productbills/:id", Product.isSoftDeleteallBill)

    .get("/get/issoftDelete/productbills", Product.getDeletedBill)
    .patch("/restore/productbills/:id", Product.restoreallBill)

    .get("/bill-pdf/:id", Product.downloadBillPDF);

module.exports = routes