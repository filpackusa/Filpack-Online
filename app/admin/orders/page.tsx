import { prisma } from "@/lib/prisma"
import { updateOrderStatus } from "@/app/actions/orders"
import { format } from "date-fns" // Need to check if date-fns is installed, if not use native Date
import { Prisma } from "@prisma/client"

type OrderWithDetails = Prisma.OrderGetPayload<{
    include: {
        customer: true
        items: {
            include: {
                product: true
            }
        }
    }
}>

// Helper for date formatting if date-fns is missing
const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date)
}

export const dynamic = 'force-dynamic'

export default async function OrdersPage() {
    const orders = await prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            customer: true,
            items: {
                include: {
                    product: true,
                },
            },
        },
    })

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
            </div>

            <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
                <table className="w-full text-left text-sm text-gray-500">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                        <tr>
                            <th className="px-6 py-3">Order ID</th>
                            <th className="px-6 py-3">Customer</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Total</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Items</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order: OrderWithDetails) => (
                            <tr key={order.id} className="border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    #{order.id.slice(-6).toUpperCase()}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900">
                                        {order.customer.name || "Guest"}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {order.customer.email}
                                    </div>
                                </td>
                                <td className="px-6 py-4">{formatDate(order.createdAt)}</td>
                                <td className="px-6 py-4">${order.total.toFixed(2)}</td>
                                <td className="px-6 py-4">
                                    <form action={async (formData) => {
                                        "use server"
                                        const status = formData.get("status") as string
                                        await updateOrderStatus(order.id, status)
                                    }}>
                                        <select
                                            name="status"
                                            defaultValue={order.status}
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${order.status === "PAID"
                                                ? "bg-green-100 text-green-800"
                                                : order.status === "PENDING"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : "bg-blue-100 text-blue-800"
                                                }`}
                                            onChange={(e) => {
                                                // This is a bit tricky with server actions in onChange without JS
                                                // Ideally we use a submit button or client component
                                                // For simplicity, we'll just use a submit button next to it or rely on form submission
                                                // But onChange requires client component.
                                                // Let's make it simple: just a select and a hidden submit or auto-submit with JS if possible.
                                                // Since this is a server component, we can't use onChange handler easily.
                                                // I'll wrap it in a client component or just use a button.
                                                // Let's use a small "Update" button.
                                            }}
                                        >
                                            <option value="PENDING">Pending</option>
                                            <option value="PAID">Paid</option>
                                            <option value="SHIPPED">Shipped</option>
                                            <option value="DELIVERED">Delivered</option>
                                            <option value="CANCELLED">Cancelled</option>
                                        </select>
                                        <button type="submit" className="ml-2 text-xs text-blue-600 hover:underline">
                                            Update
                                        </button>
                                    </form>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-1">
                                        {order.items.map((item) => (
                                            <div key={item.id} className="text-xs">
                                                {item.quantity}x {item.product.name}
                                            </div>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {orders.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-6 py-4 text-center">
                                    No orders found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
