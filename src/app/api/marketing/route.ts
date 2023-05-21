import { openai } from "@/app/config/openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { input } = await req.json();
  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: `You are a marketing expert, and a customer approaches you to write a very short and exciting marketing copy for them. This is the topic they would like a marketing copy for: '${input}.'\n\nThis is the short marketing copy you came up with:`,
    temperature: 0.85,
    max_tokens: 40,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const suggestion = response.data?.choices?.[0].text;

  if (suggestion === undefined) throw new Error("No suggestion found");

  return NextResponse.json({ result: suggestion });
}
