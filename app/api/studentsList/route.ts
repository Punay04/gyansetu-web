import { prisma } from "@/prisma/init";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { teacherId } = await req.json();

  if (!teacherId) {
    return NextResponse.json(
      { message: "Teacher ID is required" },
      { status: 400 }
    );
  }

  try {
    const students = await prisma.student.findMany({
      where: { teacherId: teacherId },
      include: {
        analytics: true,
        achievements: true,
      },
    });

    return NextResponse.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { message: "Error fetching students" },
      { status: 500 }
    );
  }
}
