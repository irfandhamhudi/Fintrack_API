import { Schema, model, type Document, type Types } from "mongoose";

export interface IGoal extends Document {
  userId: Types.ObjectId;
  name: string;
  target: number;
  allocated: number;
  color: string;
  date: string;
  walletId?: Types.ObjectId;
  allocations: Map<string, number>;
}
const schema = new Schema<IGoal>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  name: { type: String, required: true, trim: true },
  target: { type: Number, required: true, min: 1 },
  allocated: { type: Number, default: 0, min: 0 },
  color: { type: String, default: "#0b6b5b" },
  date: { type: String, required: true },
  walletId: { type: Schema.Types.ObjectId, ref: "Wallet" },
  allocations: { type: Map, of: Number, default: {} },
}, { timestamps: true });
export const Goal = model<IGoal>("Goal", schema);
