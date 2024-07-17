/*
  Warnings:

  - You are about to alter the column `expired` on the `Emails` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Emails" ALTER COLUMN "expired" SET DATA TYPE INTEGER;
