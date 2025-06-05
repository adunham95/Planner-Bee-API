-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "partyBoxTemplateSKU" TEXT;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_partyBoxTemplateSKU_fkey" FOREIGN KEY ("partyBoxTemplateSKU") REFERENCES "PartyBoxTemplate"("sku") ON DELETE SET NULL ON UPDATE CASCADE;
