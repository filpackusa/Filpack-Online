const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const product = await prisma.product.findFirst({
        where: {
            name: {
                contains: 'Stretch Film'
            }
        }
    })

    if (product) {
        await prisma.product.update({
            where: { id: product.id },
            data: { category: 'stretch-film' }
        })
        console.log(`Updated product ${product.name} to category stretch-film`)
    } else {
        console.log('Stretch Film product not found')
    }
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
