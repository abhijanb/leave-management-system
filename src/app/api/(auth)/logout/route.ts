import { NextResponse } from "next/server";
import { env } from "@/features/shared/app/env";

export async function POST() {
  const res = NextResponse.json({ success: true });

  res.cookies.set(`${env.storagePrefix}token`, "", {
    httpOnly: true,
    secure: env.isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return res;
}
