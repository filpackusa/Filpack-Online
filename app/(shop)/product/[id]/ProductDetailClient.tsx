'use client';

import React from 'react';
import { Star, ShoppingCart, ShieldCheck, Truck, RefreshCw, Minus, Plus, Heart, Share2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    sku: string;
    category: string;
    images: string[];
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}

export default function ProductDetailClient({ product }: { product: Product }) {
    const { t } = useLanguage();
    const { addItem } = useCart();
    const [quantity, setQuantity] = React.useState(1);
    const [selectedImage, setSelectedImage] = React.useState(product.images[0] || '');
    const [showAddedMessage, setShowAddedMessage] = React.useState(false);

    // Update selected image if product changes
    React.useEffect(() => {
        if (product.images && product.images.length > 0) {
            setSelectedImage(product.images[0]);
        }
    }, [product]);

    const handleAddToCart = () => {
        try {
            addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: quantity,
                image: product.images[0] || '/placeholder.jpg'
            });

            // Show success message
            setShowAddedMessage(true);
            setTimeout(() => setShowAddedMessage(false), 3000);
        } catch (error) {
            console.error('Failed to add item to cart', error);
            alert(t('productDetail.addToCartError') || 'Failed to add item to cart. Please try again.');
        }
    };

    // Mock rating data (you can add this to the database later)
    const rating = 4.8;
    const reviews = 124;

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden mb-12">
                <div className="grid md:grid-cols-2 gap-0">

                    {/* Left: Image Gallery */}
                    <div className="p-8 md:p-12 bg-slate-50/50 border-b md:border-b-0 md:border-r border-slate-100 relative">
                        <div className="aspect-square bg-white rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden group shadow-sm border border-slate-100">
                            {selectedImage && selectedImage.startsWith('http') ? (
                                <img src={selectedImage} alt={product.name} className="w-full h-full object-cover transition-all duration-500" />
                            ) : (
                                <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                                    <span className="text-6xl font-black text-slate-400 opacity-50">IMG</span>
                                </div>
                            )}
                            <div className="absolute top-6 right-6 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 duration-300">
                                <button className="p-3 bg-white rounded-full shadow-lg hover:text-red-500 transition-colors hover:scale-110">
                                    <Heart size={20} />
                                </button>
                                <button className="p-3 bg-white rounded-full shadow-lg hover:text-blue-500 transition-colors hover:scale-110">
                                    <Share2 size={20} />
                                </button>
                            </div>
                        </div>
                        {product.images && product.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {product.images.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedImage(img)}
                                        className={`aspect-square rounded-xl border-2 flex items-center justify-center bg-white shadow-sm transition-all overflow-hidden ${selectedImage === img ? 'border-orange-500 ring-2 ring-orange-500/20' : 'border-transparent hover:border-slate-200 hover:-translate-y-1'}`}
                                    >
                                        {img.startsWith('http') ? (
                                            <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-xs text-slate-300 font-bold">{i + 1}</span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Product Info */}
                    <div className="p-8 md:p-12 flex flex-col bg-white">
                        <div className="mb-4 flex items-center gap-3">
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
                                {product.stock > 0 ? t('productDetail.inStock') : 'Out of Stock'}
                            </span>
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
                                        <Star key={i} size={16} className={i < Math.floor(rating) ? "fill-current" : "text-slate-200"} />
                                    ))}
                                </div>
                                <span className="font-bold text-slate-900 text-sm">{rating}</span>
                            </div>
                            <a href="#reviews" className="text-slate-500 hover:text-orange-600 text-sm font-medium underline decoration-slate-200 underline-offset-4 hover:decoration-orange-600 transition-all">
                                {reviews} {t('productDetail.reviews')}
                            </a>
                        </div>

                        <div className="mb-10 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="flex items-end gap-3 mb-3">
                                <span className="text-5xl font-black text-slate-900 tracking-tighter">${product.price?.toFixed(2)}</span>
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

                                {/* Success Message */}
                                {showAddedMessage && (
                                    <div className="bg-green-50 border-2 border-green-500 text-green-700 px-4 py-3 rounded-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                                        <ShoppingCart size={20} className="text-green-600" />
                                        <span className="font-bold">{t('productDetail.addedToCart') || 'Added to cart!'}</span>
                                    </div>
                                )}

                                <button
                                    onClick={handleAddToCart}
                                    disabled={product.stock < 1}
                                    className="flex-1 bg-slate-900 hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
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

            {/* Additional Details Section */}
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Description */}
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-10">
                        <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                            <span className="w-1 h-8 bg-orange-500 rounded-full"></span>
                            {t('productDetail.details')}
                        </h3>
                        <div className="prose prose-slate prose-lg max-w-none text-slate-600">
                            <p>{product.description}</p>
                        </div>
                    </div>
                </div>

                {/* Related Products Sidebar - Placeholder */}
                <div className="space-y-6">
                    <h3 className="text-xl font-black text-slate-900">{t('productDetail.related')}</h3>
                    <div className="space-y-4">
                        <div className="bg-slate-50 p-6 rounded-2xl text-center text-slate-400">
                            <p className="text-sm">Related products coming soon</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
