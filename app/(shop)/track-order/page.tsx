'use client';

import React, { useState } from 'react';
import { Search, Package, Truck, CheckCircle, AlertCircle } from 'lucide-react';
import { getOrderStatus } from '@/app/actions/orders';
import { useLanguage } from '@/context/LanguageContext';

export default function TrackOrderPage() {
    const { t } = useLanguage();
    const [orderId, setOrderId] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState('');

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResult(null);

        const response = await getOrderStatus(orderId, email);

        if (response.success) {
            setResult(response.order);
        } else {
            setError(response.message || t('trackOrder.notFound'));
        }
        setLoading(false);
    };

    return (

        <div className="min-h-screen py-20 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-96 bg-slate-900 -z-10"></div>
            <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
            <div className="absolute top-[10%] left-[-5%] w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 max-w-3xl relative z-10">
                <div className="text-center mb-12 text-white">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">{t('trackOrder.title')}</h1>
                    <p className="text-slate-300 text-lg max-w-xl mx-auto">{t('trackOrder.desc')}</p>
                </div>

                {/* Search Form */}
                <div className="glass-card p-8 md:p-10 rounded-3xl shadow-2xl mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <form onSubmit={handleSearch} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-slate-700 ml-1">{t('trackOrder.orderId')}</label>
                                <input
                                    type="text"
                                    required
                                    placeholder={t('trackOrder.placeholderId')}
                                    value={orderId}
                                    onChange={(e) => setOrderId(e.target.value)}
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-slate-700 ml-1">{t('trackOrder.email')}</label>
                                <input
                                    type="email"
                                    required
                                    placeholder={t('trackOrder.placeholderEmail')}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-slate-900 hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-orange-500/30 flex items-center justify-center gap-3 group"
                        >
                            {loading ? (
                                <span className="animate-pulse">{t('trackOrder.searching')}</span>
                            ) : (
                                <>
                                    <Search size={20} className="group-hover:scale-110 transition-transform" />
                                    {t('trackOrder.search')}
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-100 text-red-600 p-6 rounded-2xl flex items-center gap-4 mb-8 animate-in shake">
                        <div className="p-3 bg-red-100 rounded-full shrink-0">
                            <AlertCircle size={24} />
                        </div>
                        <span className="font-medium">{error}</span>
                    </div>
                )}

                {/* Order Result */}
                {result && (
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <div className="bg-slate-900 p-8 text-white flex flex-wrap gap-4 justify-between items-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                            <div className="relative z-10">
                                <div className="text-slate-400 text-sm font-medium mb-1">{t('trackOrder.date')}</div>
                                <div className="font-bold text-xl">{new Date(result.createdAt).toLocaleDateString('tr-TR')}</div>
                            </div>
                            <div className="text-right relative z-10">
                                <div className="text-slate-400 text-sm font-medium mb-1">{t('trackOrder.total')}</div>
                                <div className="font-black text-3xl text-orange-400">${result.total.toFixed(2)}</div>
                            </div>
                        </div>

                        <div className="p-8 md:p-10">
                            {/* Status Steps */}
                            <div className="flex items-center justify-between mb-16 relative">
                                <div className="absolute left-0 top-1/2 w-full h-1.5 bg-slate-100 -z-10 rounded-full"></div>
                                <div className="absolute left-0 top-1/2 h-1.5 bg-green-500 -z-10 rounded-full transition-all duration-1000" style={{ width: result.status === 'SHIPPED' ? '100%' : result.status === 'PAID' ? '50%' : '0%' }}></div>

                                <div className={`flex flex-col items-center gap-3 bg-white px-4 transition-colors duration-500 ${result.status === 'PENDING' || result.status === 'PAID' || result.status === 'SHIPPED' ? 'text-slate-900' : 'text-slate-400'}`}>
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${result.status === 'PENDING' || result.status === 'PAID' || result.status === 'SHIPPED' ? 'bg-green-50 border-green-500 text-green-600 scale-110' : 'bg-slate-50 border-slate-200'}`}>
                                        <CheckCircle size={24} />
                                    </div>
                                    <span className="text-sm font-bold">{t('trackOrder.status.received')}</span>
                                </div>

                                <div className={`flex flex-col items-center gap-3 bg-white px-4 transition-colors duration-500 ${result.status === 'PAID' || result.status === 'SHIPPED' ? 'text-slate-900' : 'text-slate-400'}`}>
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${result.status === 'PAID' || result.status === 'SHIPPED' ? 'bg-green-50 border-green-500 text-green-600 scale-110' : 'bg-slate-50 border-slate-200'}`}>
                                        <Package size={24} />
                                    </div>
                                    <span className="text-sm font-bold">{t('trackOrder.status.preparing')}</span>
                                </div>

                                <div className={`flex flex-col items-center gap-3 bg-white px-4 transition-colors duration-500 ${result.status === 'SHIPPED' ? 'text-slate-900' : 'text-slate-400'}`}>
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${result.status === 'SHIPPED' ? 'bg-green-50 border-green-500 text-green-600 scale-110' : 'bg-slate-50 border-slate-200'}`}>
                                        <Truck size={24} />
                                    </div>
                                    <span className="text-sm font-bold">{t('trackOrder.status.shipped')}</span>
                                </div>
                            </div>

                            {/* Tracking Info */}
                            {result.trackingNumber && (
                                <div className="bg-orange-50 border border-orange-100 p-8 rounded-2xl mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div>
                                        <div className="text-orange-800 font-bold mb-2 flex items-center gap-2">
                                            <Truck size={18} />
                                            {t('trackOrder.trackingNumber')}
                                        </div>
                                        <div className="text-3xl font-black text-slate-900 tracking-wider mb-1">{result.trackingNumber}</div>
                                        <div className="text-sm text-slate-500 font-medium">{t('trackOrder.carrier')}: <span className="text-slate-900">{result.carrier}</span></div>
                                    </div>
                                    <a
                                        href={`https://www.google.com/search?q=${result.carrier}+tracking+${result.trackingNumber}`}
                                        target="_blank"
                                        className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-orange-500/20 hover:-translate-y-1 text-center"
                                    >
                                        {t('trackOrder.trackButton')}
                                    </a>
                                </div>
                            )}

                            {/* Order Items */}
                            <h3 className="font-bold text-xl text-slate-900 mb-6 flex items-center gap-2">
                                <Package size={20} className="text-orange-500" />
                                {t('trackOrder.items')}
                            </h3>
                            <div className="space-y-4">
                                {result.items.map((item: any) => (
                                    <div key={item.id} className="flex items-center gap-6 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                        <div className={`w-20 h-20 rounded-xl shadow-sm ${item.product.image || 'bg-slate-100'} flex items-center justify-center overflow-hidden`}>
                                            {item.product.image ? <img src={item.product.image} className="w-full h-full object-cover" /> : 'IMG'}
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-bold text-slate-900 text-lg mb-1">{item.product.name}</div>
                                            <div className="text-sm text-slate-500 font-medium bg-slate-100 inline-block px-2 py-1 rounded">
                                                {item.quantity} {t('trackOrder.quantity')} x ${item.price}
                                            </div>
                                        </div>
                                        <div className="font-black text-xl text-slate-900">${(item.quantity * item.price).toFixed(2)}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
