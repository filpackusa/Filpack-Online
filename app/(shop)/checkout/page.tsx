"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle, CreditCard, Truck, ShieldCheck, Loader2 } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { useLanguage } from '@/context/LanguageContext';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_sample');

export default function CheckoutPage() {
    const { t } = useLanguage();
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        setLoading(true);
        try {
            const stripe = await stripePromise;
            if (!stripe) throw new Error('Stripe failed to load');

            // Mock cart items - in real app, get from context/state
            const cartItems = [
                { id: 1, name: "500ml Şeffaf Plastik Kap (50'li)", price: 24.99, quantity: 2 },
                { id: 2, name: "Kraft Hamburger Kutusu (100'lü)", price: 32.50, quantity: 1 },
            ];

            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: cartItems }),
            });

            const { sessionId, error } = await response.json();
            if (error) throw new Error(error);

            await (stripe as any).redirectToCheckout({ sessionId });
        } catch (err) {
            console.error(err);
            alert('Ödeme başlatılamadı. Lütfen tekrar deneyin.');
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="flex items-center justify-center mb-12">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-green-600 font-medium">
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center"><CheckCircle size={18} /></div>
                            {t('checkout.steps.cart')}
                        </div>
                        <div className="w-12 h-0.5 bg-green-200"></div>
                        <div className="flex items-center gap-2 text-orange-600 font-bold">
                            <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center">2</div>
                            {t('checkout.steps.payment')}
                        </div>
                        <div className="w-12 h-0.5 bg-slate-200"></div>
                        <div className="flex items-center gap-2 text-slate-400 font-medium">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">3</div>
                            {t('checkout.steps.confirm')}
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                        {/* Shipping Address */}
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Truck className="text-orange-500" />
                                {t('checkout.shippingAddress')}
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">{t('checkout.fields.firstName')}</label>
                                    <input type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">{t('checkout.fields.lastName')}</label>
                                    <input type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">{t('checkout.fields.address')}</label>
                                    <input type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
                                </div>
                                <div className="col-span-1">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">{t('checkout.fields.city')}</label>
                                    <input type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
                                </div>
                                <div className="col-span-1">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">{t('checkout.fields.zipCode')}</label>
                                    <input type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
                                </div>
                            </div>
                        </div>

                        {/* Payment */}
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <CreditCard className="text-orange-500" />
                                {t('checkout.paymentMethod')}
                            </h2>

                            <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg mb-4 flex items-center gap-3">
                                <input type="radio" name="payment" checked readOnly className="text-orange-500 focus:ring-orange-500" />
                                <span className="font-medium text-slate-900">{t('checkout.creditCard')}</span>
                            </div>

                            <div className="p-4 bg-slate-50 rounded-lg text-sm text-slate-500">
                                {t('checkout.stripeInfo')}
                            </div>
                        </div>
                    </div>

                    {/* Summary Sidebar */}
                    <div className="md:col-span-1">
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm sticky top-24">
                            <h3 className="font-bold text-slate-900 mb-4">{t('cart.orderSummary')}</h3>
                            <div className="space-y-3 mb-6 text-sm">
                                <div className="flex justify-between text-slate-600">
                                    <span>{t('cart.product')} (3)</span>
                                    <span>$82.48</span>
                                </div>
                                <div className="flex justify-between text-slate-600">
                                    <span>{t('cart.shipping')}</span>
                                    <span>$15.00</span>
                                </div>
                                <div className="pt-3 border-t border-slate-100 flex justify-between items-end">
                                    <span className="font-bold text-slate-900 text-base">{t('cart.total')}</span>
                                    <span className="text-xl font-black text-orange-600">$97.48</span>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={loading}
                                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-3.5 rounded-lg font-bold shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : t('checkout.payNow')}
                            </button>

                            <p className="mt-4 text-xs text-center text-slate-400">
                                {t('checkout.agreement')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
