'use server';

import { prisma } from '@/lib/prisma';

export async function getOrderStatus(orderId: string, email: string) {
    try {
        const order = await prisma.order.findFirst({
            where: {
                id: orderId,
                customer: {
                    email: email,
                },
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
                customer: true,
            },
        });

        if (!order) {
            return { success: false, message: 'Sipariş bulunamadı. Bilgileri kontrol edip tekrar deneyin.' };
        }

        return { success: true, order };
    } catch (error) {
        console.error('Sipariş sorgulama hatası:', error);
        return { success: false, message: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.' };
    }
}

export async function getAllOrders() {
    try {
        const orders = await prisma.order.findMany({
            include: {
                customer: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return { success: true, orders };
    } catch (error) {
        return { success: false, error };
    }
}

export async function getOrderById(id: string) {
    try {
        const order = await prisma.order.findUnique({
            where: { id },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
                customer: true,
            },
        });
        return { success: true, order };
    } catch (error) {
        return { success: false, error };
    }
}

export async function updateOrderStatus(id: string, status: string, trackingNumber?: string, carrier?: string) {
    try {
        await prisma.order.update({
            where: { id },
            data: {
                status,
                trackingNumber,
                carrier,
            },
        });
        return { success: true };
    } catch (error) {
        return { success: false, error };
    }
}

export async function getAllProducts() {
    try {
        const products = await prisma.product.findMany({
            orderBy: {
                name: 'asc',
            },
        });
        return { success: true, products };
    } catch (error) {
        return { success: false, error };
    }
}

export async function updateProduct(id: string, price: number, stock: number) {
    try {
        await prisma.product.update({
            where: { id },
            data: {
                price,
                stock,
            },
        });
        return { success: true };
    } catch (error) {
        return { success: false, error };
    }
}

export async function getProductById(id: string) {
    try {
        console.log('[getProductById] Fetching product with ID:', id);
        const product = await prisma.product.findUnique({
            where: { id },
        });

        console.log('[getProductById] Product found:', product ? 'YES' : 'NO');

        if (!product) {
            console.log('[getProductById] Product not found for ID:', id);
            return { success: false, error: 'Product not found' };
        }

        return { success: true, product };
    } catch (error) {
        console.error('[getProductById] Error:', error);
        return { success: false, error };
    }
}
