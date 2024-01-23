import express, { Request, Response } from "express";
import { User } from "../models/schema";
import jwt from "jsonwebtoken";

export interface NewRequest extends Request {
  name?: string;
  phone?: string;
}

export const deleteUser = async (req: NewRequest, res: Response) => {
  try {
    console.log("ajba");
    const { name, phone } = req.query;
    console.log(name, phone, "akjsb");

    if (!name || !phone) {
      return res.json({ error: "Invalid value" });
    }
    console.log(name, phone, "akjsb");

    console.log("reached 1");
    const userInDb = await User.findOne({ name, phone });
    console.log(userInDb);

    if (!userInDb) {
      return res.json({ error: "User doesn't exists" });
    }
    console.log("reached 2");
    await User.findOneAndDelete({ name, phone });

    return res.json({ success: "ok", msg: "User has been deleted." });
    // } else {
    //   return res.json({ err: "Invalid user data in the token" });
    // }
    // const { name, phone } = deocdedToken;
    // if (!name || !phone) {
    //   return res.json({ err: "Please provide valid data" });
    // }

    // await User.findOneAndDelete({ name, phone });

    // return res.json({ success: "ok", msg: "User has been deleted." });
    // }
  } catch (error) {
    return res.json({ error }).status(500);
  }
};
