/*
  Warnings:

  - You are about to drop the `Platforms` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Platforms";

-- CreateTable
CREATE TABLE "Networks" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" "Platform" NOT NULL,
    "active" BOOLEAN NOT NULL,
    "captcha" BOOLEAN,
    "checkpoint" TEXT,
    "expired" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Networks_pkey" PRIMARY KEY ("id")
);
