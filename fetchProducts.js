// Quick script to count products in the database
require('dotenv').config({ path: '.env.production.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
    const count = await prisma.product.count();
    console.log('Product count:', count);
    const products = await prisma.product.findMany({ take: 5 });
    console.log('Sample products:', products);
}
main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
