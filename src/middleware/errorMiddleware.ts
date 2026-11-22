import type { ErrorRequestHandler } from "express";
import mongoose from "mongoose";
import multer from "multer";
import { AppError } from "../utils/AppError.js";

export const errorMiddleware: ErrorRequestHandler = (error, _req, res, _next) => {
  const status = error instanceof AppError
    ? error.statusCode
    : error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE"
      ? 413
      : error instanceof mongoose.Error.ValidationError
        ? 400
        : 500;
  const message = error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE"
    ? "Ukuran file maksimal 8 MB."
    : error instanceof Error ? error.message : "Internal server error";
  res.status(status).json({ success: false, message });
};
