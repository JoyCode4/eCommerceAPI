import express from "express";
import bodyParser from "body-parser";
import ProductRouter from "./src/features/product/product.routes.js";
import UserRouter from "./src/features/user/user.routes.js";
// import basicAuth from "./src/middlwares/basicAuth.middleware.js";
import jwtAuth from "./src/middlwares/jwt.middleware.js";
const port = 8000;
const server = express();

server.use(bodyParser.json());
server.use("/api/products", jwtAuth, ProductRouter);
server.use("/api/users", UserRouter);

server.listen(port, () => {
  console.log("server listening on port: " + port);
});
