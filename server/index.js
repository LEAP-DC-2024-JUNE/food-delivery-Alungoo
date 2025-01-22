import express from "express";

const server = express();
const PORT = 3000;

server.get("/hello", (req, res) => {
  res.send("Hello world!");
});
server.listen(PORT, () => {
  console.log(`Server started at PORT: http://localhost:${PORT}`);
});
