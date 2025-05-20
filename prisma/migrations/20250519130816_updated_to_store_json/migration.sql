/*
  Warnings:

  - The `default` column on the `ECardComponent` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ECardComponent" DROP COLUMN "default",
ADD COLUMN     "default" JSONB DEFAULT '{}';
