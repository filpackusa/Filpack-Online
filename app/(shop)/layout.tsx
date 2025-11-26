import Navbar from "@/components/Navbar";
import VisitorCounter from "@/components/VisitorCounter";
import { CartProvider } from "@/context/CartContext";

export default function ShopLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <CartProvider>
            <Navbar />
            <main className="min-h-screen bg-slate-50">
                {children}
            </main>
            <footer className="bg-slate-900 text-slate-400 py-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="text-center md:text-left">
                            <p>&copy; 2025 Filpack Online. All rights reserved.</p>
                            <p className="mt-2 text-sm text-slate-500">200K ST NE 1012 Washington DC 20002</p>
                        </div>
                        <VisitorCounter />
                    </div>
                </div>
            </footer>
        </CartProvider>
    );
}
