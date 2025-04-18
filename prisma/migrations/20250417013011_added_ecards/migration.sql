-- CreateTable
CREATE TABLE "ECard" (
    "id" TEXT NOT NULL,
    "senderEmail" TEXT DEFAULT '',
    "senderID" INTEGER,
    "deliveryDate" TIMESTAMP(3),
    "eCardNumber" TEXT DEFAULT '',
    "eCardTemplateSku" TEXT NOT NULL,
    "totalPrice" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT DEFAULT 'draft',

    CONSTRAINT "ECard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OptionItem" (
    "id" TEXT NOT NULL,
    "eCardId" TEXT,
    "value" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OptionItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipient" (
    "id" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "eCardID" TEXT,

    CONSTRAINT "Recipient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ECard_senderID_eCardNumber_idx" ON "ECard"("senderID", "eCardNumber");

-- CreateIndex
CREATE INDEX "OptionItem_eCardId_idx" ON "OptionItem"("eCardId");

-- AddForeignKey
ALTER TABLE "ECard" ADD CONSTRAINT "ECard_senderID_fkey" FOREIGN KEY ("senderID") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ECard" ADD CONSTRAINT "ECard_eCardTemplateSku_fkey" FOREIGN KEY ("eCardTemplateSku") REFERENCES "ECardTemplate"("sku") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OptionItem" ADD CONSTRAINT "OptionItem_eCardId_fkey" FOREIGN KEY ("eCardId") REFERENCES "ECard"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipient" ADD CONSTRAINT "Recipient_eCardID_fkey" FOREIGN KEY ("eCardID") REFERENCES "ECard"("id") ON DELETE SET NULL ON UPDATE CASCADE;
