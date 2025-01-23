import express from "express";
import { UserModel } from "./model/model";
import connectDB from "./connectDB";

const server = express();
const PORT = 3000;
connectDB();
// server.get("/hello", (req, res) => {
//   res.send("Hello world!");
// });

server.post("/create-user", async (req, res) => {
  try {
    const name = "Alungoo";
    const age = 18;
    const newUser = await UserModel({ name, age });
    newUser.save();
    res.json(newUser);
  } catch (error) {
    console.log(error);
  }
});

server.listen(PORT, () => {
  console.log(`Server started at PORT: http://localhost:${PORT}`);
});
