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
    const session = await auth()

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
                    <p className="text-sm text-gray-500">Welcome, {session?.user?.name}</p>
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
}
