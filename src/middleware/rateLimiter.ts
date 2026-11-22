import { rateLimit } from "express-rate-limit";
import { env } from "../config/env.js";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: env.NODE_ENV === "development" ? 2000 : 600,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  skip: (req) => req.path === "/health" || req.path === "/auth/me" || req.path === "/auth/logout",
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: env.NODE_ENV === "development" ? 100 : 20,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});
