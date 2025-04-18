-- AlterTable
ALTER TABLE "ECardComponent" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "FeaturedItem" (
    "id" TEXT NOT NULL,
    "ecardID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FeaturedItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ECardTemplateCategories" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ECardTemplateCategories_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "FeaturedItem_ecardID_key" ON "FeaturedItem"("ecardID");

-- CreateIndex
CREATE INDEX "_ECardTemplateCategories_B_index" ON "_ECardTemplateCategories"("B");

-- AddForeignKey
ALTER TABLE "FeaturedItem" ADD CONSTRAINT "FeaturedItem_ecardID_fkey" FOREIGN KEY ("ecardID") REFERENCES "ECardTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ECardTemplateCategories" ADD CONSTRAINT "_ECardTemplateCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ECardTemplateCategories" ADD CONSTRAINT "_ECardTemplateCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "ECardTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
