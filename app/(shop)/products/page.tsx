'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { Filter, ChevronDown } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { useLanguage } from '@/context/LanguageContext';
import { getProducts } from '@/app/actions/products';
import { useSearchParams } from 'next/navigation';

function ProductsContent() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('search');

    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [sort, setSort] = useState('recommended');

    const [minPrice, setMinPrice] = useState<number | undefined>();
    const [maxPrice, setMaxPrice] = useState<number | undefined>();

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const fetchedProducts = await getProducts({
                    category: selectedCategories.length > 0 ? selectedCategories[0] : undefined,
                    sort: sort === t('products.sort.lowestPrice') ? 'lowestPrice' :
                        sort === t('products.sort.highestPrice') ? 'highestPrice' : undefined,
                    minPrice,
                    maxPrice,
                    search: searchQuery || undefined
                });
                setProducts(fetchedProducts);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(fetchProducts, 500); // Debounce fetching
        return () => clearTimeout(timeoutId);
    }, [selectedCategories, sort, t, minPrice, maxPrice, searchQuery]);

    const toggleCategory = (catId: string) => {
        setSelectedCategories(prev =>
            prev.includes(catId) ? prev.filter(c => c !== catId) : [catId] // Allow only one category for now to match server action simple logic
        );
    };

    return (
        <div className="min-h-screen py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-8">

                    {/* Sidebar Filters */}
                    <div className="w-full md:w-64 shrink-0 space-y-6">
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <div className="flex items-center gap-2 font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100">
                                <Filter size={20} />
                                {t('products.filter')}
                            </div>

                            {/* Filter Group */}
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium text-slate-900 mb-3">{t('products.categories')}</h4>
                                    <div className="space-y-2">
                                        {[
                                            { label: t('products.all'), value: '' },
                                            { label: t('categories.items.plastic'), value: 'plastic' },
                                            { label: t('categories.items.netting'), value: 'netting' },
                                            { label: t('categories.items.stretchFilm'), value: 'stretch-film' },
                                            { label: t('categories.items.bags'), value: 'bags' }
                                        ].map((cat) => (
                                            <label key={cat.label} className="flex items-center gap-2 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    className="rounded border-slate-300 text-orange-500 focus:ring-orange-500"
                                                    checked={cat.value === '' ? selectedCategories.length === 0 : selectedCategories.includes(cat.value)}
                                                    onChange={() => {
                                                        if (cat.value === '') setSelectedCategories([]);
                                                        else toggleCategory(cat.value);
                                                    }}
                                                />
                                                <span className="text-sm text-slate-600 group-hover:text-orange-600 transition-colors">{cat.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-100">
                                    <h4 className="font-medium text-slate-900 mb-3">{t('products.priceRange')}</h4>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="number"
                                            placeholder="Min"
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                                            value={minPrice || ''}
                                            onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : undefined)}
                                        />
                                        <span className="text-slate-400">-</span>
                                        <input
                                            type="number"
                                            placeholder="Max"
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                                            value={maxPrice || ''}
                                            onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Header */}
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div>
                                <h1 className="text-xl font-bold text-slate-900">{t('products.allProducts')}</h1>
                                <p className="text-sm text-slate-500">{t('products.listing').replace('{count}', products.length.toString())}</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-sm text-slate-500">{t('products.sortBy')}:</span>
                                <div className="relative">
                                    <select
                                        value={sort}
                                        onChange={(e) => setSort(e.target.value)}
                                        className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-2 pl-4 pr-10 rounded-lg text-sm focus:outline-none focus:border-orange-500 cursor-pointer"
                                    >
                                        <option>{t('products.sort.recommended')}</option>
                                        <option>{t('products.sort.lowestPrice')}</option>
                                        <option>{t('products.sort.highestPrice')}</option>
                                    </select>
                                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Product Grid */}
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="bg-white h-80 rounded-xl animate-pulse"></div>
                                ))}
                            </div>
                        ) : products.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product) => (
                                    <ProductCard key={product.id} {...product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-100">
                                <p className="text-slate-500 text-lg font-medium">{t('products.noProductsFound')}</p>
                                <button
                                    onClick={() => window.location.href = '/products'}
                                    className="mt-4 text-orange-600 hover:text-orange-700 font-medium"
                                >
                                    {t('products.clearFilters')}
                                </button>
                            </div>
                        )}

                        {/* Pagination */}
                        <div className="mt-10 flex justify-center gap-2">
                            <button className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-50">{t('products.prev')}</button>
                            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium">1</button>
                            <button className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">2</button>
                            <button className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">3</button>
                            <button className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">{t('products.next')}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ProductsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div></div>}>
            <ProductsContent />
        </Suspense>
    );
}
