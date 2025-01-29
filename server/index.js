import express from "express";
import { connectDB } from "./connectDB.js";
import { ObjectId } from "mongodb";

const server = express();
const PORT = 3000;
connectDB();

server.post("/create-user", async (req, res) => {
  let db = await connectDB();
  try {
    let result = await db.insertOne({
      firstName: "Billy",
      lastName: "Alungoo",
      gender: "F",
    });
    console.log(result);
    res.json({
      success: true,
      result,
    });
  } catch (error) {
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

  try {
    let result = await db.findOneAndUpdate(
      {
        _id: new ObjectId("6798fcacc0b5ddd7796843fd"),
      },
      {
        $set: { name: "Tumen", age: 27, phoneNumber: "99681522" },
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
