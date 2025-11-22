import { prisma } from "@/lib/prisma"
import { Package, ShoppingCart, DollarSign, Users } from "lucide-react"
import Link from "next/link"

// Fallback UI components if shadcn/ui is not installed
function SimpleCard({ title, value, icon: Icon, color }: any) {
    return (
        <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <h3 className="mt-2 text-3xl font-bold text-gray-900">{value}</h3>
                </div>
                <div className={`rounded-full p-3 ${color}`}>
                    <Icon className="h-6 w-6 text-white" />
                </div>
            </div>
        </div>
    )
}

export default async function AdminDashboard() {
    const [totalRevenueResult, totalOrders, totalProducts, totalCustomers, recentOrders] = await Promise.all([
        prisma.order.aggregate({
            _sum: { total: true },
            where: { status: { in: ['PAID', 'SHIPPED', 'DELIVERED'] } }
        }),
        prisma.order.count(),
        prisma.product.count(),
        prisma.customer.count(),
        prisma.order.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: { customer: true }
        })
    ])

    const totalRevenue = totalRevenueResult._sum.total || 0

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-800">Dashboard Overview</h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <SimpleCard
                    title="Total Revenue"
                    value={`$${totalRevenue.toFixed(2)}`}
                    icon={DollarSign}
                    color="bg-green-500"
                />
                <SimpleCard
                    title="Total Orders"
                    value={totalOrders.toString()}
                    icon={ShoppingCart}
                    color="bg-blue-500"
                />
                <SimpleCard
                    title="Products"
                    value={totalProducts.toString()}
                    icon={Package}
                    color="bg-purple-500"
                />
                <SimpleCard
                    title="Customers"
                    value={totalCustomers.toString()}
                    icon={Users}
                    color="bg-orange-500"
                />
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
                    <Link href="/admin/orders" className="text-sm text-blue-600 hover:underline">
                        View All
                    </Link>
                </div>

                {recentOrders.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-500">
                            <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                                <tr>
                                    <th className="px-6 py-3">Order ID</th>
                                    <th className="px-6 py-3">Customer</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            #{order.id.slice(-6).toUpperCase()}
                                        </td>
                                        <td className="px-6 py-4">
                                            {order.customer.name || order.customer.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`rounded-full px-2 py-1 text-xs font-semibold ${order.status === "PAID" ? "bg-green-100 text-green-800" :
                                                    order.status === "PENDING" ? "bg-yellow-100 text-yellow-800" :
                                                        "bg-blue-100 text-blue-800"
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">${order.total.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-500">No orders found.</p>
                )}
            </div>
        </div>
    )
}
