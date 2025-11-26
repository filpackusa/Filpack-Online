
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Connecting to database...');
        const products = await prisma.product.findMany({ take: 1 });
        console.log('Successfully connected!');
        console.log('Found products:', products.length);
        if (products.length > 0) {
            console.log('First product:', products[0].name);
        }
    } catch (error) {
        console.error('Error connecting to database:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
