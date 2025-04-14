import userModel from "../models/auth.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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

export const getUser = async (req, res) => {
  try {
    const users = await userModel.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  const ADMIN_EMAIL = "admin@yahoo.com";
  const ADMIN_PASSWORD = "admin123456";

  const { email, password } = req.body;

  try {
    // Admin
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = jwt.sign(
        { email: ADMIN_EMAIL, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.json({
        success: true,
        message: "Admin login successful",
        token,
        role: "admin",
      });
    }

    // User
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
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      status: "success",
      message: "User login successful",
      token,
      role: user.role.toLowerCase(),
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
