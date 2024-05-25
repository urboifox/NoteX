import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {

    const { text } = await req.json();

    if (!text) {
        return NextResponse.json({ data: null }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    const chat = model.startChat({
        history: [
            {
                role: "user",
                parts: [
                    { text: "You are an Autocomplete assistant." },
                    { text: "For the text content I provide as input, please give me a single text completion suggestion ranging from 2 to 8 words." },
                    { text: "If I send an uncomplete text, start your response with the completion of the text first then the suggestion." },
                    { text: "Start with a white space if needed." },
                    { text: "Start with a white space if my text content is uncomplete." },
                    { text: "ONLY response with the suggestion, dont re send my message." },
                    { text: "Make sure you dont re send my text. for example if i give you: hello there m. you will get me: om, how you been" },
                    { text: "DO NOT give more than one suggestion." },
                    { text: "All the words should be complete." },
                    { text: "IF the last word of my text is complete, start your response with a white space if needed." },
                    { text: "DO NOT give more than one suggestion." },
                    { text: "DO NOT include new lines. in any part of the response, only text, and dont add forward slashes." },
                    { text: "Do not add any names. Do Not add full stops in the end." },
                ],
            },
            {
                role: "model",
                parts: [{ text: "Sure, please send your text" }],
            }
        ],
        generationConfig: {
            maxOutputTokens: 100,
        },
    });

    const result = await chat.sendMessage(text);
    const response = result.response.text();

    return NextResponse.json({ data: response }, { status: 200 });
}