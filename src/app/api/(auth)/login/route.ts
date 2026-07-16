import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { env } from "@/features/shared/app/env";

const SECRET = process.env.JWT_SECRET || "dev-secret";

export async function POST(req: Request) {
  const { email, remember } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const maxAge = remember ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7;
  const token = jwt.sign({ email, role: "employee" }, SECRET, { expiresIn: maxAge });

  const res = NextResponse.json({ success: true });

  res.cookies.set(`${env.storagePrefix}token`, token, {
    httpOnly: true,
    secure: env.isProduction,
    sameSite: "lax",
    path: "/",
    maxAge,
  });

  return res;
}
