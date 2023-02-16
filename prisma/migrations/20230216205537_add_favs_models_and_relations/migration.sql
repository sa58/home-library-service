-- CreateTable
CREATE TABLE "favourite_artist" (
    "id" SERIAL NOT NULL,
    "artistId" UUID NOT NULL,

    CONSTRAINT "favourite_artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favourite_album" (
    "id" SERIAL NOT NULL,
    "albumId" UUID NOT NULL,

    CONSTRAINT "favourite_album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favourite_track" (
    "id" SERIAL NOT NULL,
    "trackId" UUID NOT NULL,

    CONSTRAINT "favourite_track_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "favourite_artist_id_key" ON "favourite_artist"("id");

-- CreateIndex
CREATE UNIQUE INDEX "favourite_artist_artistId_key" ON "favourite_artist"("artistId");

-- CreateIndex
CREATE UNIQUE INDEX "favourite_album_id_key" ON "favourite_album"("id");

-- CreateIndex
CREATE UNIQUE INDEX "favourite_album_albumId_key" ON "favourite_album"("albumId");

-- CreateIndex
CREATE UNIQUE INDEX "favourite_track_id_key" ON "favourite_track"("id");

-- CreateIndex
CREATE UNIQUE INDEX "favourite_track_trackId_key" ON "favourite_track"("trackId");

-- AddForeignKey
ALTER TABLE "album" ADD CONSTRAINT "album_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "track" ADD CONSTRAINT "track_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "track" ADD CONSTRAINT "track_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favourite_artist" ADD CONSTRAINT "favourite_artist_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favourite_album" ADD CONSTRAINT "favourite_album_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favourite_track" ADD CONSTRAINT "favourite_track_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "track"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
