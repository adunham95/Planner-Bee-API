-- AlterTable
ALTER TABLE "ECardComponent" ADD COLUMN     "partyBoxTemplateID" TEXT,
ALTER COLUMN "ecardID" DROP NOT NULL;

-- CreateTable
CREATE TABLE "PartyBoxTemplate" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PartyBoxTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartyBoxSupplies" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "partyBoxTemplateID" TEXT NOT NULL,
    "stockID" TEXT NOT NULL,

    CONSTRAINT "PartyBoxSupplies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stock" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ECardComponent" ADD CONSTRAINT "ECardComponent_partyBoxTemplateID_fkey" FOREIGN KEY ("partyBoxTemplateID") REFERENCES "PartyBoxTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartyBoxSupplies" ADD CONSTRAINT "PartyBoxSupplies_partyBoxTemplateID_fkey" FOREIGN KEY ("partyBoxTemplateID") REFERENCES "PartyBoxTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartyBoxSupplies" ADD CONSTRAINT "PartyBoxSupplies_stockID_fkey" FOREIGN KEY ("stockID") REFERENCES "Stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
