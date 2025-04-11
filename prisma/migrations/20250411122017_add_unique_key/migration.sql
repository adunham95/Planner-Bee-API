/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `ECardComponent` will be added. If there are existing duplicate values, this will fail.
  - Made the column `key` on table `ECardComponent` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ECardComponent" ALTER COLUMN "key" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ECardComponent_key_key" ON "ECardComponent"("key");
