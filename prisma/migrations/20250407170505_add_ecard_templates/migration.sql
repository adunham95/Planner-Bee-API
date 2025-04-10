-- CreateTable
CREATE TABLE "ECardTemplate" (
    "id" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "includedOptions" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "imageURL" TEXT,
    "visible" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ECardTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ECardComponent" (
    "id" TEXT NOT NULL,
    "key" TEXT,
    "ecardComponentID" TEXT NOT NULL,
    "ecardID" TEXT NOT NULL,
    "label" TEXT DEFAULT '',
    "editable" BOOLEAN DEFAULT false,
    "default" TEXT DEFAULT '',
    "customStyles" TEXT DEFAULT '',
    "options" TEXT DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ECardComponent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ECardTemplate_sku_key" ON "ECardTemplate"("sku");

-- CreateIndex
CREATE INDEX "ECardTemplate_sku_idx" ON "ECardTemplate"("sku");

-- CreateIndex
CREATE INDEX "ECardComponent_key_idx" ON "ECardComponent"("key");

-- AddForeignKey
ALTER TABLE "ECardComponent" ADD CONSTRAINT "ECardComponent_ecardID_fkey" FOREIGN KEY ("ecardID") REFERENCES "ECardTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
