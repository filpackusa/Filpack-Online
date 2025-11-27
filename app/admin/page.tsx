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
    let totalRevenue = 0
    let totalOrders = 0
    let totalProducts = 0
    let totalCustomers = 0
    let recentOrders: any[] = []
    let errorDetails = ''

    try {
        // Fetch Total Revenue
        try {
            const revenueResult = await prisma.order.aggregate({
                _sum: { total: true },
                where: { status: { in: ['PAID', 'SHIPPED', 'DELIVERED'] } }
            })
            totalRevenue = (revenueResult._sum.total as any) || 0
        } catch (e) {
            console.error('Error fetching revenue:', e)
            errorDetails += 'Revenue failed. '
        }

        // Fetch Total Orders
        try {
            totalOrders = await prisma.order.count()
        } catch (e) {
            console.error('Error fetching orders count:', e)
            errorDetails += 'Orders count failed. '
        }

        // Fetch Total Products
        try {
            totalProducts = await prisma.product.count()
        } catch (e) {
            console.error('Error fetching products count:', e)
            errorDetails += 'Products count failed. '
        }

        // Fetch Total Customers
        try {
            totalCustomers = await prisma.customer.count()
        } catch (e) {
            console.error('Error fetching customers count:', e)
            errorDetails += 'Customers count failed. '
        }

        // Fetch Recent Orders
        try {
            recentOrders = await prisma.order.findMany({
                take: 5,
                orderBy: { createdAt: 'desc' },
                include: { customer: true }
            })
        } catch (e) {
            console.error('Error fetching recent orders:', e)
            errorDetails += 'Recent orders failed. '
        }

        return (
            <div className="space-y-8">
                <h2 className="text-3xl font-bold text-gray-800">Dashboard Overview</h2>

                {errorDetails && (
                    <div className="rounded-md bg-yellow-50 p-4 border border-yellow-200">
                        <p className="text-sm text-yellow-700">
                            Warning: Some data could not be loaded. ({errorDetails})
                        </p>
                    </div>
                )}

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
                                                {order.customer?.name || order.customer?.email || 'Unknown'}
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
    } catch (error) {
        console.error('Admin dashboard fatal error:', error)
        return (
            <div className="space-y-8">
                <h2 className="text-3xl font-bold text-gray-800">Dashboard Overview</h2>
                <div className="rounded-xl bg-red-50 border border-red-200 p-6">
                    <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Dashboard</h3>
                    <p className="text-red-600">Unable to load dashboard data.</p>
                    <p className="text-sm text-red-500 mt-2">Error: {error instanceof Error ? error.message : 'Unknown error'}</p>
                </div>
            </div>
        )
    }
}
