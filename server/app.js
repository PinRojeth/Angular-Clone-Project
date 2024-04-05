const express = require("express");

const app = express();
const cors = require("cors");

const productRoute = require("./src/routes/productRoute");

app.use(express.json());

app.use(cors({ origin: "http://localhost:4200", credentials: true }));

app.use("/api/v1/products", productRoute);

module.exports = app;
