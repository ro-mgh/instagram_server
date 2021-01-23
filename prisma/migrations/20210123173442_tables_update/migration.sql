/*
  Warnings:

  - The migration will change the primary key for the `Folowers` table. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Folowers` table. All the data in the column will be lost.
  - The migration will change the primary key for the `Likes` table. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Likes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Folowers" DROP CONSTRAINT "Folowers_pkey",
DROP COLUMN "id",
ADD PRIMARY KEY ("userId", "followingId");

-- AlterTable
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_pkey",
DROP COLUMN "id",
ADD PRIMARY KEY ("userId", "postId");
