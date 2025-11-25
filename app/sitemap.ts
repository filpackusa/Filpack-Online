import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://filpackonline.com'

    // Get all products from database
    let products: Array<{ id: string; updatedAt: Date }> = []
    try {
        products = await prisma.product.findMany({
            select: {
                id: true,
                updatedAt: true,
            },
        })
    } catch (error) {
        console.error('Error fetching products for sitemap:', error)
    }

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/products`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ]

    // Dynamic product pages
    const productPages: MetadataRoute.Sitemap = products.map((product) => ({
        url: `${baseUrl}/product/${product.id}`,
        lastModified: product.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    return [...staticPages, ...productPages]
}
