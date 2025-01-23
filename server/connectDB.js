import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://duluuf:LM7miFmm6q0eg0Qa@cluster1.pyncrqd.mongodb.net/Alungoo"
    );
    console.log("Connected to mongodb");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB();
