import * as React from 'react';

interface EmailTemplateProps {
    orderId: string;
    customerEmail: string;
    customerName: string;
    totalAmount: number;
    items: Array<{
        name: string;
        quantity: number;
        price: number;
    }>;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    orderId,
    customerEmail,
    customerName,
    totalAmount,
    items,
}) => (
    <div>
        <h1>Yeni Sipariş Alındı!</h1>
        <p><strong>Sipariş No:</strong> {orderId}</p>
        <p><strong>Müşteri:</strong> {customerName} ({customerEmail})</p>

        <h2>Sipariş Detayları</h2>
        <ul>
            {items.map((item, index) => (
                <li key={index}>
                    {item.name} - {item.quantity} adet x ${item.price.toFixed(2)}
                </li>
            ))}
        </ul>

        <h3>Toplam Tutar: ${totalAmount.toFixed(2)}</h3>

        <p>Sipariş detaylarını admin panelinden görüntüleyebilirsiniz.</p>
    </div>
);
