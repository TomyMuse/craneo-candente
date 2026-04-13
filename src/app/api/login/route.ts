import { NextResponse } from "next/server";
import { loginSchema } from "@/lib/validation";
import { authenticateAdmin, createSession } from "@/lib/auth";
import { SESSION_COOKIE_NAME } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Datos invalidos" }, { status: 400 });
  }

  const user = await authenticateAdmin(parsed.data.username, parsed.data.password);

  if (!user) {
    return NextResponse.json({ error: "Contrasena incorrecta" }, { status: 401 });
  }

  const session = await createSession(user.id);

  const response = NextResponse.json({
    token: session.token,
    expiresAt: session.expiresAt.toISOString(),
  });

  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: session.token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: session.expiresAt,
  });

  return response;
}