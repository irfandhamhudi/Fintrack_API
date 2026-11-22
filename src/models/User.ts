import { Schema, model, type Document, type Types } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  currency: "IDR";
  timezone: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema<IUser>({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true, select: false },
  currency: { type: String, enum: ["IDR"], default: "IDR" },
  timezone: { type: String, default: "Asia/Jakarta" },
  avatarUrl: String,
}, { timestamps: true });

export const User = model<IUser>("User", schema);
export type UserId = Types.ObjectId;
