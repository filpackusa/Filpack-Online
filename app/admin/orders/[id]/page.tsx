'use client';

import React, { useEffect, useState } from 'react';
import { ArrowLeft, Truck, Save, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { getOrderById, updateOrderStatus } from '../../../actions';
import { useParams } from 'next/navigation';

export default function AdminOrderDetailPage() {
    const params = useParams();
    const [order, setOrder] = useState<any>(null);
    const [trackingNumber, setTrackingNumber] = useState('');
    const [carrier, setCarrier] = useState('UPS');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function fetchOrder() {
            if (params.id) {
                const result = await getOrderById(params.id as string);
                if (result.success) {
                    setOrder(result.order);
                    setTrackingNumber(result.order?.trackingNumber || '');
                    setCarrier(result.order?.carrier || 'UPS');
                }
            }
            setLoading(false);
        }
        fetchOrder();
    }, [params.id]);

    const handleSaveTracking = async () => {
        setSaving(true);
        const result = await updateOrderStatus(order.id, 'SHIPPED', trackingNumber, carrier);
        if (result.success) {
            setOrder({ ...order, status: 'SHIPPED', trackingNumber, carrier });
            alert('Sipariş güncellendi ve müşteriye kargolandı olarak işaretlendi!');
        } else {
            alert('Hata oluştu.');
        }
        setSaving(false);
    };

    if (loading) return <div className="p-8 text-center">Yükleniyor...</div>;
    if (!order) return <div className="p-8 text-center">Sipariş bulunamadı.</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <Link href="/admin/orders" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-6">
                <ArrowLeft size={20} /> Siparişlere Dön
            </Link>

            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                        Sipariş #{order.id.slice(-6)}
                        <span className={`text-sm px-3 py-1 rounded-full ${order.status === 'SHIPPED' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                            {order.status}
                        </span>
                    </h1>
                    <p className="text-slate-500 mt-1">{new Date(order.createdAt).toLocaleString('tr-TR')}</p>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Main Info */}
                <div className="md:col-span-2 space-y-6">
                    {/* Order Items */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="font-bold text-slate-900 mb-4">Ürünler</h3>
                        <div className="space-y-4">
                            {order.items.map((item: any) => (
                                <div key={item.id} className="flex items-center gap-4 border-b border-slate-100 pb-4 last:border-0">
                                    <div className="w-12 h-12 bg-slate-100 rounded-lg"></div>
                                    <div className="flex-1">
                                        <div className="font-medium text-slate-900">{item.product.name}</div>
                                        <div className="text-sm text-slate-500">{item.quantity} x ${item.price}</div>
                                    </div>
                                    <div className="font-bold">${(item.quantity * item.price).toFixed(2)}</div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                            <span className="font-bold text-slate-900">Toplam Tutar</span>
                            <span className="text-xl font-bold text-orange-600">${order.total.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Customer Info */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="font-bold text-slate-900 mb-4">Müşteri Bilgileri</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <div className="text-slate-500">E-posta</div>
                                <div className="font-medium">{order.customer.email}</div>
                            </div>
                            <div>
                                <div className="text-slate-500">Stripe ID</div>
                                <div className="font-medium text-xs font-mono bg-slate-100 p-1 rounded">{order.stripeId || '-'}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Actions */}
                <div className="space-y-6">
                    {/* Tracking Action */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Truck className="text-orange-500" size={20} />
                            Kargo İşlemleri
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Kargo Firması</label>
                                <select
                                    value={carrier}
                                    onChange={(e) => setCarrier(e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                                >
                                    <option value="UPS">UPS</option>
                                    <option value="FedEx">FedEx</option>
                                    <option value="USPS">USPS</option>
                                    <option value="DHL">DHL</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Takip Numarası</label>
                                <input
                                    type="text"
                                    value={trackingNumber}
                                    onChange={(e) => setTrackingNumber(e.target.value)}
                                    placeholder="1Z999..."
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                                />
                            </div>
                            <button
                                onClick={handleSaveTracking}
                                disabled={saving}
                                className="w-full bg-slate-900 text-white py-2.5 rounded-lg font-bold hover:bg-slate-800 flex items-center justify-center gap-2"
                            >
                                {saving ? 'Kaydediliyor...' : <><Save size={18} /> Kargolandı İşaretle</>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
