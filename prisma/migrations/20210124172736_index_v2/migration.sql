/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[postId]` on the table `Likes`. If there are existing duplicate values, the migration will fail.

*/
-- DropIndex
DROP INDEX "Likes.userId_postId_unique";

-- CreateIndex
CREATE INDEX "Comments.postId_index" ON "Comments"("postId");

-- CreateIndex
CREATE INDEX "Likes.postId_index" ON "Likes"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "Likes.postId_unique" ON "Likes"("postId");
