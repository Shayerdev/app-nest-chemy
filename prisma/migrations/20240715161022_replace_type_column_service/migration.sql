/*
  Warnings:

  - You are about to drop the column `service` on the `TokensCheckerEmail` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ECollectionCheckerService" AS ENUM ('whoisxml', 'emailverifier');

-- AlterTable
ALTER TABLE "TokensCheckerEmail" DROP COLUMN "service",
ADD COLUMN     "checker" "ECollectionCheckerService" NOT NULL DEFAULT 'whoisxml';

-- DropEnum
DROP TYPE "ServiceCheckerEmail";
