// app/api/newsletter/route.ts
// Disabled: the website is a demo mockup, so nothing is received, sent or stored here.
// The previous implementation is in git history.

import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ error: 'This website is a demo. No data is accepted.' }, { status: 410 });
}
