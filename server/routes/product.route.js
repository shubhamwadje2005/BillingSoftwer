const express = require("express");
const router = express.Router();
const productController = require("../controller/Product.controller");
const { billproductPhotoUpload } = require("../utils/uploader");

router.post("/add", billproductPhotoUpload, productController.addProduct);
router.get("/all", productController.getAllProducts);
router.get("/deleted", productController.getDeletedProducts);
router.get("/:id", productController.getProductById);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);
router.patch("/restore/:id", productController.restoreProduct);

module.exports = router;
