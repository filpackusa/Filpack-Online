import { createProduct } from "@/app/actions/products"
import ProductForm from "@/components/admin/product-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NewProductPage() {
    return (
        <div className="mx-auto max-w-2xl">
            <div className="mb-6 flex items-center gap-4">
                <Link
                    href="/admin/products"
                    className="rounded-full p-2 hover:bg-gray-100"
                >
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
            </div>

            <ProductForm action={createProduct} buttonText="Create Product" />
        </div>
    )
}
