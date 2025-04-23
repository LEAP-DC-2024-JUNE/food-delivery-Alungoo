import jwt from "jsonwebtoken";
import UserModel from "../models/auth.js";

export const authentication = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ verify instead of decode
    console.log("Decoded Token:", decoded); // check role and id

    const foundUser = await UserModel.findById(decoded.id);
    if (!foundUser) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = decoded; // ✅ Attach token data (including role) to req.user
    next();
  } catch (err) {
    console.error("JWT error:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};
