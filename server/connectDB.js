import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

export const connectDB = async () => {
  try {
    if (!MONGO_URL) {
      console.error("MONGO_URL is undefined!");
      process.exit(1);
    }
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("MongoDB connection error", err);
    process.exit(1);
  }
};
console.log(MONGO_URL);

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
