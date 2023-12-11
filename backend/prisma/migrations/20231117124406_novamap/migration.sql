-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_locationsId_fkey";

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_locationsId_fkey" FOREIGN KEY ("locationsId") REFERENCES "locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
