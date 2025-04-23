import jwt from "jsonwebtoken";
import UserModel from "../models/auth.js";

export const authentication = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const token = req.headers.authorization.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : req.headers.authorization;

    const decode = jwt.decode(token);

    if (!decode || !decode.id) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const foundUser = await UserModel.findById(decode.id);

    if (!foundUser) {
      return res.status(401).json({ message: "User not found" });
    }

    console.log(foundUser);
    req.body.user = foundUser;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Authentication error" });
  }
};
