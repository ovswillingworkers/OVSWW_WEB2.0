/*
  Warnings:

  - Made the column `expirationDate` on table `JobPosting` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "JobPosting" ALTER COLUMN "expirationDate" SET NOT NULL,
ALTER COLUMN "expirationDate" SET DATA TYPE TEXT;
