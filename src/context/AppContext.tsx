import React, { createContext, useContext, useState, useEffect } from 'react';
import { Listing, CartItem, Order, UserProfile, OrderStatus } from '../types';
import { INITIAL_LISTINGS, INITIAL_USER, INITIAL_ORDERS } from '../data/mockData';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'info' | 'warning';
}

interface AppContextType {
  listings: Listing[];
  wishlist: string[];
  cart: CartItem[];
  orders: Order[];
  user: UserProfile;
  toasts: ToastMessage[];
  toggleWishlist: (listingId: string) => void;
  isInWishlist: (listingId: string) => boolean;
  addToCart: (item: { listing: Listing; startDate: string; endDate: string; days: number; deliveryType?: 'pickup' | 'delivery' }) => void;
  updateCartDates: (listingId: string, startDate: string, endDate: string, days: number) => void;
  removeFromCart: (listingId: string) => void;
  clearCart: () => void;
  createOrder: (orderPayload: {
    contact: { fullName: string; email: string; phone: string };
    deliveryMethod: 'pickup' | 'delivery';
    address?: { houseFlat: string; street: string; city: string; state: string; pincode: string };
    paymentMethod: 'upi' | 'card' | 'netbanking' | 'wallet';
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  addListing: (listingData: Omit<Listing, 'id' | 'createdAt' | 'owner' | 'rating' | 'reviewCount'>) => Listing;
  deleteListing: (listingId: string) => void;
  toggleListingAvailability: (listingId: string) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  showToast: (title: string, description?: string, type?: 'success' | 'info' | 'warning') => void;
  dismissToast: (id: string) => void;
  getListingById: (id: string) => Listing | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Listings
  // Listings (v4 with 80 distinct items across all 8 categories)
  const [listings, setListings] = useState<Listing[]>(() => {
    try {
      // Clear older versions to prevent stale blazer image persistence
      localStorage.removeItem('closetloop_listings_v1');
      localStorage.removeItem('closetloop_listings_v2');
      localStorage.removeItem('closetloop_listings_v3');

      const saved = localStorage.getItem('closetloop_listings_v4');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 80) return parsed;
      }
    } catch (e) {
      console.error('Failed to load listings from storage', e);
    }
    return INITIAL_LISTINGS;
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('closetloop_wishlist_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load wishlist from storage', e);
    }
    return ['fas-001', 'fas-002', 'elec-001'];
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('closetloop_cart_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load cart from storage', e);
    }
    return [];
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('closetloop_orders_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load orders from storage', e);
    }
    return INITIAL_ORDERS;
  });

  // User
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('closetloop_user_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load user from storage', e);
    }
    return INITIAL_USER;
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('closetloop_listings_v4', JSON.stringify(listings));
    } catch (e) {
      console.error('Failed to save listings', e);
    }
  }, [listings]);

  useEffect(() => {
    try {
      localStorage.setItem('closetloop_wishlist_v2', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('closetloop_cart_v1', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('closetloop_orders_v1', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('closetloop_user_v1', JSON.stringify(user));
    } catch (e) {
      console.error('Failed to save user', e);
    }
  }, [user]);

  const showToast = (title: string, description?: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleWishlist = (listingId: string) => {
    const exists = wishlist.includes(listingId);
    const item = listings.find((l) => l.id === listingId);
    const itemName = item ? item.title : 'Item';

    if (exists) {
      setWishlist((prev) => prev.filter((id) => id !== listingId));
      showToast('Removed from wishlist', `${itemName} removed from your saved items.`, 'info');
    } else {
      setWishlist((prev) => [...prev, listingId]);
      showToast('Saved to wishlist', `${itemName} is now in your saved list.`, 'success');
    }
  };

  const isInWishlist = (listingId: string) => wishlist.includes(listingId);

  const addToCart = ({
    listing,
    startDate,
    endDate,
    days,
    deliveryType = 'pickup',
  }: {
    listing: Listing;
    startDate: string;
    endDate: string;
    days: number;
    deliveryType?: 'pickup' | 'delivery';
  }) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex((item) => item.listingId === listing.id);
      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx] = {
          listingId: listing.id,
          listing,
          startDate,
          endDate,
          days,
          deliveryType,
        };
        return copy;
      }
      return [
        ...prev,
        {
          listingId: listing.id,
          listing,
          startDate,
          endDate,
          days,
          deliveryType,
        },
      ];
    });

    showToast(
      'Added to reservation bag',
      `${listing.title} (${days} ${days === 1 ? 'day' : 'days'}) is ready for review.`,
      'success'
    );
  };

  const updateCartDates = (listingId: string, startDate: string, endDate: string, days: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.listingId === listingId ? { ...item, startDate, endDate, days } : item
      )
    );
    showToast('Rental dates updated', `Duration updated to ${days} ${days === 1 ? 'day' : 'days'}.`, 'info');
  };

  const removeFromCart = (listingId: string) => {
    setCart((prev) => prev.filter((item) => item.listingId !== listingId));
    showToast('Item removed', 'Item was removed from your reservation cart.', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const createOrder = ({
    contact,
    deliveryMethod,
    address,
    paymentMethod,
  }: {
    contact: { fullName: string; email: string; phone: string };
    deliveryMethod: 'pickup' | 'delivery';
    address?: { houseFlat: string; street: string; city: string; state: string; pincode: string };
    paymentMethod: 'upi' | 'card' | 'netbanking' | 'wallet';
  }): Order => {
    const subtotal = cart.reduce((acc, item) => acc + item.listing.dailyPrice * item.days, 0);
    const serviceFee = Math.round(subtotal * 0.1);
    const deliveryFee = deliveryMethod === 'delivery' ? 60 : 0;
    const securityDeposit = cart.reduce((acc, item) => acc + item.listing.securityDeposit, 0);
    const totalPaid = subtotal + serviceFee + deliveryFee + securityDeposit;

    const orderId = `CL-${Math.floor(20000 + Math.random() * 80000)}`;
    const paymentId = `pay_sim_${Date.now()}`;

    const newOrder: Order = {
      orderId,
      createdAt: new Date().toISOString(),
      items: cart.map((item) => ({
        listing: item.listing,
        startDate: item.startDate,
        endDate: item.endDate,
        days: item.days,
        rentalCost: item.listing.dailyPrice * item.days,
        deposit: item.listing.securityDeposit,
      })),
      contact,
      deliveryMethod,
      address,
      paymentMethod,
      paymentId,
      subtotal,
      serviceFee,
      deliveryFee,
      securityDeposit,
      totalPaid,
      status: 'Reserved',
      pickupTime: 'Tomorrow, 10:00 AM',
      returnTime: 'Final day, 6:00 PM',
      timeline: [
        { title: 'Reservation Confirmed & Paid', time: 'Just now', completed: true },
        { title: 'Owner Notification & Handover Ready', time: 'Pending owner reply (~15 mins)', completed: false, current: true },
        { title: 'Pickup & Verification Inspection', time: 'Tomorrow, 10:00 AM', completed: false },
        { title: 'Active Rental Period', time: 'In progress during rental', completed: false },
        { title: 'Inspection & Security Deposit Released', time: 'Upon return', completed: false },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.orderId !== orderId) return order;
        return {
          ...order,
          status,
        };
      })
    );
    showToast('Order status updated', `Order #${orderId} is now marked as ${status}.`, 'info');
  };

  const addListing = (
    listingData: Omit<Listing, 'id' | 'createdAt' | 'owner' | 'rating' | 'reviewCount'>
  ): Listing => {
    const newId = `cl-${Date.now().toString().slice(-5)}`;
    const newListing: Listing = {
      ...listingData,
      id: newId,
      createdAt: new Date().toISOString().split('T')[0],
      rating: 5.0,
      reviewCount: 0,
      owner: {
        id: 'usr-me',
        name: user.name,
        avatar: user.avatar,
        rating: user.rating,
        reviewsCount: user.reviewsCount,
        verified: user.verified,
        memberSince: 'Today',
        responseTime: '< 10 mins',
        neighborhood: user.location,
      },
    };

    setListings((prev) => [newListing, ...prev]);
    showToast('Listing published! 🎉', `${newListing.title} is now visible to your neighborhood.`, 'success');
    return newListing;
  };

  const deleteListing = (listingId: string) => {
    const item = listings.find((l) => l.id === listingId);
    setListings((prev) => prev.filter((l) => l.id !== listingId));
    showToast('Listing removed', `${item?.title || 'Listing'} was removed.`, 'info');
  };

  const toggleListingAvailability = (listingId: string) => {
    setListings((prev) =>
      prev.map((l) => {
        if (l.id !== listingId) return l;
        const next = !l.isAvailable;
        showToast(
          next ? 'Listing resumed' : 'Listing paused',
          `${l.title} is now ${next ? 'available to borrow' : 'paused from discovery'}.`,
          'info'
        );
        return { ...l, isAvailable: next };
      })
    );
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updates }));
    showToast('Profile updated', 'Your account settings were saved.', 'success');
  };

  const getListingById = (id: string) => listings.find((l) => l.id === id);

  return (
    <AppContext.Provider
      value={{
        listings,
        wishlist,
        cart,
        orders,
        user,
        toasts,
        toggleWishlist,
        isInWishlist,
        addToCart,
        updateCartDates,
        removeFromCart,
        clearCart,
        createOrder,
        updateOrderStatus,
        addListing,
        deleteListing,
        toggleListingAvailability,
        updateUserProfile,
        showToast,
        dismissToast,
        getListingById,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
