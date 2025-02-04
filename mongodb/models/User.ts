import mongoose, { Document, Schema } from "mongoose";
import connectDB from "../db";
import { timeStamp } from "console";

export interface ITranslation extends Document {
  timestamp: Date;
  fromText: string;
  from: string;
  toText: string;
  to: string;
}

interface IUser extends Document {
  userId: string;
  translations: Array<ITranslation>;
}

const translationSchema = new Schema<ITranslation>({
  timestamp: { type: Date, default: Date.now },
  fromText: String,
  from: String,
  toText: String,
  to: String,
});

const userSchema = new Schema<IUser>({
  userId: String,
  translations: [translationSchema],
});

// Check if the model already exist to prevent overwriting
const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);