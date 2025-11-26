"use client"

import { useState } from "react"
import ImageUpload from "@/components/ui/image-upload"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Plus, Trash2 } from "lucide-react"

interface PriceTier {
    minQty: number
    price: number
}

interface ProductFormProps {
    initialData?: {
        name: string
        description: string
        price: number
        sku: string
        category: string
        stock: number
        images: string[]
        priceTiers?: PriceTier[]
    }
    action: (formData: FormData) => Promise<void>
    buttonText: string
}

export default function ProductForm({ initialData, action, buttonText }: ProductFormProps) {
    const [imageUrls, setImageUrls] = useState<string[]>(initialData?.images || [])
    const [priceTiers, setPriceTiers] = useState<PriceTier[]>(initialData?.priceTiers || [])
    const router = useRouter()

    const addTier = () => {
        setPriceTiers([...priceTiers, { minQty: 1, price: 0 }])
    }

    const removeTier = (index: number) => {
        setPriceTiers(priceTiers.filter((_, i) => i !== index))
    }

    const updateTier = (index: number, field: 'minQty' | 'price', value: number) => {
        const newTiers = [...priceTiers]
        newTiers[index][field] = value
        setPriceTiers(newTiers)
    }

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
                        value={imageUrls}
                        onChange={(urls) => setImageUrls(urls)}
                    />
                    <input type="hidden" name="images" value={JSON.stringify(imageUrls)} />
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

                {/* Price Tiers Section */}
                <div className="col-span-2">
                    <div className="flex items-center justify-between mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Quantity-Based Pricing (Optional)
                        </label>
                        <button
                            type="button"
                            onClick={addTier}
                            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
                        >
                            <Plus size={16} />
                            Add Tier
                        </button>
                    </div>

                    {priceTiers.length > 0 && (
                        <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                            {priceTiers.map((tier, index) => (
                                <div key={index} className="flex gap-3 items-center bg-white p-3 rounded-md border border-gray-200">
                                    <div className="flex-1">
                                        <label className="block text-xs text-gray-600 mb-1">Min Quantity</label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={tier.minQty}
                                            onChange={(e) => updateTier(index, 'minQty', parseInt(e.target.value) || 1)}
                                            className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-xs text-gray-600 mb-1">Price ($)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            value={tier.price}
                                            onChange={(e) => updateTier(index, 'price', parseFloat(e.target.value) || 0)}
                                            className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeTier(index)}
                                        className="mt-5 p-2 text-red-600 hover:bg-red-50 rounded-md"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    <input type="hidden" name="priceTiers" value={JSON.stringify(priceTiers)} />
                    <p className="mt-2 text-xs text-gray-500">
                        Add pricing tiers based on quantity. Example: 1-3 units = $120, 4-7 units = $114, 8+ units = $108
                    </p>
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
