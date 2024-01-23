import express, { Request, Response } from "express";
import { User } from "../models/schema";
import jwt from "jsonwebtoken";

export const LoginUser = async (req: Request, res: Response) => {
  try {
    const { name, phone } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ msg: "User data not found" });
    }

    const userInDB = await User.findOne({ name, phone });

    if (!userInDB) {
      return res.status(404).json({ msg: "User doesn't exist in DB" });
    }

    const token = jwt.sign({ name, phone }, process.env.SECRET || "");

    // sending token as cookie
    res.cookie("authToken", token, {
      httpOnly: false,
      secure: true,
      domain: "http://localhost:5173",
    });

    // sending success response to user
    return res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};
