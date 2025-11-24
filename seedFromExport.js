require('dotenv').config({ path: '.env.production.local' });
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
    const productsPath = path.join(__dirname, 'products_export.json');
    const productsRaw = fs.readFileSync(productsPath, 'utf8');
    const products = JSON.parse(productsRaw);

    console.log(`Found ${products.length} products to import.`);

    for (const product of products) {
        // Convert timestamps to Date objects
        const createdAt = new Date(product.createdAt);
        const updatedAt = new Date(product.updatedAt);

        await prisma.product.upsert({
            where: { id: product.id },
            update: {
                name: product.name,
                description: product.description,
                price: product.price,
                sku: product.sku,
                category: product.category,
                image: product.image,
                stock: product.stock,
                createdAt: createdAt,
                updatedAt: updatedAt,
            },
            create: {
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                sku: product.sku,
                category: product.category,
                image: product.image,
                stock: product.stock,
                createdAt: createdAt,
                updatedAt: updatedAt,
            },
        });
        console.log(`Upserted product: ${product.name}`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
