import { auth, signOut } from "@/auth"
import Link from "next/link"
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    LogOut
} from "lucide-react"

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    try {
        const session = await auth()

        return (
            <div className="flex min-h-screen bg-gray-100">
                {/* Sidebar */}
                <aside className="w-64 bg-white shadow-md">
                    <div className="p-6">
                        <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
                        <p className="text-sm text-gray-500">Welcome, {session?.user?.name || 'Admin'}</p>
                    </div>
                    <nav className="mt-6 px-6">
                        <div className="space-y-2">
                            <Link
                                href="/admin"
                                className="flex items-center gap-3 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                <LayoutDashboard size={20} />
                                Dashboard
                            </Link>
                            <Link
                                href="/admin/products"
                                className="flex items-center gap-3 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                <Package size={20} />
                                Products
                            </Link>
                            <Link
                                href="/admin/orders"
                                className="flex items-center gap-3 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                <ShoppingCart size={20} />
                                Orders
                            </Link>
                        </div>
                        <div className="mt-8 border-t pt-4">
                            <form
                                action={async () => {
                                    "use server"
                                    await signOut()
                                }}
                            >
                                <button
                                    type="submit"
                                    className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-red-600 hover:bg-red-50"
                                >
                                    <LogOut size={20} />
                                    Sign Out
                                </button>
                            </form>
                        </div>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8">
                    {children}
                </main>
            </div>
        )
    } catch (error) {
        console.error('Admin layout error:', error)
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <div className="max-w-md rounded-lg bg-white p-8 shadow-md">
                    <h2 className="mb-4 text-xl font-bold text-red-600">Admin Error</h2>
                    <p className="text-gray-700 mb-4">Unable to load admin panel. Please try logging in again.</p>
                    <Link href="/auth/signin?callbackUrl=/admin" className="inline-block bg-blue-600 text-white px-4 py-2 rounded">
                        Back to Login
                    </Link>
                </div>
            </div>
        )
    }
}
