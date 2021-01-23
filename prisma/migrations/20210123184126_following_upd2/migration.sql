/*
  Warnings:

  - You are about to drop the `Folowing` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Folowing" DROP CONSTRAINT "Folowing_userId_fkey";

-- CreateTable
CREATE TABLE "Following" (
    "userId" INTEGER NOT NULL,
    "followingId" INTEGER NOT NULL,

    PRIMARY KEY ("userId","followingId")
);

-- DropTable
DROP TABLE "Folowing";

-- CreateIndex
CREATE UNIQUE INDEX "Following.userId_followingId_unique" ON "Following"("userId", "followingId");

-- AddForeignKey
ALTER TABLE "Following" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
