"use client"

import { useState } from "react"
import ImageUpload from "@/components/ui/image-upload"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface ProductFormProps {
    initialData?: {
        name: string
        description: string
        price: number
        sku: string
        category: string
        stock: number
        image: string | null
    }
    action: (formData: FormData) => Promise<void>
    buttonText: string
}

export default function ProductForm({ initialData, action, buttonText }: ProductFormProps) {
    const [imageUrl, setImageUrl] = useState(initialData?.image || "")
    const router = useRouter()

    return (
        <form action={async (formData) => {
            await action(formData)
            router.refresh()
        }} className="space-y-6 rounded-lg bg-white p-6 shadow-sm">
            <div className="grid gap-6 md:grid-cols-2">
                <div className="col-span-2">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Product Images
                    </label>
                    <ImageUpload
                        value={imageUrl}
                        onChange={(url) => setImageUrl(url)}
                    />
                    <input type="hidden" name="image" value={imageUrl} />
                </div>

                <div className="col-span-2">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Product Name
                    </label>
                    <input
                        name="name"
                        required
                        defaultValue={initialData?.name}
                        className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Price ($)
                    </label>
                    <input
                        name="price"
                        type="number"
                        step="0.01"
                        required
                        defaultValue={initialData?.price}
                        className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Stock
                    </label>
                    <input
                        name="stock"
                        type="number"
                        required
                        defaultValue={initialData?.stock || 100}
                        className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        SKU
                    </label>
                    <input
                        name="sku"
                        required
                        defaultValue={initialData?.sku}
                        className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Category
                    </label>
                    <select
                        name="category"
                        required
                        defaultValue={initialData?.category}
                        className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    >
                        <option value="">Select Category</option>
                        <option value="plastic">Plastic Containers</option>
                        <option value="bags">Bags</option>
                        <option value="netting">Netting</option>
                        <option value="stretch-film">Stretch Film</option>
                    </select>
                </div>

                <div className="col-span-2">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        name="description"
                        rows={4}
                        required
                        defaultValue={initialData?.description}
                        className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <Link
                    href="/admin/products"
                    className="rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                    Cancel
                </Link>
                <button
                    type="submit"
                    className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    {buttonText}
                </button>
            </div>
        </form>
    )
}
