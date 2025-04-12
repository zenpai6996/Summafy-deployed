import { CohereClientV2 } from "cohere-ai";
import { SUMMARY_SYSTEM_PROMPT } from "../lib/prompts";

const cohere = new CohereClientV2({
    token: process.env.COHERE_API_KEY || "",
});

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