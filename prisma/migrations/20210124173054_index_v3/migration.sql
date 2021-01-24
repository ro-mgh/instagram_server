/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[userId,postId]` on the table `Likes`. If there are existing duplicate values, the migration will fail.

*/
-- DropIndex
DROP INDEX "Likes.postId_unique";

-- CreateIndex
CREATE UNIQUE INDEX "Likes.userId_postId_unique" ON "Likes"("userId", "postId");
