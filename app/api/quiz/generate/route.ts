import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

export async function POST(req: NextRequest) {
  const { grade, subject, count, difficulty } = await req.json();

  // Validate inputs
  if (!grade || !subject || !count || !difficulty) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (count < 3 || count > 10) {
    return new Response(
      JSON.stringify({ error: "Count must be between 3 and 10" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const prompt = `
You are a quiz generator. 
Generate a quiz for grade ${grade} students on the subject of ${subject}. 
The quiz must contain exactly ${count} multiple-choice questions of difficulty level ${difficulty}. 

Each question must follow this strict JSON schema:
[
  {
    "question": "string",
    "options": ["string", "string", "string", "string"],
    "answer": "string"
  }
]

Rules:
- Output ONLY valid JSON.
- Do not include markdown formatting, explanations, or extra text.
- Each question must have exactly 4 options.
- "answer" must exactly match one of the options.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `${prompt}`,
    });

    const text = response.text;

    return NextResponse.json({
      quiz: JSON.parse(text!),
    });
  } catch (error) {
    console.error("Error generating quiz:", error);
    return NextResponse.json({
      error: "Failed to generate quiz",
    });
  }
}
