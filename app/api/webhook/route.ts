import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { Resend } from 'resend';
import { prisma } from '@/lib/prisma';
import { EmailTemplate } from '@/components/email-template';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-12-18.acacia',
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get('stripe-signature') as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;

        // Retrieve the session with line items to get product details
        const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
            session.id,
            {
                expand: ['line_items'],
            }
        );

        const lineItems = sessionWithLineItems.line_items?.data || [];

        try {
            // Prepare order items
            const orderItemsData = [];
            for (const item of lineItems) {
                if (!item.description) continue;

                const product = await prisma.product.findFirst({
                    where: { name: item.description },
                });

                if (product) {
                    orderItemsData.push({
                        product: { connect: { id: product.id } },
                        quantity: item.quantity || 1,
                        price: item.amount_total ? (item.amount_total / 100) / (item.quantity || 1) : 0,
                    });
                } else {
                    console.warn(`Product not found for order item: ${item.description}`);
                    // Optional: Handle missing product (e.g., create a placeholder or skip)
                }
            }

            // Create Order in Database
            const order = await prisma.order.create({
                data: {
                    customer: {
                        connectOrCreate: {
                            where: { email: session.customer_details?.email || '' },
                            create: {
                                email: session.customer_details?.email || '',
                                name: session.customer_details?.name || 'Guest',
                            },
                        },
                    },
                    total: session.amount_total ? session.amount_total / 100 : 0,
                    status: 'PAID',
                    items: {
                        create: orderItemsData,
                    },
                },
            });
            // Send Email Notification
            await resend.emails.send({
                from: 'Filpack Online <onboarding@resend.dev>', // Update with verified domain if available
                to: ['melih@filpackusa.com'],
                subject: `Yeni Sipariş: ${order.id}`,
                react: EmailTemplate({
                    orderId: order.id,
                    customerEmail: session.customer_details?.email || '',
                    customerName: session.customer_details?.name || '',
                    totalAmount: session.amount_total ? session.amount_total / 100 : 0,
                    items: lineItems.map(item => ({
                        name: item.description || 'Ürün',
                        quantity: item.quantity || 1,
                        price: item.amount_total ? (item.amount_total / 100) / (item.quantity || 1) : 0,
                    })),
                }),
            });

            return NextResponse.json({ result: event, ok: true });
        } catch (error) {
            console.error('Error processing webhook:', error);
            return NextResponse.json(
                { message: 'Webhook handler failed' },
                { status: 500 }
            );
        }
    }

    return NextResponse.json({ result: event, ok: true });
}
