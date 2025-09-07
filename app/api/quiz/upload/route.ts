import { prisma } from "@/prisma/init";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { title, grade, subject, quiz, teacherId , difficulty } = await req.json();

  if (!title || !grade || !subject || !quiz || !teacherId) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const existingTeacher = await prisma.teacher.findUnique({
      where: { id: teacherId },
    });

    if (!existingTeacher) {
      return new Response(JSON.stringify({ error: "Teacher not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const newQuiz = await prisma.quiz.create({
      data: {
        teacherId: existingTeacher.id,
        title,
        grade,
        subject,
      },
    });

    for (const item of quiz) {
      await prisma.question.create({
        data: {
          question: item.question,
          answer: item.answer,
          options: {
            set: item.options,
          },
          quizId: newQuiz.id,
        },
      });
    }
    return NextResponse.json({ message: "Quiz uploaded successfully" });
  } catch (error) {
    console.error("Error uploading quiz:", error);
    return NextResponse.json({ error: "Failed to upload quiz" });
  }
}
