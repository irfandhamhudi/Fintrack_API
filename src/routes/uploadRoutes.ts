import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";
import cloudinary from "../config/cloudinary.js";
import { sendSuccess } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";
import { env } from "../config/env.js";
import { User } from "../models/User.js";

const router = Router();
router.post(
  "/",
  requireAuth,
  upload.single("file"),
  asyncHandler(async (req, res) => {
    if (!req.file) throw new AppError(400, "File wajib diisi.");
    const folder = req.body.type === "avatar" ? "fintrack/avatars" : "fintrack";
    const result = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder,
            resource_type: "image",
            tags: [env.CLOUDINARY_UPLOAD_PRESET],
          },
          (error, uploaded) => {
            if (error) {
              reject(new AppError(502, error.message ?? "Upload Cloudinary gagal."));
              return;
            }
            if (!uploaded?.secure_url) {
              reject(new AppError(502, "Cloudinary tidak mengembalikan URL file."));
              return;
            }
            resolve(uploaded as { secure_url: string });
          },
        );
        stream.end(req.file?.buffer);
      },
    );
    sendSuccess(res, { url: result.secure_url }, "File berhasil diunggah", 201);
  }),
);
export default router;
