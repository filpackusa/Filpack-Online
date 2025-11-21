"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function updateOrderStatus(orderId: string, status: string) {
    await prisma.order.update({
        where: { id: orderId },
        data: { status },
    })

    revalidatePath("/admin/orders")
}

export async function getOrderStatus(orderId: string, email: string) {
    try {
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                customer: true,
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });

        if (!order) {
            return { success: false, message: "Sipariş bulunamadı." };
        }

        if (order.customer.email.toLowerCase() !== email.toLowerCase()) {
            return { success: false, message: "Sipariş numarası veya e-posta adresi hatalı." };
        }

        return { success: true, order };
    } catch (error) {
        console.error("Order fetch error:", error);
        return { success: false, message: "Bir hata oluştu." };
    }
}
