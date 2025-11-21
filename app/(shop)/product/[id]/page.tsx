'use client';

import React from 'react';
import Link from 'next/link';
import { Star, ShoppingCart, ShieldCheck, Truck, RefreshCw, ChevronRight, Minus, Plus, Heart, Share2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';

export default function ProductDetail({ params }: { params: { id: string } }) {
    const { t } = useLanguage();
    const { addItem } = useCart();
    const [quantity, setQuantity] = React.useState(1);

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            image: product.images[0]
        });
    };

    // Mock Data - In a real app, fetch based on params.id
    const product = {
        id: params.id,
        name: "500ml Şeffaf Plastik Sızdırmaz Kap (50'li Paket)",
        price: 24.99,
        sku: "PL-500-CLR",
        rating: 4.8,
        reviews: 124,
        description: "Yüksek kaliteli, gıdaya uygun polipropilen malzemeden üretilmiştir. Sıcak ve soğuk yemekler için idealdir. Mikrodalga fırına girebilir. Sızdırmaz kapağı sayesinde paket servislerde güvenle kullanılabilir.",
        specs: [
            { label: "Malzeme", value: "Polipropilen (PP)" },
            { label: "Hacim", value: "500 ml / 17 oz" },
            { label: "Renk", value: "Şeffaf" },
            { label: "Paket İçi Adet", value: "50" },
            { label: "Koli İçi Paket", value: "10" },
            { label: "Isı Dayanımı", value: "-20°C / +120°C" },
        ],
        images: ["/p1.jpg", "/p2.jpg", "/p3.jpg"] // Placeholders
    };

    return (

        <div className="min-h-screen pb-20">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm backdrop-blur-md bg-white/80">
                <div className="container mx-auto px-4 py-4 text-sm text-slate-500 flex items-center gap-2 font-medium">
                    <Link href="/" className="hover:text-orange-600 transition-colors">{t('productDetail.home')}</Link>
                    <ChevronRight size={14} className="text-slate-300" />
                    <Link href="/products" className="hover:text-orange-600 transition-colors">{t('nav.products')}</Link>
                    <ChevronRight size={14} className="text-slate-300" />
                    <span className="text-slate-900 truncate">{product.name}</span>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden mb-12">
                    <div className="grid md:grid-cols-2 gap-0">

                        {/* Left: Image Gallery */}
                        <div className="p-8 md:p-12 bg-slate-50/50 border-b md:border-b-0 md:border-r border-slate-100 relative">
                            <div className="aspect-square bg-white rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden group shadow-sm border border-slate-100">
                                <span className="text-6xl font-black text-slate-100">IMG</span>
                                <div className="absolute top-6 right-6 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 duration-300">
                                    <button className="p-3 bg-white rounded-full shadow-lg hover:text-red-500 transition-colors hover:scale-110">
                                        <Heart size={20} />
                                    </button>
                                    <button className="p-3 bg-white rounded-full shadow-lg hover:text-blue-500 transition-colors hover:scale-110">
                                        <Share2 size={20} />
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <button key={i} className={`aspect-square rounded-xl border-2 flex items-center justify-center bg-white shadow-sm transition-all ${i === 1 ? 'border-orange-500 ring-2 ring-orange-500/20' : 'border-transparent hover:border-slate-200 hover:-translate-y-1'}`}>
                                        <span className="text-xs text-slate-300 font-bold">{i}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right: Product Info */}
                        <div className="p-8 md:p-12 flex flex-col bg-white">
                            <div className="mb-4 flex items-center gap-3">
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">{t('productDetail.inStock')}</span>
                                <span className="text-slate-300">|</span>
                                <span className="text-slate-500 text-sm font-medium">{t('productDetail.sku')}: {product.sku}</span>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight tracking-tight">
                                {product.name}
                            </h1>

                            <div className="flex items-center gap-6 mb-8">
                                <div className="flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-100">
                                    <div className="flex text-orange-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={16} className={i < Math.floor(product.rating) ? "fill-current" : "text-slate-200"} />
                                        ))}
                                    </div>
                                    <span className="font-bold text-slate-900 text-sm">{product.rating}</span>
                                </div>
                                <a href="#reviews" className="text-slate-500 hover:text-orange-600 text-sm font-medium underline decoration-slate-200 underline-offset-4 hover:decoration-orange-600 transition-all">
                                    {product.reviews} {t('productDetail.reviews')}
                                </a>
                            </div>

                            <div className="mb-10 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="flex items-end gap-3 mb-3">
                                    <span className="text-5xl font-black text-slate-900 tracking-tighter">${product.price}</span>
                                    <span className="text-slate-500 mb-2 font-medium">{t('productDetail.perPack')}</span>
                                </div>
                                <p className="text-sm text-green-600 font-bold flex items-center gap-2">
                                    <Truck size={18} />
                                    <span>{t('productDetail.shipping')}</span>
                                    <span className="text-slate-400 font-normal ml-1">• {t('productDetail.minOrder')}</span>
                                </p>
                            </div>

                            <p className="text-slate-600 mb-10 leading-relaxed text-lg">
                                {product.description}
                            </p>

                            {/* Actions */}
                            <div className="mt-auto space-y-6">
                                <div className="flex flex-col sm:flex-row items-stretch gap-4">
                                    <div className="flex items-center border-2 border-slate-100 rounded-xl bg-slate-50 p-1">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-12 h-12 flex items-center justify-center hover:bg-white rounded-lg text-slate-600 transition-all shadow-sm hover:shadow"
                                        ><Minus size={20} /></button>
                                        <input type="text" value={quantity} className="w-16 text-center font-black text-xl text-slate-900 bg-transparent focus:outline-none" readOnly />
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="w-12 h-12 flex items-center justify-center hover:bg-white rounded-lg text-slate-600 transition-all shadow-sm hover:shadow"
                                        ><Plus size={20} /></button>
                                    </div>
                                    <button
                                        onClick={handleAddToCart}
                                        className="flex-1 bg-slate-900 hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-3 group"
                                    >
                                        <ShoppingCart size={22} className="group-hover:scale-110 transition-transform" />
                                        {t('productDetail.addToCart')}
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-xs text-slate-500 font-bold">
                                    <div className="flex items-center gap-3 justify-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                                        <ShieldCheck size={18} className="text-slate-400" />
                                        {t('productDetail.securePayment')}
                                    </div>
                                    <div className="flex items-center gap-3 justify-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                                        <RefreshCw size={18} className="text-slate-400" />
                                        {t('productDetail.returnPolicy')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Details Tabs */}
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Specs */}
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-10">
                            <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                                <span className="w-1 h-8 bg-orange-500 rounded-full"></span>
                                {t('productDetail.specs')}
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-6">
                                {product.specs.map((spec, i) => (
                                    <div key={i} className="flex justify-between items-center py-4 border-b border-slate-50 last:border-0 group hover:bg-slate-50/50 px-2 rounded-lg transition-colors">
                                        <span className="text-slate-500 font-medium">{spec.label}</span>
                                        <span className="font-bold text-slate-900">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Description Long */}
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-10">
                            <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                                <span className="w-1 h-8 bg-orange-500 rounded-full"></span>
                                {t('productDetail.details')}
                            </h3>
                            <div className="prose prose-slate prose-lg max-w-none text-slate-600">
                                <p>
                                    Filpack Online olarak sunduğumuz bu sızdırmaz kaplar, restoran ve kafeler için mükemmel bir çözümdür.
                                    Yüksek şeffaflığı sayesinde ürününüzün tazeliğini ve kalitesini müşterilerinize gösterir.
                                </p>
                                <ul className="mt-6 space-y-3">
                                    <li className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                                        BPA içermez, gıda ile temasa uygundur.
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                                        Kırılmaya karşı dayanıklı esnek yapı.
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                                        İstiflenebilir tasarım ile depolamada yer kazandırır.
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                                        Sıcak dolum yapılabilir.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Related Products Sidebar */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-black text-slate-900">{t('productDetail.related')}</h3>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200 flex gap-5 group cursor-pointer hover:border-orange-300 hover:shadow-lg hover:shadow-orange-500/10 transition-all">
                                    <div className="w-20 h-20 bg-slate-50 rounded-xl flex items-center justify-center text-xs text-slate-400 font-bold shrink-0">IMG</div>
                                    <div className="flex flex-col justify-center">
                                        <h4 className="font-bold text-slate-900 text-sm line-clamp-2 group-hover:text-orange-600 transition-colors mb-2">Plastik Çatal Kaşık Seti (Lüks)</h4>
                                        <p className="text-orange-600 font-black text-lg">$12.50</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
