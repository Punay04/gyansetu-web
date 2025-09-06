import { prisma } from "@/prisma/init";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    const existingTeacher = await prisma.teacher.findUnique({
      where: { email },
    });

    if (existingTeacher) {
      return NextResponse.json(
        { message: "Teacher with this email already exists" },
        { status: 400 }
      );
    }

    await prisma.teacher.create({
      data: {
        name,
        email,
        password,
      },
    });

    return NextResponse.json({ message: "Teacher created successfully" });
  } catch (error) {
    console.error("Error creating teacher:", error);
    return NextResponse.json(
      { message: "Error creating teacher" },
      { status: 500 }
    );
  }
}
