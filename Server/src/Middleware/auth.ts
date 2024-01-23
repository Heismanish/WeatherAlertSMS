import express, { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface NewRequest extends Request {
  user?: string | JwtPayload;
}

export const userAuth = (
  req: NewRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(409).json({ err: "Authentication token not found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET || "");
    if (decoded) {
      req.user = decoded;
    }
    console.log("reached here", decoded);
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
