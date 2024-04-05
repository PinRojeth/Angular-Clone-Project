const mongoose = require("mongoose");
const CatchError = require("../middleware/CatchError");
const ErrorHandler = require("../utils/ErrorHandler");
const Product = require("../Model/productModel");

module.exports = {
  getAllProduct: CatchError(async (req, res, next) => {
    const products = await Product.find();

    if (!products) {
      throw new ErrorHandler("The products isn't exist", 404);
    }

    res.status(200).json({
      status: "success",
      data: products,
    });
  }),
  getProductById: CatchError(async (req, res, next) => {
    const product = await Product.findById(req.params.productId);

    if (!product) {
      throw new ErrorHandler("This product doesn't exist", 404);
    }

    res.status(200).json({
      status: "success",
      data: product,
    });
  }),

  createProduct: CatchError(async (req, res, next) => {
    const { name, image, price, stock, rating, description } = req.body;

    const product = new Product({
      name,
      image,
      price,
      stock,
      rating,
      description,
    });

    const newProduct = await Product.create(product);

    res.status(201).json({
      status: "success",
      data: newProduct,
    });
  }),

  updateProduct: CatchError(async (req, res, next) => {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updateProduct) {
      throw new ErrorHandler(`This ${req.params.productId} ID doesn't exist`);
    }

    console.log(updateProduct);
    res.status(200).json({
      status: "success",
      data: updateProduct,
    });
  }),

  deleteProductById: CatchError(async (req, res, next) => {
    const productId = await Product.findByIdAndDelete(req.params.productId);

    if (!productId) {
      throw new ErrorHandler(`This ${req.params.productId} ID doesn't exist`);
    }

    res.status(200).json({
      message: "The Product is successfully deleted",
    });
  }),
};
