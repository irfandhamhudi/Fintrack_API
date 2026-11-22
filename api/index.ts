import type { VercelRequest, VercelResponse } from "@vercel/node";
import { app } from "../src/app.js";
import { connectDatabase } from "../src/config/db.js";

let databaseConnection: Promise<void> | null = null;

const handler = async (req: VercelRequest, res: VercelResponse) => {
  databaseConnection ??= connectDatabase();
  await databaseConnection;
  if (req.url?.startsWith("/api/")) {
    req.url = req.url.slice(4) || "/";
  }
  return app(req, res);
};

export default handler;
