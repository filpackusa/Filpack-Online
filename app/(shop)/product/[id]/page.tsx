import React from 'react';
import Link from 'next/link';
import { Star, ShoppingCart, ShieldCheck, Truck, RefreshCw, ChevronRight } from 'lucide-react';
import { getProductById } from '@/app/actions';
import { redirect } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    console.log('[ProductDetail] Product ID from params:', id);

    const result = await getProductById(id);
    console.log('[ProductDetail] getProductById result:', result.success ? 'SUCCESS' : 'FAILED');

    if (!result.success || !result.product) {
        console.log('[ProductDetail] Redirecting to /products');
        redirect('/products');
    }

    const product = {
        ...result.product,
        priceTiers: (result.product as any).priceTiers
    };

    return (
        <div className="min-h-screen pb-20">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm backdrop-blur-md bg-white/80">
                <div className="container mx-auto px-4 py-4 text-sm text-slate-500 flex items-center gap-2 font-medium">
                    <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
                    <ChevronRight size={14} className="text-slate-300" />
                    <Link href="/products" className="hover:text-orange-600 transition-colors">Products</Link>
                    <ChevronRight size={14} className="text-slate-300" />
                    <span className="text-slate-900 truncate">{product.name}</span>
                </div>
            </div>

            <ProductDetailClient product={product} />
        </div>
    );
}
