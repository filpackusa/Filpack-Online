'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

import Image from 'next/image';

const CategoryGrid = () => {
    const { t } = useLanguage();

    const categories = [
        { id: 'plastic', name: t('categories.items.plastic'), image: '/categories/plastic.png', count: '120+ ' + t('cart.product') },
        { id: 'bags', name: t('categories.items.bags'), image: '/categories/bags.png', count: '200+ ' + t('cart.product') },
        { id: 'netting', name: t('categories.items.netting'), image: '/categories/netting-v2.png', count: '30+ ' + t('cart.product') },
        { id: 'stretch-film', name: t('categories.items.stretchFilm'), image: '/categories/stretch-film.png', count: '50+ ' + t('cart.product') },
    ];

    return (
        <section className="container mx-auto px-4 py-24">
            <div className="flex items-end justify-between mb-12">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">{t('categories.title')}</h2>
                    <p className="text-lg text-slate-500 max-w-2xl">{t('categories.desc')}</p>
                </div>
                <Link href="/categories" className="hidden md:flex items-center gap-2 text-orange-600 font-bold hover:text-orange-700 transition-colors group">
                    {t('categories.viewAll')} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {categories.map((cat) => (
                    <Link key={cat.id} href={`/category/${cat.id}`} className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 hover:-translate-y-1">
                        <div className="aspect-[4/5] relative overflow-hidden">
                            <Image
                                src={cat.image}
                                alt={cat.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            <h3 className="font-bold text-2xl leading-tight mb-2">{cat.name}</h3>
                            <p className="text-sm text-slate-300 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 flex items-center gap-2">
                                {cat.count} <ArrowRight size={14} />
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="mt-12 text-center md:hidden">
                <Link href="/categories" className="inline-flex items-center gap-2 text-orange-600 font-bold">
                    {t('categories.viewAll')} <ArrowRight size={20} />
                </Link>
            </div>
        </section>
    );
};

export default CategoryGrid;
