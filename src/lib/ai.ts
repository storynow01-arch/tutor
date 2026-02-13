import { GoogleGenerativeAI } from '@google/generative-ai';
import { Groq } from 'groq-sdk';

// --- Configuration ---
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || '';
const GEMINI_MODEL_NAME = process.env.GEMINI_MODEL_NAME || 'gemini-1.5-flash';

const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
const GROQ_MODEL_NAME = process.env.GROQ_MODEL_NAME || 'gemma2-9b-it';

// Default temperature (can be overriden by env)
// 0.0 is best for consistent, factual answers.
const AI_TEMPERATURE = parseFloat(process.env.AI_TEMPERATURE || '0.0');

// --- Clients ---
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
const groq = new Groq({ apiKey: GROQ_API_KEY });

export interface AiResponse {
    text: string;
    modelUsed: string;
    provider: 'Gemini' | 'Groq';
}

/**
 * Generates an answer using the dual-model architecture.
 * Priority: 
 * 1. Gemini (Primary)
 * 2. Groq (Fallback)
 */
export async function generateAnswer(query: string, context: string): Promise<AiResponse> {
    const systemPrompt = `
You are a helpful and intelligent AI assistant dealing with student questions.
Your knowledge comes from the following Notion context:

<NotionContext>
${context}
</NotionContext>

Instructions:
1. Answer the user's question based *primarily* on the Notion Context provided.
2. If the answer is not in the context, use your general knowledge but mention that this specific info might not be in the school's Notion documents.
3. Be polite, concise, and helpful.
4. Use Traditional Chinese (繁體中文) for all responses.
`;

    // 1. Try Gemini
    try {
        if (!GOOGLE_API_KEY) throw new Error('GOOGLE_API_KEY is missing');

        console.log(`[AI] Attempting Primary (Gemini): ${GEMINI_MODEL_NAME}`);
        const model = genAI.getGenerativeModel({
            model: GEMINI_MODEL_NAME,
            generationConfig: {
                temperature: AI_TEMPERATURE,
            }
        });

        const result = await model.generateContent([systemPrompt, query]);
        const response = await result.response;
        const text = response.text();

        return {
            text,
            modelUsed: GEMINI_MODEL_NAME,
            provider: 'Gemini'
        };

    } catch (geminiError: any) {
        console.warn(`[AI] Gemini failed: ${geminiError.message}. Switching to Fallback (Groq)...`);

        // 2. Try Groq (Fallback)
        try {
            if (!GROQ_API_KEY) throw new Error('GROQ_API_KEY is missing');

            console.log(`[AI] Attempting Fallback (Groq): ${GROQ_MODEL_NAME}`);

            const completion = await groq.chat.completions.create({
                messages: [
                    {
                        role: 'system',
                        content: systemPrompt
                    },
                    {
                        role: 'user',
                        content: query
                    }
                ],
                model: GROQ_MODEL_NAME,
                temperature: AI_TEMPERATURE,
            });

            const text = completion.choices[0]?.message?.content || '';

            return {
                text,
                modelUsed: GROQ_MODEL_NAME,
                provider: 'Groq'
            };

        } catch (groqError: any) {
            console.error(`[AI] Groq also failed: ${groqError.message}`);

            return {
                text: `抱歉，系統目前忙碌中 (AI Service Unavailable)。\n\n[Primary Error]: ${geminiError.message}\n\n[Fallback Error]: ${groqError.message}`,
                modelUsed: 'none',
                provider: 'Gemini' // technically failed both, but keep type safe
            };
        }
    }
}
