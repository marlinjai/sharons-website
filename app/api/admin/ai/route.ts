// app/api/admin/ai/route.ts
// AI content generation endpoint using OpenAI with full article context

import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Article metadata for context
interface ArticleContext {
  title?: string;
  subtitle?: string;
  category?: string;
  fullContent?: string; // HTML content of the full article
}

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
    const { prompt, selectedText, articleContext } = await request.json() as {
      prompt: string;
      selectedText: string;
      articleContext?: ArticleContext;
    };

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Build context-aware system message
    let systemMessage = `You are an expert writing assistant for a blog about hypnotherapy, mental wellness, and personal transformation.

## Your Role
You help edit and improve text within blog articles. You have full context about the article being edited.

## Article Context`;

    if (articleContext) {
      if (articleContext.title) {
        systemMessage += `\n- **Title:** ${articleContext.title}`;
      }
      if (articleContext.subtitle) {
        systemMessage += `\n- **Subtitle:** ${articleContext.subtitle}`;
      }
      if (articleContext.category) {
        systemMessage += `\n- **Category:** ${articleContext.category}`;
      }
    }

    systemMessage += `

## Guidelines
1. **Maintain consistency** with the article's existing tone, style, and terminology
2. **Partial word selections:** If the user selected only part of a word, treat it as the full word and return the complete corrected word
3. **Context awareness:** Consider how your edit fits with the surrounding content
4. **Professional yet warm:** This blog has a friendly, approachable voice while being informative
5. **Preserve formatting:** If the selection includes formatting (bold, italic, etc.), maintain it appropriately

## Critical Rules
- Return ONLY the transformed text
- No explanations, no quotes, no "Here is..."
- No markdown formatting unless it was in the original
- Match the length appropriately (don't drastically change length unless asked)`;

    // Build user message with full article context
    let userMessage = `## Task\n${prompt}\n\n## Selected Text to Transform\n"${selectedText}"`;

    if (articleContext?.fullContent) {
      // Strip HTML tags for cleaner context, limit length
      const plainText = articleContext.fullContent
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 3000); // Limit to ~3000 chars to save tokens

      userMessage += `\n\n## Full Article Content (for context)\n${plainText}`;
    }

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

