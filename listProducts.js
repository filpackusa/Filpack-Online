const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function listProducts() {
    try {
        const products = await prisma.product.findMany({
            select: {
                id: true,
                name: true,
                sku: true,
                images: true
            }
        });
        console.log('Products in DB:', JSON.stringify(products, null, 2));
    } catch (error) {
        console.error('Error listing products:', error);
    } finally {
        await prisma.$disconnect();
    }
}

listProducts();
