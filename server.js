import express from "express";
import bodyParser from "body-parser";
import ProductRouter from "./src/features/product/product.routes.js";
const port = 8000;
const server = express();

server.use(bodyParser.json());
server.use("/api/products", ProductRouter);

server.listen(port, () => {
  console.log("server listening on port: " + port);
});
