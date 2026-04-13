import { NextRequest, NextResponse } from "next/server";
import { getSessionTokenFromRequest, revokeSessionByToken } from "@/lib/auth";
import { SESSION_COOKIE_NAME } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const token = getSessionTokenFromRequest(req);

  if (token) {
    await revokeSessionByToken(token);
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    path: "/",
    expires: new Date(0),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}