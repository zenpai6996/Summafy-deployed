import { CohereClientV2 } from "cohere-ai";
import { SUMMARY_SYSTEM_PROMPT } from "../lib/prompts";
import {GoogleGenerativeAI} from "@google/generative-ai";

const cohere = new CohereClientV2({
    token: process.env.COHERE_API_KEY || "",
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const generateSummaryFromCohere = async (pdfText: string) => {
    try {
        const response = await cohere.chat({
            model: "command-a-03-2025",
            messages:[{
                role:'user',
                content: `${SUMMARY_SYSTEM_PROMPT}\n\nSummarize this document in an engaging, easy-to-read format with emojis and markdown:\n\n${pdfText}`,
            }] ,
            temperature: 0.7,
        });

        // Extract the text content from the response
        if (response?.message?.content) {
            // Handle both string and object content formats
            const content = response.message.content;
            if (typeof content === 'string') {
                return content;
            } else if (Array.isArray(content) && content[0]?.text) {
                return content[0].text;
            }
        }

        throw new Error("Unexpected response format from Cohere");

    } catch (error: any) {
        console.error("Cohere API Error:", error.response?.data || error.message);
        throw new Error("Failed to generate summary: " + (error.message || "Unknown error"));
    }
};

// aiService.ts
export const generateExplanation = async (point: string, context: string, source?: 'cohere' | 'gemini') => {
    // Try the specified source first, then fallback to the other
    const tryOrder = source ?
        [source, source === 'cohere' ? 'gemini' : 'cohere'] :
        ['cohere', 'gemini'];

    for (const service of tryOrder) {
        try {
            if (service === 'cohere') {
                const response = await cohere.chat({
                    model: "command-a-03-2025",
                    messages: [{
                        role: 'system',
                        content: `You are an expert at explaining concepts in simple terms. Provide a concise explanation (4-5 sentences) of the following point, using the provided document context. Focus on making it clear and insightful.`
                    }, {
                        role: 'user',
                        content: `Point to explain: ${point}\n\nDocument Context:\n${context}`
                    }],
                    temperature: 0.5,
                });

                if (response?.message?.content) {
                    const content = response.message.content;
                    if (typeof content === 'string') {
                        return { explanation: content, source: 'cohere' };
                    } else if (Array.isArray(content) && content[0]?.text) {
                        return { explanation: content[0].text, source: 'cohere' };
                    }
                }
            }
            else if (service === 'gemini') {
                const model = genAI.getGenerativeModel({
                    model: 'gemini-1.5-pro-002',
                    generationConfig: {
                        temperature: 0.5,
                        maxOutputTokens: 500,
                    },
                });

                const prompt = {
                    contents: [{
                        role: 'user',
                        parts: [{
                            text: `Explain the following point in 4-5 sentences using the provided context. Keep it clear and insightful.\n\nPoint: ${point}\n\nContext:\n${context}`
                        }]
                    }]
                };

                const result = await model.generateContent(prompt);
                const response = await result.response;
                const text = response.text();

                if (text) {
                    return { explanation: text, source: 'gemini' };
                }
            }
        } catch (error: any) {
            console.error(`${service} API Error:`, error.response?.data || error.message);
            // Continue to next service
        }
    }

    return {
        explanation: "Could not generate explanation due to service limitations.",
        source: 'none'
    };
};