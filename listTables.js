require('dotenv').config({ path: '.env.production.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
    const tables = await prisma.$queryRaw`SELECT tablename FROM pg_tables WHERE schemaname='public'`;
    console.log('Tables:', tables);
}
main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
