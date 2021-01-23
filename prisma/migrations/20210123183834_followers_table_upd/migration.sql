/*
  Warnings:

  - You are about to drop the `Folowers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Folowers" DROP CONSTRAINT "Folowers_userId_fkey";

-- CreateTable
CREATE TABLE "Folowing" (
    "userId" INTEGER NOT NULL,
    "followingId" INTEGER NOT NULL,

    PRIMARY KEY ("userId","followingId")
);

-- DropTable
DROP TABLE "Folowers";

-- CreateIndex
CREATE UNIQUE INDEX "Folowing.userId_followingId_unique" ON "Folowing"("userId", "followingId");

-- AddForeignKey
ALTER TABLE "Folowing" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
