/*
  Warnings:

  - You are about to drop the column `eCardTemplateID` on the `ECard` table. All the data in the column will be lost.
  - Added the required column `eCardTemplateSKU` to the `ECard` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ECard" DROP CONSTRAINT "ECard_eCardTemplateID_fkey";

-- AlterTable
ALTER TABLE "ECard" DROP COLUMN "eCardTemplateID",
ADD COLUMN     "eCardTemplateSKU" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ECard" ADD CONSTRAINT "ECard_eCardTemplateSKU_fkey" FOREIGN KEY ("eCardTemplateSKU") REFERENCES "ECardTemplate"("sku") ON DELETE RESTRICT ON UPDATE CASCADE;
