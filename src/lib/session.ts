import "server-only";
import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "stopshop_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7;
const ALG = "HS256";

export type SessionPayload = { userId: number; email: string };

function getKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET não está configurado.");
  }
  return new TextEncoder().encode(secret);
}

export async function signSession(payload: SessionPayload) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getKey());
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getKey(), { algorithms: [ALG] });
    if (typeof payload.userId !== "number" || typeof payload.email !== "string") {
      return null;
    }
    return { userId: payload.userId, email: payload.email };
  } catch {
    return null;
  }
}
