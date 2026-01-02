// app/api/admin/auth/route.ts
// Authentication API endpoints for admin login/logout

import { NextRequest, NextResponse } from 'next/server';
import {
  verifyPassword,
  generateToken,
  setAuthCookie,
  clearAuthCookie,
  isAuthenticated,
} from '@/lib/auth';

// POST /api/admin/auth - Login
export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }

    if (!verifyPassword(password)) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // Generate token and set cookie
    const token = generateToken();
    await setAuthCookie(token);

    return NextResponse.json({ success: true, message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}

// DELETE /api/admin/auth - Logout
export async function DELETE() {
  try {
    await clearAuthCookie();
    return NextResponse.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }
}

// GET /api/admin/auth - Check auth status
export async function GET() {
  const authenticated = await isAuthenticated();
  return NextResponse.json({ authenticated });
}

