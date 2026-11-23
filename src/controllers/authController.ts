import { z } from "zod";
import type { Request, Response } from "express";
import {
  authenticate,
  issueSession,
  publicUser,
  register,
} from "../services/authService.js";
import { sendSuccess } from "../utils/apiResponse.js";
import { User } from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";

const credentials = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email(),
  password: z.string().min(6).max(128),
});
export const registerController = asyncHandler(
  async (req: Request, res: Response) => {
    const input = credentials
      .extend({ name: z.string().min(2) })
      .parse(req.body);
    const user = await register(input.name, input.email, input.password);
  const token = issueSession(res, user);
  sendSuccess(res, { user: publicUser(user), token }, "Registrasi berhasil", 201);
  },
);
export const loginController = asyncHandler(
  async (req: Request, res: Response) => {
    const input = credentials.omit({ name: true }).parse(req.body);
    const user = await authenticate(input.email, input.password);
  const token = issueSession(res, user);
  sendSuccess(res, { user: publicUser(user), token }, "Login berhasil");
  },
);
export const logoutController = asyncHandler(async (_req, res) => {
  res.clearCookie("fintrack_token");
  sendSuccess(res, null, "Logout berhasil");
});
export const updateMeController = asyncHandler(async (req, res) => {
  const input = z.object({ name: z.string().min(2).max(100).optional(), email: z.string().email().optional(), avatarUrl: z.string().url().optional() }).parse(req.body);
  const user = await User.findByIdAndUpdate(req.userId, input, { new: true, runValidators: true });
  if (!user) throw new AppError(404, "Pengguna tidak ditemukan.");
  sendSuccess(res, { user: publicUser(user) }, "Profil berhasil diperbarui.");
});
export const meController = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) throw new AppError(404, "Pengguna tidak ditemukan.");
  sendSuccess(res, { user: publicUser(user) });
});
