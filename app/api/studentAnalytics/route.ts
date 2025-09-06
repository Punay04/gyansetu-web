import { prisma } from "@/prisma/init";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { studentId } = await req.json();

  if (!studentId) {
    return new Response(JSON.stringify({ message: "Student ID is required" }), {
      status: 400,
    });
  }

  try {
    const studentData = await prisma.student.findUnique({
      where: { id: studentId },
      select: {
        id: true,
        name: true,
        email: true,
        class: true,
        analytics: true,
        achievements: true,
      },
    });

    if (!studentData) {
      return new Response(JSON.stringify({ message: "Student not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(studentData), { status: 200 });
  } catch (error) {
    console.error("Error fetching student data:", error);
    return new Response(
      JSON.stringify({ message: "Error fetching student data" }),
      { status: 500 }
    );
  }
}
