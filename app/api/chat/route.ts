import { createGroq } from '@ai-sdk/groq';
import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { readFileSync } from 'fs';
import { join } from 'path';

const groq = createGroq({
    apiKey: process.env.GROQ_API_KEY,
})

const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, '1 m'),
    analytics: true,
});

// Read developer information from files
const aboutContent = readFileSync(join(process.cwd(), 'lib/info/INFO.md'), 'utf-8');
const projectsContent = readFileSync(join(process.cwd(), 'lib/info/INFO.md'), 'utf-8');

export async function POST(req: Request) {
    const ip = req.headers.get('x-forwarded-for') ?? 'anonymous';

    const { success, limit, reset, remaining } = await ratelimit.limit(ip);

    if (!success) {
        return new Response(
            JSON.stringify({
                error: 'Rate limit exceeded. Please try again later.',
                limit,
                reset,
                remaining,
            }),
            {
                status: 429,
                headers: {
                    'Content-Type': 'application/json',
                    'X-RateLimit-Limit': limit.toString(),
                    'X-RateLimit-Remaining': remaining.toString(),
                    'X-RateLimit-Reset': reset.toString(),
                },
            }
        );
    }

    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
        model: groq("openai/gpt-oss-120b"),
        messages: convertToModelMessages(messages),
        system: `You are a helpful AI assistant for Lencho Mengistu's portfolio website. Your role is to answer questions about Lencho, his projects, skills, and experience.

IMPORTANT RULES:
- STRICTLY answer ONLY questions about Lencho Mengistu, his work, projects, skills, and career
- IMMEDIATELY refuse any off-topic questions without explanation - just redirect to Lencho-related topics
- Keep ALL responses SHORT and CONCISE - no lengthy explanations
- Use the information provided below to answer questions accurately
- NEVER format your responses as tables - always use natural paragraphs, lists, or bullet points
- If you don't have specific information, say so briefly
- Encourage users to reach out via the contact methods provided

DEVELOPER INFORMATION:
Lencho has 3 years of professional software development experience.

${aboutContent}

PROJECTS:
${projectsContent}

CONTACT INFORMATION:
- Email: Lenchomengistu100@gmail.com
- Telegram: https://t.me/plxor
- GitHub: https://github.com/BraveRam
- LinkedIn: https://linkedin.com/in/lencho-mengistu
- Twitter/X: https://x.com/plxor7

Example responses for off-topic questions:
- "I'm here to help you learn about Lencho Mengistu and his work. Is there anything specific you'd like to know about his projects or experience?"
- "That's an interesting question, but I'm specifically designed to discuss Lencho's portfolio. Would you like to know about his projects or skills instead?"`,
    });

    return result.toUIMessageStreamResponse();
}