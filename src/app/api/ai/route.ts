import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY!,
})

export async function GET(req: NextRequest) {

    const searchParams = req.nextUrl.searchParams;
    const text = searchParams.get("text");

    if (!text) {
        return NextResponse.json({ data: null }, { status: 400 });
    }

    console.log(text);

    const completion = await groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: `You are an autocomplete assistant. 
For the text content I provide as input, please give me a single text suggestion ranging from 2 to 8 words.
If I send an uncomplete text, start your response with the completion of the text first then the suggestion.
Start with a white space if needed.
Start with a white space if my text content doesn't end with one.
Start with a new line if needed.
All the words should be complete.
DO NOT give more than one suggestion.
Do not add any names. Do Not add full stops in the end.`,
            },
            {
                role: "user",
                content: text!,
            }
        ],
        model: "llama3-8b-8192",
    });

    console.log(completion.choices);

    return NextResponse.json({ data: completion.choices[0].message.content || "" }, { status: 200 });
}

export async function POST(req: NextRequest) {

    const { text } = await req.json();

    if (!text) {
        return NextResponse.json({ data: null }, { status: 400 });
    }

    console.log(text);

    const completion = await groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: `You are an autocomplete assistant. 
For the text content I provide as input, please give me a single text suggestion ranging from 2 to 8 words.
If I send an uncomplete text, start your response with the completion of the text first then the suggestion.
Start with a white space if needed.
Start with a white space if the user text doesn't end with one.
Start with a new line if needed.
All the words should be complete.
DO NOT give more than one suggestion.
Do not add any names. Do Not add full stops in the end.`,
            },
            {
                role: "user",
                content: text!,
            }
        ],
        model: "llama3-8b-8192",
    });

    console.log(completion);

    return NextResponse.json({ data: completion.choices[0].message.content || "" }, { status: 200 });
}