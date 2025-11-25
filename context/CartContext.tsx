'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    sku?: string;
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    cartCount: number;
    subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isLocalStorageAvailable, setIsLocalStorageAvailable] = useState(true);

    // Check if localStorage is available (fails in iOS Safari private browsing)
    useEffect(() => {
        try {
            const test = '__localStorage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            setIsLocalStorageAvailable(true);
        } catch (e) {
            console.warn('localStorage is not available, cart will not persist across sessions', e);
            setIsLocalStorageAvailable(false);
        }
    }, []);

    // Load cart from localStorage on mount
    useEffect(() => {
        if (!isLocalStorageAvailable) return;

        try {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                setItems(JSON.parse(savedCart));
            }
        } catch (e) {
            console.error('Failed to load cart from localStorage', e);
        }
    }, [isLocalStorageAvailable]);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (!isLocalStorageAvailable) return;

        try {
            localStorage.setItem('cart', JSON.stringify(items));
        } catch (e) {
            console.error('Failed to save cart to localStorage', e);
        }
    }, [items, isLocalStorageAvailable]);

    const addItem = (newItem: CartItem) => {
        setItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === newItem.id);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === newItem.id
                        ? { ...item, quantity: item.quantity + newItem.quantity }
                        : item
                );
            }
            return [...prevItems, newItem];
        });
    };

    const removeItem = (id: string) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity < 1) return;
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, cartCount, subtotal }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
