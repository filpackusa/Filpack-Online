const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function migrateImages() {
    console.log('Starting image migration...');

    try {
        // 1. Add images column as empty array for all products
        await prisma.$executeRaw`ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "images" TEXT[] DEFAULT '{}'`;

        // 2. Copy data from image to images
        await prisma.$executeRaw`
      UPDATE "Product" 
      SET "images" = CASE 
        WHEN "image" IS NOT NULL AND "image" != '' THEN ARRAY["image"]
        ELSE '{}'
      END
    `;

        console.log('✓ Migrated image data to images array');

        // 3. Drop old image column
        await prisma.$executeRaw`ALTER TABLE "Product" DROP COLUMN IF EXISTS "image"`;

        console.log('✓ Dropped old image column');
        console.log('Migration completed successfully!');

    } catch (error) {
        console.error('Migration failed:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

migrateImages();
