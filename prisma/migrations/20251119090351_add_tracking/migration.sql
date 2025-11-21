-- AlterTable
ALTER TABLE "Order" ADD COLUMN "carrier" TEXT DEFAULT 'UPS';
ALTER TABLE "Order" ADD COLUMN "trackingNumber" TEXT;
