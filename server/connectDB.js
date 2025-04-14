import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });
const MONGO_URL = process.env.MONGO_URL;

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.log("MongoDB connection error", err);
    process.exit(1); //asaahguigeer zogsooh uildel
  }
};
// const client = new MongoClient(
//   "mongodb+srv://duluuf:LM7miFmm6q0eg0Qa@cluster1.pyncrqd.mongodb.net/"
// );
// let connection;
// try {
//   connection = await client.connect();
//   console.log("Amjilttai MONGODB tei holbogdloo");
// } catch (error) {
//   console.log(error);
// }
// return connection.db("Alungoo").collection("users");
