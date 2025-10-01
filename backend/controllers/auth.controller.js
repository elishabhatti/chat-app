import { userModel } from "../models/user.models.js";
import argon2 from "argon2";

export const signUp = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const user = await userModel.findOne({ email });
    if (user) return res.status(400).json({ message: "Email Already Exists!" });

    const hash = await argon2.hash(password);
    const newUser = await userModel.create({
      fullName,
      email,
      hash,
    });

    if (newUser) {
      return res.status(201).json({ message: newUser });
    } else {
      res.status(400).json({ message: "Invalid User" });
    }
  } catch (error) {
    console.error(`Error from signup controller: ${error}`);
  }
};

export const login = (req, res) => {
  res.send("login");
};
export const logout = (req, res) => {
  res.send("logout");
};
