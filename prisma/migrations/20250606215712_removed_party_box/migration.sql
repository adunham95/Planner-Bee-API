/*
  Warnings:

  - You are about to drop the column `partyBoxTemplateID` on the `ECardComponent` table. All the data in the column will be lost.
  - You are about to drop the column `partyBoxTemplateSKU` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `PartyBoxSupplies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PartyBoxTemplate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Stock` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ECardComponent" DROP CONSTRAINT "ECardComponent_partyBoxTemplateID_fkey";

-- DropForeignKey
ALTER TABLE "PartyBoxSupplies" DROP CONSTRAINT "PartyBoxSupplies_partyBoxTemplateID_fkey";

-- DropForeignKey
ALTER TABLE "PartyBoxSupplies" DROP CONSTRAINT "PartyBoxSupplies_stockID_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_partyBoxTemplateSKU_fkey";

-- AlterTable
ALTER TABLE "ECardComponent" DROP COLUMN "partyBoxTemplateID";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "partyBoxTemplateSKU";

-- DropTable
DROP TABLE "PartyBoxSupplies";

-- DropTable
DROP TABLE "PartyBoxTemplate";

-- DropTable
DROP TABLE "Stock";
