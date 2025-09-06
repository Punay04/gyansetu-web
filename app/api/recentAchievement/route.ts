import { prisma } from "@/prisma/init";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { teacherId } = await request.json();

  if (!teacherId) {
    return new Response(JSON.stringify({ message: "Teacher ID is required" }), {
      status: 400,
    });
  }

  try {
    const recentAchievements = await prisma.teacher.findUnique({
      where: { id: teacherId },
      select: {
        students: {
          select: {
            id: true,
            name: true,
            achievements: {
              orderBy: { awardedAt: "desc" },
              take: 5,
            },
          },
        },
      },
    });

    if (!recentAchievements) {
      return new Response(JSON.stringify([]), { status: 200 });
    }

    const achievements = recentAchievements.students.flatMap((student) =>
      student.achievements.map((achievement) => ({
        studentName: student.name,
        badge: achievement.badge,
        awardedAt: achievement.awardedAt,
      }))
    );

    return new Response(JSON.stringify(achievements), { status: 200 });
  } catch (error) {
    console.error("Error fetching recent achievements:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
