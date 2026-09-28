import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';

import { LandingPage } from './pages/LandingPage';
import { BrowsePage } from './pages/BrowsePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { WishlistPage } from './pages/WishlistPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { OrdersPage } from './pages/OrdersPage';
import { ListAnItemPage } from './pages/ListAnItemPage';
import { MyListingsPage } from './pages/MyListingsPage';
import { ProfilePage } from './pages/ProfilePage';
import { TrustAndSafetyPage } from './pages/TrustAndSafetyPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#FBFBF9] text-[#191919] font-sans antialiased selection:bg-[#0F5A47]/15 selection:text-[#0F5A47]">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/browse" element={<BrowsePage />} />
              <Route path="/listing/:id" element={<ProductDetailPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/list-item" element={<ListAnItemPage />} />
              <Route path="/my-listings" element={<MyListingsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/trust-and-safety" element={<TrustAndSafetyPage />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
