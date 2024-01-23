import mongoose, { mongo } from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  location: { city: { type: String }, country: { type: String } },
  notifyOnRain: { type: Boolean, default: true },
});

export const User = mongoose.model("User", UserSchema);
