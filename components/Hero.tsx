'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Truck, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
    const { t } = useLanguage();

    return (
        <div className="relative bg-slate-900 text-white overflow-hidden min-h-[80vh] flex items-center">
            {/* Background Pattern */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-800/90"></div>
                <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-orange-500/20 blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 -left-24 w-72 h-72 rounded-full bg-blue-500/20 blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="container mx-auto px-4 py-20 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50 text-orange-400 text-sm font-medium mb-8 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                        </span>
                        Filpack Online
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-tight animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        {t('hero.slogan')}
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                        {t('hero.subSlogan')}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                        <Link href="/products" className="group bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-1">
                            {t('hero.shopNow')}
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <button className="bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold text-lg transition-all backdrop-blur-sm border border-white/10 hover:border-white/20">
                            {t('hero.getQuote')}
                        </button>
                    </div>

                    <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap justify-center gap-8 md:gap-16 text-sm font-medium text-slate-400 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-500/10 rounded-full">
                                <ShieldCheck className="text-green-500" size={20} />
                            </div>
                            {t('hero.trust.fda')}
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-500/10 rounded-full">
                                <Truck className="text-blue-500" size={20} />
                            </div>
                            {t('hero.trust.shipping')}
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-orange-500/10 rounded-full">
                                <CheckCircle className="text-orange-500" size={20} />
                            </div>
                            {t('hero.trust.wholesale')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
