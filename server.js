import express from "express";
const port = 8000;
const server = express();

server.get("/", (req, res) => {
  res.status(200).json("Welcome to the server");
});

server.listen(port, () => {
  console.log("server listening on port: " + port);
});
