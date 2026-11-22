import bcrypt from "bcrypt";
import jwt, { type SignOptions } from "jsonwebtoken";
import type { Response } from "express";
import { env } from "../config/env.js";
import { User, type IUser } from "../models/User.js";
import { Category } from "../models/Category.js";
import { AppError } from "../utils/AppError.js";

export const publicUser = (user: IUser) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  currency: user.currency,
  timezone: user.timezone,
  avatarUrl: user.avatarUrl,
  createdAt: user.createdAt,
});
export const issueSession = (res: Response, user: IUser) => {
  const token = jwt.sign(
    { sub: user._id.toString(), email: user.email },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"] },
  );
  res.cookie("fintrack_token", token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: env.JWT_COOKIE_EXPIRES_IN * 86400000,
  });
  return token;
};
export const register = async (
  name: string,
  email: string,
  password: string,
) => {
  const normalized = email.toLowerCase().trim();
  if (await User.exists({ email: normalized }))
    throw new AppError(409, "Email sudah terdaftar.");
  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ name: name.trim(), email: normalized, passwordHash });
  const defaults = [
    ["Gaji", "INCOME", "briefcase", "#0b6b5b"],
    ["Makanan & Minuman", "EXPENSE", "utensils", "#d47b62"],
    ["Transportasi", "EXPENSE", "car", "#5c8d89"],
    ["Belanja", "EXPENSE", "shopping-bag", "#c58b45"],
    ["Tagihan", "EXPENSE", "receipt", "#7a79a8"],
    ["Hiburan", "EXPENSE", "sparkles", "#b26d9c"],
  ] as const;
  await Category.insertMany(defaults.map(([categoryName, type, icon, color]) => ({ userId: user._id, name: categoryName, type, icon, color, isDefault: true })));
  return user;
};
export const authenticate = async (email: string, password: string) => {
  const user = await User.findOne({ email: email.toLowerCase().trim() }).select(
    "+passwordHash",
  );
  if (!user || !(await bcrypt.compare(password, user.passwordHash)))
    throw new AppError(401, "Email atau password salah.");
  return user;
};
