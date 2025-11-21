import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Plus, Pencil, Trash } from "lucide-react"
import { deleteProduct } from "@/app/actions/products"

export default async function ProductsPage() {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
    })

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">Products</h1>
                <Link
                    href="/admin/products/new"
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    <Plus size={20} />
                    Add Product
                </Link>
            </div>

            <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
                <table className="w-full text-left text-sm text-gray-500">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">SKU</th>
                            <th className="px-6 py-3">Price</th>
                            <th className="px-6 py-3">Stock</th>
                            <th className="px-6 py-3">Category</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className="border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {product.name}
                                </td>
                                <td className="px-6 py-4">{product.sku}</td>
                                <td className="px-6 py-4">${product.price.toFixed(2)}</td>
                                <td className="px-6 py-4">{product.stock}</td>
                                <td className="px-6 py-4">{product.category}</td>
                                <td className="flex gap-2 px-6 py-4">
                                    <Link
                                        href={`/admin/products/${product.id}`}
                                        className="rounded p-2 text-blue-600 hover:bg-blue-50"
                                    >
                                        <Pencil size={18} />
                                    </Link>
                                    <form action={deleteProduct.bind(null, product.id)}>
                                        <button
                                            type="submit"
                                            className="rounded p-2 text-red-600 hover:bg-red-50"
                                        >
                                            <Trash size={18} />
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-6 py-4 text-center">
                                    No products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
