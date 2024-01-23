import express, { response } from "express";
import { Request, Response } from "express";
import { SignupUser } from "../controller/SignupUser";
import { LoginUser } from "../controller/LoginUser";
import { deleteUser } from "../controller/DeleteUser";
import { userAuth } from "../Middleware/auth";

export const router = express.Router();
router.get("/home", (req: Request, res: Response) => {
  return res.end("Home");
});
router.post("/signup", SignupUser);
router.post("/login", LoginUser);
router.use("/delete", deleteUser);
