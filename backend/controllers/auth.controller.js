import { generateToken } from "../lib/utils.js";
import { userModel } from "../models/user.models.js";
import argon2 from "argon2";

export const signUp = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
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
      password: hash,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid User" });
    }
  } catch (error) {
    console.error(`Error from signup controller: ${error}`);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials!" });

    const isPasswordCorrect = await argon2.verify(user.password, password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error(`Error from login controller ${error}`);
  }
};
export const logout = (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out Successfully!" });
  } catch (error) {
    console.error(`Error from Logout Controller: ${error}`);
  }
};
