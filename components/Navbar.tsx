'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, Menu, X, Phone, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { cartCount } = useCart();



  return (
    <header className="glass sticky top-0 z-50 transition-all duration-300">
      {/* Top Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <p className="font-medium tracking-wide">{t('hero.subSlogan')}</p>
          <div className="flex items-center gap-6">
            <a href="tel:+18572336053" className="flex items-center gap-2 hover:text-white transition-colors group">
              <Phone size={14} className="group-hover:scale-110 transition-transform" />
              <span className="font-medium">+1 857 233 6053</span>
            </a>
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-2 hover:text-white transition-colors font-bold group"
              >
                <Globe size={14} className="group-hover:rotate-12 transition-transform" />
                {language.toUpperCase()}
              </button>

              {isLangMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsLangMenuOpen(false)}
                  ></div>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-2xl border border-slate-100 py-2 z-50 text-slate-700 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <button
                      onClick={() => { setLanguage('en'); setIsLangMenuOpen(false); }}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-slate-50 flex items-center gap-3 transition-colors ${language === 'en' ? 'font-bold text-orange-600 bg-orange-50' : ''}`}
                    >
                      <span className="text-xl">🇺🇸</span> English
                    </button>
                    <button
                      onClick={() => { setLanguage('es'); setIsLangMenuOpen(false); }}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-slate-50 flex items-center gap-3 transition-colors ${language === 'es' ? 'font-bold text-orange-600 bg-orange-50' : ''}`}
                    >
                      <span className="text-xl">🇪🇸</span> Español
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 hover:opacity-90 transition-opacity">
            <img src="/logo.png" alt="Filpack Online" className="h-28 w-auto" />
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-xl relative group">
            <input
              type="text"
              placeholder={t('nav.search')}
              className="w-full px-5 py-3 bg-slate-100/50 border border-transparent rounded-full focus:outline-none focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all shadow-sm group-hover:bg-white group-hover:shadow-md"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30">
              <Search size={18} />
            </button>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-8 font-medium text-slate-600">
              <Link href="/products" className="hover:text-orange-600 transition-colors relative group">
                {t('nav.products')}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
              </Link>
              <Link href="/track-order" className="hover:text-orange-600 transition-colors relative group">
                {t('nav.trackOrder')}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
              </Link>
            </nav>

            <Link href="/cart" className="relative group">
              <div className="p-3 bg-slate-100 rounded-full text-slate-600 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-orange-500/30">
                <ShoppingCart size={22} />
              </div>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-in zoom-in">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md absolute w-full shadow-lg animate-in slide-in-from-top-5">
          <div className="p-4 space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder={t('nav.search')}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Search size={20} />
              </button>
            </div>
            <nav className="flex flex-col gap-2 font-medium text-slate-700">
              <Link href="/products" className="px-4 py-3 hover:bg-slate-50 rounded-lg transition-colors">{t('nav.products')}</Link>
              <Link href="/track-order" className="px-4 py-3 hover:bg-slate-50 rounded-lg transition-colors">{t('nav.trackOrder')}</Link>
              <Link href="/cart" className="px-4 py-3 flex items-center gap-3 text-orange-600 bg-orange-50 rounded-lg">
                <ShoppingCart size={20} />
                {t('nav.cart')} ({cartCount})
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
