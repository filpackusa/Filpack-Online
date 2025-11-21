import React from 'react';
import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function SuccessPage() {
    return (
        <div className="bg-slate-50 min-h-screen flex items-center justify-center p-4">
            <div className="bg-white p-8 md:p-12 rounded-2xl border border-slate-200 shadow-xl max-w-lg w-full text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} className="text-green-600" />
                </div>

                <h1 className="text-3xl font-bold text-slate-900 mb-4">Siparişiniz Alındı!</h1>
                <p className="text-slate-600 mb-8">
                    Teşekkür ederiz. Ödemeniz başarıyla gerçekleşti ve siparişiniz işleme alındı.
                    Sipariş detayları e-posta adresinize gönderildi.
                </p>

                <div className="flex flex-col gap-3">
                    <Link href="/" className="bg-slate-900 text-white py-3.5 rounded-lg font-bold hover:bg-slate-800 transition-colors">
                        Anasayfaya Dön
                    </Link>
                    <Link href="/products" className="text-slate-500 font-medium hover:text-orange-600 transition-colors">
                        Alışverişe Devam Et
                    </Link>
                </div>
            </div>
        </div>
    );
}
