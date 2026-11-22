import { app } from "./app.js";
import { connectDatabase } from "./config/db.js";
import { env } from "./config/env.js";
import { startRecurringWorker } from "./services/recurringService.js";

const start = async () => {
  await connectDatabase();
  if (env.NODE_ENV !== "production") startRecurringWorker();
  app.listen(env.PORT, () =>
    console.log(`FinTrack API running on port ${env.PORT}`),
  );
};

void start().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
