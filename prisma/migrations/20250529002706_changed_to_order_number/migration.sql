/*
  Warnings:

  - You are about to drop the column `orderID` on the `OrderProduct` table. All the data in the column will be lost.
  - Added the required column `orderNumber` to the `OrderProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderProduct" DROP CONSTRAINT "OrderProduct_orderID_fkey";

-- AlterTable
ALTER TABLE "OrderProduct" DROP COLUMN "orderID",
ADD COLUMN     "orderNumber" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderProduct" ADD CONSTRAINT "OrderProduct_orderNumber_fkey" FOREIGN KEY ("orderNumber") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
