import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Plus, User, Compass, Clock, ShieldCheck, Home } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const { cart, wishlist, user } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  const cartCount = cart.length;
  const wishlistCount = wishlist.length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  const navLinks = [
    { label: 'Explore', path: '/browse' },
    { label: 'Categories', path: '/browse#categories' },
    { label: 'How It Works', path: '/#how-it-works' },
    { label: 'Trust & Safety', path: '/trust-and-safety' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#FBFBF9]/95 backdrop-blur-md border-b border-neutral-200/70 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Zone 1: Single text element brand wordmark */}
          <Link
            to="/"
            className="flex items-center gap-1.5 text-xl font-bold tracking-tight text-neutral-900 font-display shrink-0 group"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#0F5A47] inline-block group-hover:scale-125 transition-transform" />
            <span>ClosetLoop</span>
          </Link>

          {/* Zone 2: 4 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-600">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`transition-colors hover:text-neutral-900 ${
                    isActive ? 'text-[#0F5A47] font-semibold' : ''
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Primary actions */}
          <div className="flex items-center gap-3">
            {/* Quick search input or toggle */}
            <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center relative">
              <input
                type="text"
                placeholder="Search blazers, cameras, gear..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-56 xl:w-64 pl-9 pr-3 py-1.5 text-xs bg-neutral-100/80 hover:bg-neutral-100 focus:bg-white border border-transparent focus:border-neutral-300 rounded-lg outline-none transition-all placeholder:text-neutral-400"
              />
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 pointer-events-none" />
            </form>

            {/* Mobile search toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="lg:hidden p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
              aria-label="Search items"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className="relative p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
              aria-label="View wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#0F5A47] text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Bag */}
            <Link
              to="/cart"
              className="relative p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
              aria-label="View reservation cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-neutral-900 text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* List an Item Button */}
            <Link
              to="/list-item"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0F5A47] hover:bg-[#0B4536] rounded-lg shadow-sm transition-colors whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>List an item</span>
            </Link>

            {/* Profile Avatar */}
            <Link
              to="/profile"
              className="flex items-center gap-2 p-1 hover:bg-neutral-100 rounded-lg transition-colors"
              aria-label="User profile"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border border-neutral-200/80 bg-neutral-200 shrink-0">
                <img
                  src={user.avatar}
                  alt={user.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile Search Expandable Bar */}
        {searchOpen && (
          <div className="lg:hidden px-4 pb-3 pt-1 border-t border-neutral-100 bg-[#FBFBF9]">
            <form onSubmit={handleSearchSubmit} className="flex items-center relative">
              <input
                type="text"
                autoFocus
                placeholder="Search blazers, cameras, tents, books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-neutral-300 rounded-lg outline-none focus:border-[#0F5A47] placeholder:text-neutral-400"
              />
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 pointer-events-none" />
            </form>
          </div>
        )}
      </header>

      {/* Mobile Sticky Bottom Navigation (<15% viewport height) */}
      <nav
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200/80 py-2 px-3 flex items-center justify-around"
      >
        <Link
          to="/"
          className={`flex flex-col items-center gap-0.5 text-[11px] font-medium transition-colors ${
            location.pathname === '/' ? 'text-[#0F5A47]' : 'text-neutral-500'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </Link>

        <Link
          to="/browse"
          className={`flex flex-col items-center gap-0.5 text-[11px] font-medium transition-colors ${
            location.pathname === '/browse' ? 'text-[#0F5A47]' : 'text-neutral-500'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span>Browse</span>
        </Link>

        <Link
          to="/list-item"
          className="flex flex-col items-center gap-0.5 text-[11px] font-medium text-neutral-700"
        >
          <div className="w-8 h-8 rounded-full bg-[#0F5A47] text-white flex items-center justify-center shadow-sm -mt-3">
            <Plus className="w-4 h-4" />
          </div>
          <span>List</span>
        </Link>

        <Link
          to="/orders"
          className={`flex flex-col items-center gap-0.5 text-[11px] font-medium transition-colors ${
            location.pathname === '/orders' ? 'text-[#0F5A47]' : 'text-neutral-500'
          }`}
        >
          <Clock className="w-5 h-5" />
          <span>Orders</span>
        </Link>

        <Link
          to="/profile"
          className={`flex flex-col items-center gap-0.5 text-[11px] font-medium transition-colors ${
            location.pathname === '/profile' ? 'text-[#0F5A47]' : 'text-neutral-500'
          }`}
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </Link>
      </nav>
    </>
  );
};
