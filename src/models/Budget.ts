import { Schema, model, type Document, type Types } from "mongoose";

export interface IBudget extends Document {
  userId: Types.ObjectId;
  categoryId: Types.ObjectId;
  limit: number;
  month: number;
  year: number;
}
const schema = new Schema<IBudget>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  limit: { type: Number, required: true, min: 1 },
  month: { type: Number, required: true, min: 1, max: 12 },
  year: { type: Number, required: true, min: 2000 },
}, { timestamps: true });
schema.index({ userId: 1, categoryId: 1, month: 1, year: 1 }, { unique: true });
export const Budget = model<IBudget>("Budget", schema);
