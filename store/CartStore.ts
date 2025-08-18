import { getSessionId, syncToBackend } from '@/lib/actions/cart-action';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    productId: string;
    productName: string;
    quantity: number;
    platform: string;
    platformLogo: string;
    price: number;
    discount?: number;
    imageUrl: string;
    brand?: string;
    category?: {
        name: string;
        image: string;
    };
    stock?: string;
    deliveryTime?: string;
    // Add any other fields you need for display
}

interface CartData {
    [platform: string]: CartItem[];
}

interface CartStore {
    cart: CartData;

    addItem: (
        productId: string, 
        platform: string, 
        platformLogo: string, 
        quantity: number,
        // Enhanced parameters for rich data storage
        productData: {
            productName: string;
            price: number;
            discount?: number;
            imageUrl: string;
            brand?: string;
            category?: {
                name: string;
                image: string;
            };
            stock?: string;
            deliveryTime?: string;
        }
    ) => void;
    
    removeItem: (productId: string, platform: string, quantity?: number) => void;
    clearCart: () => void;
    getItemQuantity: (productId: string, platform: string) => number;
    getTotalItems: () => number;
    getPlatformItems: (platform: string) => CartItem[];
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            cart: {},

            addItem: (productId, platform, platformLogo, quantity = 1, productData) => {
                const sessionId = getSessionId();

                set((state) => {
                    const items = state.cart[platform] || [];
                    const existingIndex = items.findIndex(item => item.productId === productId);

                    if (existingIndex >= 0) {
                        // Update existing item quantity
                        return {
                            cart: {
                                ...state.cart,
                                [platform]: items.map((item, index) =>
                                    index === existingIndex
                                        ? { ...item, quantity: item.quantity + quantity }
                                        : item
                                )
                            }
                        };
                    }

                    // Add new item with rich data
                    const newItem: CartItem = {
                        productId,
                        platform,
                        platformLogo,
                        quantity,
                        productName: productData.productName,
                        price: productData.price,
                        discount: productData.discount,
                        imageUrl: productData.imageUrl,
                        brand: productData.brand,
                        category: productData.category,
                        stock: productData.stock,
                        deliveryTime: productData.deliveryTime,
                    };

                    return {
                        cart: {
                            ...state.cart,
                            [platform]: [...items, newItem]
                        }
                    };
                });

                // Backend sync with minimal data (fire and forget)
                syncToBackend.add(sessionId, productId, platform, platformLogo, quantity);
            },

            removeItem: (productId, platform, quantity) => {
                const sessionId = getSessionId();

                set((state) => {
                    const items = state.cart[platform] || [];
                    const existingItem = items.find(item => item.productId === productId);
                    
                    if (!existingItem) return state; // Item doesn't exist
                    
                    const platformLogo = existingItem.platformLogo;
                    
                    // If no quantity specified or quantity >= current quantity, remove completely
                    if (!quantity || quantity >= existingItem.quantity) {
                        const filteredItems = items.filter(item => item.productId !== productId);
                        
                        if (filteredItems.length === 0) {
                            // Remove entire platform if no items left
                            const { [platform]: removed, ...rest } = state.cart;
                            
                            // Sync complete removal to backend
                            syncToBackend.remove(sessionId, productId, platform, platformLogo);
                            
                            return { cart: rest };
                        }
                        
                        // Sync complete removal to backend
                        syncToBackend.remove(sessionId, productId, platform, platformLogo);
                        
                        return {
                            cart: {
                                ...state.cart,
                                [platform]: filteredItems
                            }
                        };
                    }
                    
                    // Partial removal - reduce quantity
                    const newQuantity = existingItem.quantity - quantity;
                    
                    if (newQuantity <= 0) {
                        // If quantity becomes 0 or less, remove completely
                        const filteredItems = items.filter(item => item.productId !== productId);
                        
                        if (filteredItems.length === 0) {
                            const { [platform]: removed, ...rest } = state.cart;
                            syncToBackend.remove(sessionId, productId, platform, platformLogo);
                            return { cart: rest };
                        }
                        
                        syncToBackend.remove(sessionId, productId, platform, platformLogo);
                        
                        return {
                            cart: {
                                ...state.cart,
                                [platform]: filteredItems
                            }
                        };
                    }
                    
                    // Update quantity (this becomes our "update" functionality)
                    syncToBackend.update(sessionId, productId, platform, platformLogo, newQuantity);
                    
                    return {
                        cart: {
                            ...state.cart,
                            [platform]: items.map(item =>
                                item.productId === productId 
                                    ? { ...item, quantity: newQuantity }
                                    : item
                            )
                        }
                    };
                });
            },

            clearCart: () => {
                const sessionId = getSessionId();
                set({ cart: {} });
                syncToBackend.clear(sessionId);
            },

            getItemQuantity: (productId, platform) => {
                const items = get().cart[platform] || [];
                const item = items.find(item => item.productId === productId);
                return item?.quantity || 0;
            },

            getTotalItems: () => {
                const cart = get().cart;
                return Object.values(cart).reduce(
                    (total, items) => total + items.reduce((sum, item) => sum + item.quantity, 0),
                    0
                );
            },

            getPlatformItems: (platform) => {
                return get().cart[platform] || [];
            },
        }),
        {
            name: 'cart-storage',
        }
    )
);

// Simple hooks
export const useCartItemCount = () => useCartStore(state => state.getTotalItems());
export const usePlatformItems = (platform: string) => useCartStore(state => state.getPlatformItems(platform));