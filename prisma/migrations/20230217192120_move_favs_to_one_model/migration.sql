/*
  Warnings:

  - You are about to drop the `favourite_album` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `favourite_artist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `favourite_track` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "favourite_album" DROP CONSTRAINT "favourite_album_albumId_fkey";

-- DropForeignKey
ALTER TABLE "favourite_artist" DROP CONSTRAINT "favourite_artist_artistId_fkey";

-- DropForeignKey
ALTER TABLE "favourite_track" DROP CONSTRAINT "favourite_track_trackId_fkey";

-- DropTable
DROP TABLE "favourite_album";

-- DropTable
DROP TABLE "favourite_artist";

-- DropTable
DROP TABLE "favourite_track";

-- CreateTable
CREATE TABLE "favourite" (
    "id" SERIAL NOT NULL,
    "artistId" UUID,
    "albumId" UUID,
    "trackId" UUID,

    CONSTRAINT "favourite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "favourite_id_key" ON "favourite"("id");

-- CreateIndex
CREATE UNIQUE INDEX "favourite_artistId_key" ON "favourite"("artistId");

-- CreateIndex
CREATE UNIQUE INDEX "favourite_albumId_key" ON "favourite"("albumId");

-- CreateIndex
CREATE UNIQUE INDEX "favourite_trackId_key" ON "favourite"("trackId");

-- AddForeignKey
ALTER TABLE "favourite" ADD CONSTRAINT "favourite_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favourite" ADD CONSTRAINT "favourite_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favourite" ADD CONSTRAINT "favourite_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "track"("id") ON DELETE SET NULL ON UPDATE CASCADE;
