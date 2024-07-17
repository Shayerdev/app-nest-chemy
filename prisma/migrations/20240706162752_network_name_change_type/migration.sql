/*
  Warnings:

  - Changed the type of `name` on the `Networks` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "NetworkCollectionName" AS ENUM ('amazon', 'facebook', 'stripe', 'paypal');

-- AlterTable
ALTER TABLE "Networks" DROP COLUMN "name",
ADD COLUMN     "name" "NetworkCollectionName" NOT NULL;

-- DropEnum
DROP TYPE "Platform";

-- CreateIndex
CREATE UNIQUE INDEX "Networks_name_key" ON "Networks"("name");
