// File: src/controllers/auth.controller.ts
// auth.controller.ts
// This file contains the signup and login controller functions for user authentication.
// It handles user registration and login, including password hashing and token generation.
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.model";
import { generateToken } from "../utils/jwt";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    }) as typeof User.prototype;

    const token = generateToken(user._id.toString(), user.role);

    res.status(201).json({
      token, user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }) as typeof User.prototype;

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = generateToken(user._id.toString(), user.role);
    res.status(200).json({
      token, user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });

  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
