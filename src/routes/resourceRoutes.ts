import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { Wallet } from "../models/Wallet.js";
import { Category } from "../models/Category.js";
import { Transaction } from "../models/Transaction.js";
import { Budget } from "../models/Budget.js";
import { Goal } from "../models/Goal.js";
import { Recurring } from "../models/Recurring.js";
import {
  createOwned,
  getOwned,
  listOwned,
  removeOwned,
  updateOwned,
} from "../controllers/crudController.js";

const router = Router();
router.use(requireAuth);
const resources = [
  ["wallets", Wallet],
  ["categories", Category],
  ["transactions", Transaction],
  ["budgets", Budget],
  ["goals", Goal],
  ["recurring", Recurring],
] as const;
for (const [path, ModelClass] of resources) {
  router.get(`/${path}`, listOwned(ModelClass));
  router.get(`/${path}/:id`, getOwned(ModelClass));
  router.post(`/${path}`, createOwned(ModelClass));
  router.patch(`/${path}/:id`, updateOwned(ModelClass));
  router.delete(`/${path}/:id`, removeOwned(ModelClass));
}
export default router;
