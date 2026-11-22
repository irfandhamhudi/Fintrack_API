import { Schema, model, type Document, type Types } from "mongoose";
import type { EntryType } from "./Category.js";

export interface ITransaction extends Document {
  userId: Types.ObjectId;
  walletId: Types.ObjectId;
  categoryId: Types.ObjectId;
  type: EntryType;
  amount: number;
  description: string;
  date: string;
  recurringId?: Types.ObjectId;
}

const schema = new Schema<ITransaction>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  walletId: { type: Schema.Types.ObjectId, ref: "Wallet", required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  type: { type: String, enum: ["INCOME", "EXPENSE"], required: true },
  amount: { type: Number, required: true, min: 1 },
  description: { type: String, required: true, trim: true, maxlength: 240 },
  date: { type: String, required: true, match: /^\d{4}-\d{2}-\d{2}$/ },
  recurringId: { type: Schema.Types.ObjectId, ref: "Recurring" },
}, { timestamps: true });

schema.index({ userId: 1, date: -1 });
export const Transaction = model<ITransaction>("Transaction", schema);
