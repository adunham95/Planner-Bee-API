/*
  Warnings:

  - The `options` column on the `ECardComponent` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ECardComponent" DROP COLUMN "options",
ADD COLUMN     "options" TEXT[] DEFAULT ARRAY[]::TEXT[];
