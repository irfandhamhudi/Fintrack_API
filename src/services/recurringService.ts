import cron from "node-cron";
import { Recurring } from "../models/Recurring.js";
import { Transaction } from "../models/Transaction.js";
import { env } from "../config/env.js";

const today = () => new Date().toISOString().slice(0, 10);
const nextDate = (frequency: string, day: number, current: Date) => {
  const next = new Date(current);
  if (frequency === "DAILY") next.setDate(next.getDate() + 1);
  else if (frequency === "WEEKLY") next.setDate(next.getDate() + 7);
  else next.setMonth(next.getMonth() + 1, Math.min(day, 28));
  return next.toISOString().slice(0, 10);
};
export const processRecurring = async () => {
  const current = today();
  const due = await Recurring.find({
    status: "ACTIVE",
    nextRun: { $lte: current },
  });
  for (const item of due) {
    const alreadyCreated = await Transaction.exists({
      recurringId: item._id,
      date: current,
    });
    if (!alreadyCreated)
      await Transaction.create({
        userId: item.userId,
        walletId: item.walletId,
        categoryId: item.categoryId,
        type: item.type,
        amount: item.amount,
        description: `${item.description} (otomatis)`,
        date: current,
        recurringId: item._id,
      });
    item.lastRun = current;
    item.nextRun = nextDate(item.frequency, item.day, new Date());
    await item.save();
  }
};
export const startRecurringWorker = () => {
  cron.schedule(env.RECURRING_CRON_SCHEDULE, () => {
    void processRecurring();
  });
};
