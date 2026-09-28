import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, MapPin, Sparkles, Package } from 'lucide-react';
import { Listing } from '../types';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  listing: Listing;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ listing }) => {
  const { isInWishlist, toggleWishlist } = useApp();
  const [imageError, setImageError] = useState(false);
  const isWishlisted = isInWishlist(listing.id);

  const mainImage = listing.images[0] || '';

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-neutral-200/70 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      {/* Visual media container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
        <Link to={`/listing/${listing.id}`} className="block w-full h-full">
          {!imageError && mainImage ? (
            <img
              src={mainImage}
              alt={listing.title}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-200 text-neutral-400 p-4">
              <Package className="w-10 h-10 stroke-[1.5] text-neutral-400 mb-2" />
              <span className="text-xs font-medium text-neutral-500 text-center line-clamp-1">{listing.title}</span>
            </div>
          )}
        </Link>

        {/* Top Floating Actions: Wishlist Heart */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(listing.id);
          }}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-neutral-700 shadow-sm transition-transform active:scale-90 hover:scale-105 hover:bg-white"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-neutral-600 hover:text-rose-500'
            }`}
          />
        </button>

        {/* Condition tag if brand new */}
        {listing.condition === 'Brand New' && (
          <div className="absolute top-3 left-3 z-10 bg-black/75 backdrop-blur-md text-white text-[11px] font-medium tracking-wide px-2.5 py-1 rounded-md flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>Brand New</span>
          </div>
        )}
      </div>

      {/* Card Content Details */}
      <div className="p-4 flex flex-col flex-1">
        {/* Zero-Pill Quiet Metadata */}
        <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-1.5 flex-wrap">
          <span className="font-medium text-neutral-700">{listing.category}</span>
          <span aria-hidden="true" className="text-neutral-300">·</span>
          <span className="flex items-center gap-0.5">
            <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
            <span>{listing.distanceKm} km away</span>
          </span>
          <span aria-hidden="true" className="text-neutral-300">·</span>
          <span className="flex items-center gap-0.5 text-neutral-800 font-medium">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400 shrink-0" />
            <span>{listing.rating.toFixed(1)}</span>
            <span className="text-neutral-400 font-normal">({listing.reviewCount})</span>
          </span>
        </div>

        {/* Item Title */}
        <Link to={`/listing/${listing.id}`} className="group-hover:text-[#0F5A47] transition-colors">
          <h3 className="font-semibold text-neutral-900 text-base leading-snug line-clamp-1 mb-1">
            {listing.title}
          </h3>
        </Link>

        {/* Subtle neighborhood caption */}
        <p className="text-xs text-neutral-500 line-clamp-1 mb-3">
          {listing.location}
        </p>

        {/* Price & Owner Footer */}
        <div className="mt-auto pt-3 border-t border-neutral-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-neutral-900 tabular-nums">
                ₹{listing.dailyPrice}
              </span>
              <span className="text-xs font-normal text-neutral-500">/ day</span>
            </div>
            <span className="text-[11px] text-neutral-400">
              ₹{listing.securityDeposit} deposit
            </span>
          </div>

          {/* Owner info */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full overflow-hidden bg-neutral-200 shrink-0">
              <img
                src={listing.owner.avatar}
                alt={listing.owner.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-right hidden sm:block">
              <span className="text-xs font-medium text-neutral-800 block leading-tight">
                {listing.owner.name.split(' ')[0]}
              </span>
              <span className="text-[10px] text-neutral-400">
                {listing.owner.verified ? 'Verified' : 'Member'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
