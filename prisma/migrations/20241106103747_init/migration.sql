-- CreateTable
CREATE TABLE "EssentialYoutubeLinks" (
    "id" TEXT NOT NULL,
    "youtubeVideoName" TEXT NOT NULL,
    "youtubeVideoLink" TEXT NOT NULL,
    "youtubeVideoDescription" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EssentialYoutubeLinks_pkey" PRIMARY KEY ("id")
);
