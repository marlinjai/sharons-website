// app/api/health/route.ts - Health check endpoint for deployment monitoring
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Basic health check - can be extended with database checks, etc.
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.APP_VERSION || 'unknown',
      environment: process.env.NODE_ENV || 'development',
    };

    return NextResponse.json(health, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'unhealthy', 
        timestamp: new Date().toISOString(),
        error: 'Health check failed' 
      },
      { status: 503 }
    );
  }
} 