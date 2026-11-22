import { Router } from "express";
import authRoutes from "./authRoutes.js";
import resourceRoutes from "./resourceRoutes.js";
import uploadRoutes from "./uploadRoutes.js";

const router = Router();
router.use("/auth", authRoutes);
router.use("/uploads", uploadRoutes);
router.use(resourceRoutes);
export default router;
