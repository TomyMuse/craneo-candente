import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE_NAME, SESSION_TTL_MS } from "@/lib/constants";
import { prisma } from "@/lib/prisma";

export type AuthSession = {
  token: string;
  expiresAt: Date;
  adminUserId: string;
};

function getSessionSecret(): string {
  return process.env.SESSION_SECRET ?? "dev-session-secret-change-me";
}

export function createSessionToken(): string {
  const nonce = crypto.randomBytes(32).toString("hex");
  return crypto
    .createHmac("sha256", getSessionSecret())
    .update(`${nonce}:${Date.now()}`)
    .digest("hex");
}

export function getSessionTokenFromRequest(req: NextRequest): string | null {
  const cookieToken = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (cookieToken) return cookieToken;

  const authHeader = req.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice("Bearer ".length).trim();
  }

  return null;
}

export async function createSession(adminUserId: string): Promise<AuthSession> {
  const token = createSessionToken();
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);

  await prisma.session.create({
    data: {
      token,
      adminUserId,
      expiresAt,
    },
  });

  return { token, expiresAt, adminUserId };
}

export async function revokeSessionByToken(token: string): Promise<void> {
  await prisma.session.updateMany({
    where: { token, revokedAt: null },
    data: { revokedAt: new Date() },
  });
}

export async function getValidSession(token: string) {
  const session = await prisma.session.findUnique({
    where: { token },
    include: { adminUser: true },
  });

  if (!session) return null;
  if (session.revokedAt) return null;
  if (session.expiresAt.getTime() <= Date.now()) return null;

  return session;
}

export async function authenticateAdmin(username: string, password: string) {
  const user = await prisma.adminUser.findUnique({ where: { username } });
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) return null;

  return user;
}