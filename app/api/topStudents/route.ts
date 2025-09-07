import { prisma } from "@/prisma/init";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("Request body:", body); // <-- check what is actually coming

  const teacherId = body.teacherId; //

  if (!teacherId) {
    return new Response(JSON.stringify({ message: "Teacher ID is required" }), {
      status: 400,
    });
  }

  try {
    const topStudents = await prisma.teacher.findUnique({
      where: { id: teacherId },
      select: {
        students: {
          select: {
            id: true,
            name: true,
            email: true,
            class: true,
            analytics: {
              select: {
                points: true,
              },
            },
            achievements: true,
          },
        },
      },
    });

    if (!topStudents) {
      return new Response(JSON.stringify([]), { status: 200 });
    }

    return new Response(JSON.stringify(topStudents.students), { status: 200 });
  } catch (error) {
    console.error("Error fetching top students:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
