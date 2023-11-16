import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import ProductRouter from "./src/features/product/product.routes.js";
import UserRouter from "./src/features/user/user.routes.js";
import CartRouter from "./src/features/cart/cart.routes.js";
// import basicAuth from "./src/middlwares/basicAuth.middleware.js";
import jwtAuth from "./src/middlwares/jwt.middleware.js";
const port = 8000;
const server = express();
server.use(cors());
server.use(bodyParser.json());
server.use("/api/products", jwtAuth, ProductRouter);
server.use("/api/carts", jwtAuth, CartRouter);
server.use("/api/users", UserRouter);

server.get("/", (req, res) => {
  res.status(200).send("Welcome to ECommerce API");
});

server.use((req, res) => {
  res.status(404).send("404! API not found");
});

server.listen(port, () => {
  console.log("server listening on port: " + port);
});
