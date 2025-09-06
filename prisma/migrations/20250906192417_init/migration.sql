/*
  Warnings:

  - You are about to drop the column `attendance` on the `Analytics` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `Analytics` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Analytics" DROP COLUMN "attendance",
DROP COLUMN "score",
ADD COLUMN     "points" INTEGER,
ADD COLUMN     "streak" INTEGER,
ADD COLUMN     "timeSpent" INTEGER;

-- CreateTable
CREATE TABLE "public"."Achievement" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "badge" TEXT NOT NULL,
    "awardedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Achievement" ADD CONSTRAINT "Achievement_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
