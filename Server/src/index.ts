import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose, { mongo } from "mongoose";
import cookieParser from "cookie-parser";
import { router } from "./Routes/user";
import { userAuth } from "./Middleware/auth";
import { deleteUser } from "./controller/DeleteUser";
import cron from "node-cron";
import { User } from "./models/schema";
import { weatherListener } from "./services/weatherListener";

dotenv.config();
const PORT = process.env.PORT || 3001;
// const JWTSECRET = process.env.SECRET;
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const MongoURI = "mongodb://localhost:27017/weatherWP";
mongoose
  .connect(MongoURI, {})
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(() => {
    console.log("Error while making connection to DB");
  });

app.use(router);
// app.use("/user", userAuth);

app.get("/", (req: Request, res: Response) => {
  return res.end("Hello World");
});

// Schedule the weather check task to run every hour
cron.schedule("0 * * * *", async () => {
  try {
    // Fetch all registered users from the database
    const users = await User.find({});
    console.log(users);
    // Iterate over each user and check the weather
    for (const user of users) {
      await weatherListener(user); // Pass the user object to the weatherListener
    }
  } catch (error) {
    console.error("Error in scheduled task:", error);
  }
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
