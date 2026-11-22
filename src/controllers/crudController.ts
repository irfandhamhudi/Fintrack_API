import type { Model } from "mongoose";
import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";
import { AppError } from "../utils/AppError.js";

type OwnedModel = Model<any>;
export const listOwned = (ModelClass: OwnedModel) =>
  asyncHandler(async (req: Request, res: Response) => {
    const items = await ModelClass.find({ userId: req.userId }).sort({
      createdAt: -1,
    });
    sendSuccess(res, items);
  });
export const getOwned = (ModelClass: OwnedModel) =>
  asyncHandler(async (req: Request, res: Response) => {
    const item = await ModelClass.findOne({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!item) throw new AppError(404, "Data tidak ditemukan.");
    sendSuccess(res, item);
  });
export const createOwned = (ModelClass: OwnedModel) =>
  asyncHandler(async (req: Request, res: Response) => {
    const item = await ModelClass.create({ ...req.body, userId: req.userId });
    sendSuccess(res, item, "Data berhasil dibuat", 201);
  });
export const updateOwned = (ModelClass: OwnedModel) =>
  asyncHandler(async (req: Request, res: Response) => {
    const item = await ModelClass.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true, runValidators: true },
    );
    if (!item) throw new AppError(404, "Data tidak ditemukan.");
    sendSuccess(res, item, "Data berhasil diperbarui");
  });
export const removeOwned = (ModelClass: OwnedModel) =>
  asyncHandler(async (req: Request, res: Response) => {
    const item = await ModelClass.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!item) throw new AppError(404, "Data tidak ditemukan.");
    sendSuccess(res, null, "Data berhasil dihapus");
  });
