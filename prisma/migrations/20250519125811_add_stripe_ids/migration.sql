-- AlterTable
ALTER TABLE "ECardTemplate" ADD COLUMN     "stipePriceID" TEXT,
ADD COLUMN     "stripeProductID" TEXT,
ALTER COLUMN "premium" DROP NOT NULL;
