// lib/auth.ts
// Authentication utilities for admin panel

import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const COOKIE_NAME = 'admin_token';
const TOKEN_EXPIRY = '7d'; // Token valid for 7 days

// Token payload type
interface TokenPayload {
  isAdmin: boolean;
  iat: number;
  exp: number;
}

// Verify admin password
export function verifyPassword(password: string): boolean {
  // Timing-safe comparison to prevent timing attacks
  if (password.length !== ADMIN_PASSWORD.length) {
    return false;
  }
  let result = 0;
  for (let i = 0; i < password.length; i++) {
    result |= password.charCodeAt(i) ^ ADMIN_PASSWORD.charCodeAt(i);
  }
  return result === 0;
}

// Generate JWT token
export function generateToken(): string {
  return jwt.sign({ isAdmin: true }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

// Verify JWT token
export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

// Set auth cookie (for use in API routes) - async for Next.js 16
export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
    path: '/',
  });
}

// Clear auth cookie (for logout) - async for Next.js 16
export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

// Get token from cookies - async for Next.js 16
export async function getTokenFromCookies(): Promise<string | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_NAME);
  return cookie?.value || null;
}

// Check if user is authenticated (for use in server components/API routes)
export async function isAuthenticated(): Promise<boolean> {
  const token = await getTokenFromCookies();
  if (!token) return false;
  const payload = verifyToken(token);
  return payload !== null && payload.isAdmin;
}

// Get cookie name for client-side use
export function getAuthCookieName(): string {
  return COOKIE_NAME;
}

