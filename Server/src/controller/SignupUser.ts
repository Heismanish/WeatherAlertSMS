import express from "express";
import { Request, Response } from "express";
import cron from "node-cron";
import { User } from "../models/schema";
import jwt from "jsonwebtoken";
import { weatherListener } from "../services/weatherListener";
export type UserInputType = {
  name: string;
  phone: string;
  city: string;
  country: string;
};

export const SignupUser = async (req: Request, res: Response) => {
  try {
    const { name, phone, city, country }: UserInputType = req.body;

    if (!name || !phone || !city || !country) {
      return res.status(400).json({ error: "User data is missing" });
    }

    const userInDB = await User.findOne({ name, phone });

    if (userInDB) {
      return res.status(409).json({ error: "User already exists" });
    }

    const userToDb = await User.create({
      name,
      phone,
      location: { city: city, country: country },
    });

    // Schedule the weather check task to run every hour
    // cron.schedule("* * * * *", async () => {
    //   try {
    //     // Fetch all registered users from the database
    //     const users = await User.find({});

    //     // Iterate over each user and check the weather
    //     for (const user of users) {
    //       await weatherListener(user);
    //     }
    //   } catch (error) {
    //     console.error("Error in scheduled task:", error);
    //   }
    // });

    // const token = jwt.sign({ name, phone }, process.env.SECRET || "");

    return res.json({ success: "ok" }).status(200);
  } catch (error) {
    return res.json({ error }).status(500);
  }
};
