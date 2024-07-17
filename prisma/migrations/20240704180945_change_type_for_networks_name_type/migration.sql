/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Networks` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `name` on the `Networks` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Networks" DROP COLUMN "name",
ADD COLUMN     "name" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Networks_name_key" ON "Networks"("name");
