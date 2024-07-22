/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Networks` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Networks_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Networks_email_key" ON "Networks"("email");
