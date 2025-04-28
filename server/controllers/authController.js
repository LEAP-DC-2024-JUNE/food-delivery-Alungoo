import userModel from "../models/auth.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/auth.js";
import nodemailer from "nodemailer";

export const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const role = "USER";

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      email,
      password: hashedPass,
      role,
    });

    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated", user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const users = await userModel.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "User not found",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect password",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({
      status: "success",
      message: "User login successful",
      token,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
console.log(process.env.JWT_SECRET);
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send({ message: "Please provide email" });
    }
    const checkUser = await UserModel.findOne({ email });
    if (!checkUser) {
      return res
        .status(400)
        .send({ message: "User not found! Please sign up!" });
    }
    const token = jwt.sign({ email: checkUser.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.MY_GMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });
    const resetLink = `http://localhost:3000/reset-password/${token}`;

    const receiver = {
      from: "nomnom-food-delivery@gmail.com",
      to: email,
      subject: "Password Reset Request",
      html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; background: #f9f9f9; border-radius: 10px; text-align: center;">
        <img src="https://img.freepik.com/premium-vector/premium-logo-template-2025_1271687-73.jpg?semt=ais_hybrid&w=740" alt="Password Reset" style="width: 150px; margin-bottom: 20px;" />
        <h1 style="color: #333;">Password Reset Request</h1>
        <p style="color: #555;">It seems like you requested to reset your password. Click the button below to reset it:</p>
        <a href="${resetLink}" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p style="color: #999; margin-top: 30px;">If you did not request a password reset, you can safely ignore this email.</p>
      </div>
    `,
    };

    await transporter.sendMail(receiver);
    return res.status(200).send({
      message: "Password reset link send successfully on your gmail account!",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).send({ message: "Please provide password" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findOne({ email: decode.email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const newHashPassword = await bcrypt.hash(password, 10);
    user.password = newHashPassword;
    await user.save();
    return res.status(200).send({ message: "password reset successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
