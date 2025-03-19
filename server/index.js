import express from "express";
import { connectDB } from "./connectDB.js";
import { ObjectId } from "mongodb";
import cors from "cors";

const server = express();
const PORT = 4000;
server.use(cors());
server.use(express.json());
// connectDB();

server.post("/create-user", async (req, res) => {
  try {
    let db = await connectDB();
    const { name, age, phoneNumber } = req.body;
    if (!name || !age || !phoneNumber) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }
    const newUser = { name, age, phoneNumber };
    const result = await db.insertOne(newUser);
    return res.status(201).json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.json({
      success: false,
      error,
    });
  }
});

server.get("/get-all-users", async (req, res) => {
  let db = await connectDB();
  try {
    let result = await db.find().toArray();
    console.log(result);
    res.json({
      success: true,
      result,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      err,
    });
  }
});

server.put("/update", async (req, res) => {
  let db = await connectDB();
  const { id, name, age, phoneNumber } = req.body;
  try {
    let result = await db.findOneAndUpdate(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          name,
          age,
          phoneNumber,
        },
      }
    );
    res.json({
      success: true,
      result,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      err,
    });
  }
});

server.delete("/delete", async (req, res) => {
  let db = await connectDB();
  try {
    let result = await db.findOneAndDelete({
      _id: new ObjectId("6798fcacc0b5ddd7796843fd"),
    });
    res.json({
      success: true,
      result,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      err,
    });
  }
});
server.listen(PORT, () => {
  console.log(`Server started at PORT: http://localhost:${PORT}`);
});
