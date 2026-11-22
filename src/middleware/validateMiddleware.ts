import type { RequestHandler } from "express";
import { z, type ZodTypeAny } from "zod";

export const validate =
  (schema: ZodTypeAny): RequestHandler =>
  (req, _res, next) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });
    if (!result.success)
      return next(
        new Error(result.error.issues.map((item) => item.message).join(", ")),
      );
    req.body = result.data.body;
    next();
  };
export const objectId = z.string().regex(/^[a-f\d]{24}$/i, "ID tidak valid");
