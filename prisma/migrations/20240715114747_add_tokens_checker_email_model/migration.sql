-- CreateEnum
CREATE TYPE "ServiceCheckerEmail" AS ENUM ('whoisxml', 'emailverifier');

-- CreateTable
CREATE TABLE "TokensCheckerEmail" (
    "id" TEXT NOT NULL,
    "service" "ServiceCheckerEmail" NOT NULL DEFAULT 'whoisxml',
    "active" BOOLEAN NOT NULL DEFAULT false,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TokensCheckerEmail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TokensCheckerEmail_token_key" ON "TokensCheckerEmail"("token");
