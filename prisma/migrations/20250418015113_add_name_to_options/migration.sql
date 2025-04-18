/*
  Warnings:

  - You are about to drop the column `totalPrice` on the `ECard` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ECard" DROP COLUMN "totalPrice";

-- AlterTable
ALTER TABLE "OptionItem" ADD COLUMN     "name" TEXT;
