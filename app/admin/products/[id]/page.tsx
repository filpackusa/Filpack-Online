import { updateProduct } from "@/app/actions/products"
import { prisma } from "@/lib/prisma"
import ProductForm from "@/components/admin/product-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"

export default async function EditProductPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const product = await prisma.product.findUnique({
        where: { id },
    })

    if (!product) {
        notFound()
    }

    return (
        <div className="mx-auto max-w-2xl">
            <div className="mb-6 flex items-center gap-4">
                <Link
                    href="/admin/products"
                    className="rounded-full p-2 hover:bg-gray-100"
                >
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">Edit Product</h1>
            </div>

            <ProductForm
                initialData={product as any}
                action={updateProduct.bind(null, product.id)}
                buttonText="Update Product"
            />
        </div>
    )
}
