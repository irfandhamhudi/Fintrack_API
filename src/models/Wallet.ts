import { Schema, model, type Document, type Types } from "mongoose";

export type WalletType = "BANK" | "CASH" | "EWALLET" | "OTHER";
export type RecordStatus = "ACTIVE" | "ARCHIVED";

export interface IWallet extends Document {
  userId: Types.ObjectId;
  name: string;
  type: WalletType;
  initial: number;
  status: RecordStatus;
  color?: string;
  accountNumber?: string;
  cardImage?: string;
}

const schema = new Schema<IWallet>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ["BANK", "CASH", "EWALLET", "OTHER"],
      required: true,
    },
    initial: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ["ACTIVE", "ARCHIVED"], default: "ACTIVE" },
    color: String,
    accountNumber: String,
    cardImage: String,
  },
  { timestamps: true },
);

schema.index({ userId: 1, name: 1 }, { unique: true });
export const Wallet = model<IWallet>("Wallet", schema);
