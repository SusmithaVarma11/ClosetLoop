import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, Trash2, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';

export const WishlistPage: React.FC = () => {
  const { wishlist, listings, addToCart } = useApp();

  const wishlistedItems = listings.filter((l) => wishlist.includes(l.id));

  return (
    <div className="min-h-screen py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="pb-8 border-b border-neutral-200/80 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0F5A47] uppercase tracking-wider mb-1">
            <Heart className="w-3.5 h-3.5 fill-[#0F5A47]" />
            <span>Saved for later</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 font-display">
            Your Wishlist
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Items you’re considering for upcoming events, trips, or projects.
          </p>
        </div>

        {wishlistedItems.length > 0 && (
          <div className="text-xs text-neutral-500">
            <span className="font-bold text-neutral-900 tabular-nums">{wishlistedItems.length}</span>{' '}
            {wishlistedItems.length === 1 ? 'item saved' : 'items saved'}
          </div>
        )}
      </div>

      {/* Grid or Empty State */}
      {wishlistedItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistedItems.map((item) => (
            <div key={item.id} className="relative flex flex-col">
              <ProductCard listing={item} />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-neutral-200/80 p-12 sm:p-16 text-center max-w-md mx-auto my-12">
          <div className="w-14 h-14 rounded-2xl bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-7 h-7 stroke-[1.5]" />
          </div>
          <h2 className="text-xl font-bold text-neutral-900 mb-2 font-display">
            Your wishlist is waiting.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mb-6 leading-relaxed">
            Save items you might want later — like a tuxedo for next month, a camping tent for the weekend, or a lens for your next shoot.
          </p>
          <Link
            to="/browse"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-[#0F5A47] hover:bg-[#0B4536] rounded-xl transition-colors shadow-xs"
          >
            <span>Explore borrowable items</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
};
