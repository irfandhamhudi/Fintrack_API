import { Router } from "express";
import { authLimiter } from "../middleware/rateLimiter.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import {
  registerController,
  loginController,
  logoutController,
   meController,
   updateMeController,
} from "../controllers/authController.js";

const router = Router();
router.post("/register", authLimiter, registerController);
router.post("/login", authLimiter, loginController);
router.post("/logout", logoutController);
router.get("/me", requireAuth, meController);
router.patch("/me", requireAuth, updateMeController);
export default router;
