'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Star } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';

interface ProductProps {
    id: string;
    name: string;
    price: number;
    category: string;
    rating: number;
    images: string[];
}

const ProductCard = ({ id, name, price, category, rating, images }: ProductProps) => {
    const { t } = useLanguage();
    const { addItem } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation to product detail
        addItem({
            id,
            name,
            price,
            quantity: 1,
            image: images[0] || 'bg-slate-100'
        });
    };

    return (
        <div className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 flex flex-col h-full hover:-translate-y-1">
            {/* Image Area */}
            <div className="relative aspect-[4/3] bg-slate-50 overflow-hidden">
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-slate-700 z-10 shadow-sm border border-slate-100">
                    {category}
                </div>
                <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-50 group-hover:scale-110 transition-transform duration-700 ease-out">
                    {images && images.length > 0 && images[0].startsWith('http') ? (
                        <img src={images[0]} alt={name} className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-4xl font-black opacity-10">IMG</span>
                    )}
                </div>

                {/* Quick Add Overlay */}
                <div className="absolute inset-x-4 bottom-4 translate-y-[120%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-20">
                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-white/95 backdrop-blur-md text-slate-900 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-500 hover:text-white transition-all shadow-lg border border-slate-100 hover:border-orange-500"
                    >
                        <ShoppingCart size={18} />
                        {t('products.quickAdd')}
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={`${i < rating ? 'text-orange-400 fill-orange-400' : 'text-slate-200'}`} />
                    ))}
                    <span className="text-xs text-slate-400 ml-1 font-medium">({rating}.0)</span>
                </div>

                <Link href={`/product/${id}`} className="block mb-3">
                    <h3 className="font-bold text-slate-900 text-lg leading-snug group-hover:text-orange-600 transition-colors line-clamp-2">
                        {name}
                    </h3>
                </Link>

                <div className="mt-auto pt-5 flex items-end justify-between border-t border-slate-50">
                    <div>
                        <p className="text-xs text-slate-500 mb-1 font-medium uppercase tracking-wider">{t('products.casePrice')}</p>
                        <p className="text-2xl font-black text-slate-900 tracking-tight">${price.toFixed(2)}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">{t('productDetail.inStock')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
