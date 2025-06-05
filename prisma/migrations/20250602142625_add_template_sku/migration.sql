/*
  Warnings:

  - A unique constraint covering the columns `[sku]` on the table `PartyBoxTemplate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sku` to the `PartyBoxTemplate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PartyBoxTemplate" ADD COLUMN     "sku" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PartyBoxTemplate_sku_key" ON "PartyBoxTemplate"("sku");
