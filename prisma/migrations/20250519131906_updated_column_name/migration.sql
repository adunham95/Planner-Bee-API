/*
  Warnings:

  - You are about to drop the column `stipePriceID` on the `ECardTemplate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ECardTemplate" DROP COLUMN "stipePriceID",
ADD COLUMN     "stripePriceID" TEXT;
