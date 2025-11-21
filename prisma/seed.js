const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const products = [
        {
            name: '500ml Şeffaf Plastik Kap (50\'li Paket)',
            description: 'Yüksek kaliteli, sızdırmaz plastik kap. Sıcak ve soğuk yemekler için uygundur.',
            price: 24.99,
            sku: 'PL-500-CLR',
            category: 'plastic',
            image: 'bg-blue-100',
            stock: 100
        },
        {
            name: 'Kraft Hamburger Kutusu (100\'lü Paket)',
            description: 'Doğa dostu kraft kağıttan üretilmiş hamburger kutusu.',
            price: 32.50,
            sku: 'KR-BURGER-100',
            category: 'bags', // Reclassified from Paper to Bags for now as Paper is removed
            image: 'bg-amber-100',
            stock: 150
        },
        {
            name: 'Biyobozunur Çatal Bıçak Seti',
            description: '%100 doğada çözünebilir, dayanıklı set.',
            price: 18.75,
            sku: 'ECO-CUTLERY',
            category: 'netting', // Reclassified
            image: 'bg-green-100',
            stock: 500
        }
    ]

    for (const product of products) {
        await prisma.product.upsert({
            where: { sku: product.sku },
            update: {},
            create: product,
        })
    }
    console.log('Seed data inserted!')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
