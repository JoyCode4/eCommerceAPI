import express from "express";
import ProductRouter from "./src/features/product/product.routes.js";
const port = 8000;
const server = express();

server.use("/api/products", ProductRouter);

server.listen(port, () => {
  console.log("server listening on port: " + port);
});
