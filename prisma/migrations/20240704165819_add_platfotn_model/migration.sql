-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('amazon', 'facebook', 'stripe', 'paypal', 'redit');

-- CreateTable
CREATE TABLE "Platforms" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" "Platform" NOT NULL,
    "active" BOOLEAN NOT NULL,
    "captcha" BOOLEAN,
    "checkpoint" TEXT,
    "expired" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Platforms_pkey" PRIMARY KEY ("id")
);
