/*
  Warnings:

  - You are about to drop the column `userId` on the `Playlist` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `Playlist` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Playlist" DROP CONSTRAINT "Playlist_userId_fkey";

-- DropIndex
DROP INDEX "Playlist_userId_idx";

-- AlterTable
ALTER TABLE "Playlist" DROP COLUMN "userId",
ADD COLUMN     "ownerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
