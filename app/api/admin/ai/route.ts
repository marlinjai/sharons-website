// app/api/admin/ai/route.ts
// AI content generation endpoint using OpenAI

import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST(request: NextRequest) {
  // Check authentication
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check if OpenAI is configured
  if (!OPENAI_API_KEY) {
    return NextResponse.json(
      {
        error: 'AI not configured',
        message: 'Add OPENAI_API_KEY to your environment variables to enable AI features.',
      },
      { status: 501 }
    );
  }

  try {
    const { prompt, context } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Build the message for OpenAI
    const systemMessage = `You are a helpful writing assistant for a blog about hypnotherapy and mental wellness. 
Your task is to transform text as requested. The output should:
- Be professional yet warm and approachable
- Be clear and easy to understand
- Match the tone and style of the original when appropriate

CRITICAL: Return ONLY the transformed text. No explanations, no quotes, no "Here is...", just the pure transformed content.`;

    const userMessage = context 
      ? `${prompt}\n\n"${context}"`
      : prompt;

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: userMessage },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI error:', error);
      return NextResponse.json(
        { error: error.error?.message || 'AI request failed' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const result = data.choices[0]?.message?.content || '';

    return NextResponse.json({ result });
  } catch (error) {
    console.error('AI generation error:', error);
    return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
  }
}

