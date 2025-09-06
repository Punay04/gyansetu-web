import { prisma } from "@/prisma/init";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    const teacher = await prisma.teacher.findUnique({
      where: { email },
    });

    const teacherPassword = teacher?.password;

    if (teacher && teacherPassword === password) {
      const token = jwt.sign({ id: teacher.id }, process.env.JWT_SECRET!, {
        expiresIn: "3d",
      });

      const res = NextResponse.json(
        { message: "Login successful" },
        { status: 200 }
      );

      res.cookies.set("auth_token", token, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 3,
      });
      return res;
    } else {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.log("Error signing in:", error);

    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
