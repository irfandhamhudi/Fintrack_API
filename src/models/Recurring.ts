import { Schema, model, type Document, type Types } from "mongoose";
import type { EntryType } from "./Category.js";

export type RecurringFrequency = "DAILY" | "WEEKLY" | "MONTHLY";
export type RecurringStatus = "ACTIVE" | "ARCHIVED";
export interface IRecurring extends Document {
  userId: Types.ObjectId;
  description: string;
  type: EntryType;
  amount: number;
  categoryId: Types.ObjectId;
  walletId: Types.ObjectId;
  frequency: RecurringFrequency;
  day: number;
  status: RecurringStatus;
  lastRun?: string;
  nextRun: string;
}
const schema = new Schema<IRecurring>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  description: { type: String, required: true, trim: true },
  type: { type: String, enum: ["INCOME", "EXPENSE"], required: true },
  amount: { type: Number, required: true, min: 1 },
  categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  walletId: { type: Schema.Types.ObjectId, ref: "Wallet", required: true },
  frequency: { type: String, enum: ["DAILY", "WEEKLY", "MONTHLY"], required: true },
  day: { type: Number, required: true, min: 1, max: 31 },
  status: { type: String, enum: ["ACTIVE", "ARCHIVED"], default: "ACTIVE" },
  lastRun: String,
  nextRun: { type: String, required: true, index: true },
}, { timestamps: true });
export const Recurring = model<IRecurring>("Recurring", schema);
