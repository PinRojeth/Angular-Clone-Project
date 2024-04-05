const express = require("express");

const router = express.Router();
const productController = require("../controller/productController");

router
  .route("/")
  .get(productController.getAllProduct)
  .post(productController.createProduct);

router
  .route("/:productId")
  .get(productController.getProductById)
  .patch(productController.updateProduct)
  .delete(productController.deleteProductById);

module.exports = router;
