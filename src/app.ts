import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { env } from "./config/env.js";
import routes from "./routes/index.js";
import { apiLimiter } from "./middleware/rateLimiter.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";

export const app = express();
app.set("trust proxy", 1);
app.use(cors({
  origin: env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(apiLimiter);
app.get("/health", (_req, res) =>
  res.json({
    success: true,
    service: "fintrack-backend",
    timestamp: new Date().toISOString(),
  }),
);
app.use("/api/v1", routes);
app.use((_req, res) =>
  res.status(404).json({ success: false, message: "Route tidak ditemukan" }),
);
app.use(errorMiddleware);
