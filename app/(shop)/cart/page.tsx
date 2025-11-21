'use client';

import React from 'react';
import Link from 'next/link';
import { Trash2, ArrowRight, ShieldCheck, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
    const { t } = useLanguage();
    const { items, removeItem, updateQuantity, subtotal } = useCart();

    const shipping = 15.00;
    const total = subtotal + shipping;

    return (

        <div className="min-h-screen py-20">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-black text-slate-900 mb-10 tracking-tight">{t('cart.title')}</h1>

                {items.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-xl">
                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingCart size={40} className="text-slate-300" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">{t('cart.empty') || "Your cart is empty."}</h2>
                        <p className="text-slate-500 mb-8 max-w-md mx-auto">Looks like you haven't added anything to your cart yet.</p>
                        <Link href="/products" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/30">
                            {t('cart.continueShopping')} <ArrowRight size={20} />
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-10">
                        {/* Cart Items */}
                        <div className="flex-1 space-y-6">
                            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
                                <div className="hidden md:grid grid-cols-12 gap-6 p-6 bg-slate-50/50 border-b border-slate-100 text-sm font-bold text-slate-500 uppercase tracking-wider">
                                    <div className="col-span-6">{t('cart.product')}</div>
                                    <div className="col-span-2 text-center">{t('cart.price')}</div>
                                    <div className="col-span-2 text-center">{t('cart.quantity')}</div>
                                    <div className="col-span-2 text-right">{t('cart.totalPrice')}</div>
                                </div>

                                {items.map((item) => (
                                    <div key={item.id} className="p-6 border-b border-slate-50 last:border-0 hover:bg-slate-50/30 transition-colors">
                                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                                            {/* Product Info */}
                                            <div className="col-span-1 md:col-span-6 flex items-center gap-6">
                                                {item.image.startsWith('http') ? (
                                                    <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-2xl shadow-sm" />
                                                ) : (
                                                    <div className={`w-24 h-24 ${item.image} rounded-2xl flex items-center justify-center text-xs text-slate-400 shrink-0 font-bold`}>IMG</div>
                                                )}
                                                <div>
                                                    <h3 className="font-bold text-slate-900 text-lg mb-1">{item.name}</h3>
                                                    <p className="text-sm text-slate-500 md:hidden font-medium">${item.price.toFixed(2)}</p>
                                                </div>
                                            </div>

                                            {/* Price (Desktop) */}
                                            <div className="hidden md:block col-span-2 text-center font-bold text-slate-700">
                                                ${item.price.toFixed(2)}
                                            </div>

                                            {/* Quantity */}
                                            <div className="col-span-1 md:col-span-2 flex justify-center">
                                                <div className="flex items-center bg-slate-100 rounded-xl p-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm hover:text-orange-600 disabled:opacity-50 disabled:hover:text-slate-600 transition-colors"
                                                        disabled={item.quantity <= 1}
                                                    ><Minus size={14} /></button>
                                                    <span className="w-10 text-center font-bold text-slate-900">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm hover:text-orange-600 transition-colors"
                                                    ><Plus size={14} /></button>
                                                </div>
                                            </div>

                                            {/* Total & Actions */}
                                            <div className="col-span-1 md:col-span-2 flex items-center justify-between md:justify-end gap-6">
                                                <span className="font-bold text-slate-900 md:hidden">{t('cart.totalPrice')}:</span>
                                                <span className="font-black text-lg text-slate-900">${(item.price * item.quantity).toFixed(2)}</span>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Link href="/products" className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-600 font-bold transition-colors group">
                                <ArrowRight size={20} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                                {t('cart.continueShopping')}
                            </Link>
                        </div>

                        {/* Summary */}
                        <div className="w-full lg:w-[400px] shrink-0">
                            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 sticky top-24">
                                <h2 className="text-2xl font-black text-slate-900 mb-8">{t('cart.orderSummary')}</h2>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-slate-600 font-medium">
                                        <span>{t('cart.subtotal')}</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-600 font-medium">
                                        <span>{t('cart.shipping')}</span>
                                        <span>${shipping.toFixed(2)}</span>
                                    </div>
                                    <div className="pt-6 border-t border-slate-100 flex justify-between items-end">
                                        <span className="font-bold text-xl text-slate-900">{t('cart.total')}</span>
                                        <span className="text-4xl font-black text-orange-600 tracking-tight">${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <Link href="/checkout" className="w-full bg-slate-900 hover:bg-orange-600 text-white py-5 rounded-2xl font-bold text-xl shadow-xl hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-3 group">
                                    {t('cart.checkout')}
                                    <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                                </Link>

                                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400 font-medium">
                                    <ShieldCheck size={14} />
                                    <span>{t('cart.securePayment')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
