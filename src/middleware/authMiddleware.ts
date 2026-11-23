import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { User } from "../models/User.js";
import { AppError } from "../utils/AppError.js";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const requireAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const bearer = req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.slice(7)
      : undefined;
    const token = bearer ?? req.cookies.fintrack_token;
    if (!token) throw new AppError(401, "Autentikasi diperlukan.");
    const payload = jwt.verify(token, env.JWT_SECRET) as { sub?: string };
    if (!payload.sub || !(await User.exists({ _id: payload.sub })))
      throw new AppError(401, "Sesi tidak valid.");
    req.userId = payload.sub;
    next();
  } catch (error) {
    next(
      error instanceof AppError
        ? error
        : new AppError(401, "Sesi tidak valid."),
    );
  }
};
