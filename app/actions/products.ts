"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createProduct(formData: FormData) {
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const price = parseFloat(formData.get("price") as string)
    const sku = formData.get("sku") as string
    const category = formData.get("category") as string
    const stock = parseInt(formData.get("stock") as string)
    const image = formData.get("image") as string

    await prisma.product.create({
        data: {
            name,
            description,
            price,
            sku,
            category,
            stock,
            image,
        },
    })

    revalidatePath("/admin/products")
    redirect("/admin/products")
}

export async function updateProduct(id: string, formData: FormData) {
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const price = parseFloat(formData.get("price") as string)
    const sku = formData.get("sku") as string
    const category = formData.get("category") as string
    const stock = parseInt(formData.get("stock") as string)
    const image = formData.get("image") as string

    await prisma.product.update({
        where: { id },
        data: {
            name,
            description,
            price,
            sku,
            category,
            stock,
            image,
        },
    })

    revalidatePath("/admin/products")
    redirect("/admin/products")
}

export async function deleteProduct(id: string) {
    await prisma.product.delete({
        where: { id },
    })

    revalidatePath("/admin/products")
}

export async function getProducts(filters?: {
    category?: string
    minPrice?: number
    maxPrice?: number
    sort?: string
    search?: string
}) {
    const { category, minPrice, maxPrice, sort, search } = filters || {}

    const where: any = {}

    if (category) {
        where.category = category
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
        where.price = {}
        if (minPrice !== undefined) where.price.gte = minPrice
        if (maxPrice !== undefined) where.price.lte = maxPrice
    }

    if (search) {
        where.OR = [
            { name: { contains: search } },
            { sku: { contains: search } },
        ]
    }

    const orderBy: any = {}

    if (sort === 'lowestPrice') {
        orderBy.price = 'asc'
    } else if (sort === 'highestPrice') {
        orderBy.price = 'desc'
    } else {
        orderBy.createdAt = 'desc' // Default to newest
    }

    const products = await prisma.product.findMany({
        where,
        orderBy,
    })

    return products
}
