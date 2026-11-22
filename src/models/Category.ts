import { Schema, model, type Document, type Types } from "mongoose";

export type EntryType = "INCOME" | "EXPENSE";
export type RecordStatus = "ACTIVE" | "ARCHIVED";

export interface ICategory extends Document {
  userId: Types.ObjectId;
  name: string;
  type: EntryType;
  icon: string;
  color: string;
  status: RecordStatus;
  isDefault: boolean;
}

const schema = new Schema<ICategory>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  name: { type: String, required: true, trim: true },
  type: { type: String, enum: ["INCOME", "EXPENSE"], required: true },
  icon: { type: String, default: "tags" },
  color: { type: String, default: "#0b6b5b" },
  status: { type: String, enum: ["ACTIVE", "ARCHIVED"], default: "ACTIVE" },
  isDefault: { type: Boolean, default: false },
}, { timestamps: true });

schema.index({ userId: 1, name: 1, type: 1 }, { unique: true });
export const Category = model<ICategory>("Category", schema);
