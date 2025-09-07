import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

export async function POST(req: NextRequest) {
  const { userData, language } = await req.json();

  if (!userData) {
    return new Response(JSON.stringify({ error: "No user data provided" }), {
      status: 400,
    });
  }

  try {
    const prompt = `
You are an educational AI assistant helping teachers evaluate students. 

Your task is to generate a teacher-facing report based on the following student data:
${JSON.stringify(userData, null, 2)}

Rules:
1. Write the entire report ONLY in ${language || "English"}.
2. The response must be in natural language sentences, like a teacher writing a report. 
   Do NOT use LaTeX, math symbols, equations, or special characters. 
   Only use letters, numbers, spaces, and line breaks.
3. The report should be detailed (at least 5–6 paragraphs).
4. Cover these sections in order:
   - Overview of the student's learning behavior
   - Key strengths of the student
   - Weaknesses or areas for improvement
   - Suggested teaching strategies for the teacher
   - Expected outcomes if strategies are applied
   - Motivational closing remarks
5. Absolutely avoid formulas, sets, brackets, or symbolic notation. 
   The text should read like a teacher’s feedback report, not a mathematical paper.

Important: The final response must be written only in ${
      language || "English"
    } and 
should contain NO English words if another language is requested.
`;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `${prompt}`,
    });

    const analysis = response.text;

    return NextResponse.json({ analysis, message: "AI analysis generated" });
  } catch (error) {
    console.error("Error generating AI analysis:", error);
    return NextResponse.json(
      { message: "Failed to generate AI analysis" },
      { status: 500 }
    );
  }
}
