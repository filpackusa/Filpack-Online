import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const productCount = await prisma.product.count()
        const dbUrl = process.env.DATABASE_URL || "NOT_SET"
        const maskedUrl = dbUrl.replace(/:[^:@]+@/, ":***@") // Mask password

        // Force revalidate admin products page
        try {
            const { revalidatePath } = await import("next/cache")
            revalidatePath("/admin/products")
            revalidatePath("/products")
        } catch (e) {
            console.error("Failed to revalidate", e)
        }

        return NextResponse.json({
            status: "success",
            productCount,
            databaseUrl: maskedUrl,
            env: process.env.NODE_ENV,
            revalidated: true
        })
    } catch (error: any) {
        return NextResponse.json({
            status: "error",
            message: error.message,
            stack: error.stack
        }, { status: 500 })
    }
}
