import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  Heart, 
  ShieldCheck, 
  Calendar, 
  Package, 
  Check, 
  ArrowLeft, 
  Share2, 
  Flag, 
  Clock, 
  Truck, 
  Store,
  Sparkles,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { ReportModal } from '../components/ReportModal';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { listings, isInWishlist, toggleWishlist, addToCart, showToast } = useApp();

  const listing = listings.find((l) => l.id === id);

  // Selected gallery image index
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [deliveryOption, setDeliveryOption] = useState<'pickup' | 'delivery'>('pickup');
  const [reportModalOpen, setReportModalOpen] = useState(false);

  // Dates: Default start tomorrow, end 3 days later
  const today = new Date();
  const defaultStart = new Date(today);
  defaultStart.setDate(today.getDate() + 1);
  const defaultEnd = new Date(today);
  defaultEnd.setDate(today.getDate() + 4);

  const formatDateForInput = (d: Date) => d.toISOString().split('T')[0];

  const [startDate, setStartDate] = useState<string>(formatDateForInput(defaultStart));
  const [endDate, setEndDate] = useState<string>(formatDateForInput(defaultEnd));

  // Calculate rental duration in days
  const rentalDays = useMemo(() => {
    if (!startDate || !endDate) return 1;
    const s = new Date(startDate);
    const e = new Date(endDate);
    const diffTime = e.getTime() - s.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }, [startDate, endDate]);

  if (!listing) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Listing not found</h2>
        <p className="text-sm text-neutral-500 mb-6">This item may have been removed or rented out.</p>
        <Link
          to="/browse"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#0F5A47] rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to browse</span>
        </Link>
      </div>
    );
  }

  const isWishlisted = isInWishlist(listing.id);

  // Price calculations
  const rentalFee = listing.dailyPrice * rentalDays;
  const serviceFee = Math.round(rentalFee * 0.1);
  const deliveryFee = deliveryOption === 'delivery' && listing.deliveryAvailable ? listing.deliveryFee : 0;
  const totalDue = rentalFee + serviceFee + deliveryFee + listing.securityDeposit;

  const handleReserveNow = () => {
    addToCart({
      listing,
      startDate,
      endDate,
      days: rentalDays,
      deliveryType: deliveryOption,
    });
    navigate('/checkout');
  };

  const handleAddToBag = () => {
    addToCart({
      listing,
      startDate,
      endDate,
      days: rentalDays,
      deliveryType: deliveryOption,
    });
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied', 'Listing link copied to clipboard.', 'info');
    }
  };

  const similarItems = listings
    .filter((l) => l.category === listing.category && l.id !== listing.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen pb-24">
      {/* Breadcrumb & Actions Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <Link
            to="/browse"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to listings</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="p-2 text-neutral-500 hover:text-neutral-900 rounded-lg hover:bg-white transition-colors"
              aria-label="Share listing"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setReportModalOpen(true)}
              className="p-2 text-neutral-400 hover:text-rose-600 rounded-lg hover:bg-white transition-colors"
              aria-label="Report listing"
            >
              <Flag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main PDP Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN: Gallery & Editorial Narrative */}
          <div className="lg:col-span-7 space-y-8">
            {/* Gallery Container */}
            <div className="space-y-3">
              <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-xs">
                <img
                  src={listing.images[selectedImageIdx] || listing.images[0]}
                  alt={listing.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />

                {/* Floating Heart */}
                <button
                  onClick={() => toggleWishlist(listing.id)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-neutral-700 shadow-sm hover:scale-105 active:scale-95 transition-transform"
                  aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-neutral-600'
                    }`}
                  />
                </button>
              </div>

              {/* Thumbnails if multiple images */}
              {listing.images.length > 1 && (
                <div className="flex items-center gap-3">
                  {listing.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIdx(idx)}
                      className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImageIdx === idx
                          ? 'border-[#0F5A47] ring-2 ring-[#0F5A47]/20'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Preview thumbnail ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description & Narrative */}
            <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-neutral-900 mb-3">About this item</h3>
                <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
                  {listing.description}
                </p>
              </div>

              {/* What's Included */}
              {listing.included && listing.included.length > 0 && (
                <div className="pt-6 border-t border-neutral-100">
                  <h4 className="text-sm font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#0F5A47]" />
                    <span>What’s included with this rental</span>
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-700">
                    {listing.included.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#0F5A47] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Care Instructions */}
              {listing.careInstructions && (
                <div className="pt-6 border-t border-neutral-100">
                  <h4 className="text-sm font-semibold text-neutral-900 mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#0F5A47]" />
                    <span>Care & handling notes</span>
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {listing.careInstructions}
                  </p>
                </div>
              )}

              {/* Rules & Guidelines */}
              <div className="pt-6 border-t border-neutral-100">
                <h4 className="text-sm font-semibold text-neutral-900 mb-3">Rental rules</h4>
                <ul className="space-y-2 text-xs text-neutral-600">
                  {listing.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Owner Profile Card */}
            <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-neutral-200 bg-neutral-100 shrink-0">
                    <img
                      src={listing.owner.avatar}
                      alt={listing.owner.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {listing.owner.verified && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#0F5A47] text-white flex items-center justify-center border-2 border-white">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-neutral-900">{listing.owner.name}</h4>
                    {listing.owner.verified && (
                      <span className="text-[11px] text-[#0F5A47] font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                        Verified Neighbor
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-500 mt-1">
                    <span className="flex items-center gap-0.5 text-neutral-800 font-medium">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{listing.owner.rating}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>Member since {listing.owner.memberSince}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 text-emerald-700">
                      <Clock className="w-3 h-3" />
                      <span>Replies {listing.owner.responseTime}</span>
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => showToast('Message feature', `Chat with ${listing.owner.name} will be active after placing reservation.`, 'info')}
                className="px-4 py-2 text-xs font-semibold text-neutral-700 border border-neutral-300 rounded-xl hover:bg-neutral-50 transition-colors whitespace-nowrap"
              >
                Contact Owner
              </button>
            </div>

            {/* Reviews Section */}
            {listing.reviews && listing.reviews.length > 0 && (
              <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                  <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                    <span>Neighbor reviews</span>
                    <span className="text-xs font-normal text-neutral-500">
                      ({listing.reviewCount} total)
                    </span>
                  </h3>
                  <div className="flex items-center gap-1 text-sm font-bold text-neutral-900">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{listing.rating.toFixed(1)}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {listing.reviews.map((rev) => (
                    <div key={rev.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={rev.authorAvatar}
                            alt={rev.authorName}
                            referrerPolicy="no-referrer"
                            className="w-7 h-7 rounded-full object-cover"
                          />
                          <span className="text-xs font-semibold text-neutral-900">{rev.authorName}</span>
                        </div>
                        <span className="text-[11px] text-neutral-400">{rev.date}</span>
                      </div>
                      <p className="text-xs text-neutral-600 leading-relaxed pl-9">
                        {rev.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Contiguous Sticky Purchase / Reservation Module */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm p-6 sm:p-8 space-y-6">
              {/* Product Header */}
              <div>
                <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
                  <span className="font-semibold text-neutral-800">{listing.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-0.5">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{listing.distanceKm} km away</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-medium text-neutral-700">{listing.condition}</span>
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-neutral-900 font-display leading-tight mb-2">
                  {listing.title}
                </h1>

                <div className="flex items-center gap-2 text-xs text-neutral-600">
                  <div className="flex items-center gap-1 font-bold text-neutral-900">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{listing.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-neutral-400">({listing.reviewCount} reviews)</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-neutral-500">{listing.location}</span>
                </div>
              </div>

              {/* Price Banner */}
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-bold text-neutral-900 tabular-nums">
                    ₹{listing.dailyPrice}
                  </span>
                  <span className="text-xs text-neutral-500 ml-1">/ day</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-neutral-500 block">Refundable deposit</span>
                  <span className="text-xs font-semibold text-neutral-900 tabular-nums">
                    ₹{listing.securityDeposit}
                  </span>
                </div>
              </div>

              {/* Date Selection Box */}
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-neutral-800 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#0F5A47]" />
                  <span>Select rental dates</span>
                </label>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-xl border border-neutral-200 bg-neutral-50/50">
                    <span className="block text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">
                      Borrow Date
                    </span>
                    <input
                      type="date"
                      value={startDate}
                      min={formatDateForInput(today)}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full text-xs font-semibold text-neutral-900 bg-transparent outline-none mt-1"
                    />
                  </div>

                  <div className="p-2.5 rounded-xl border border-neutral-200 bg-neutral-50/50">
                    <span className="block text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">
                      Return Date
                    </span>
                    <input
                      type="date"
                      value={endDate}
                      min={startDate || formatDateForInput(today)}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full text-xs font-semibold text-neutral-900 bg-transparent outline-none mt-1"
                    />
                  </div>
                </div>

                <div className="text-[11px] text-neutral-500 text-right">
                  Duration:{' '}
                  <span className="font-bold text-neutral-800 tabular-nums">{rentalDays}</span>{' '}
                  {rentalDays === 1 ? 'day' : 'days'}
                </div>
              </div>

              {/* Handover Method Selector */}
              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-2">
                  Handover preference
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryOption('pickup')}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      deliveryOption === 'pickup'
                        ? 'border-[#0F5A47] bg-emerald-50/50 text-[#0F5A47]'
                        : 'border-neutral-200 hover:border-neutral-300 text-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-semibold mb-0.5">
                      <Store className="w-3.5 h-3.5" />
                      <span>Self Pickup</span>
                    </div>
                    <span className="text-[11px] text-neutral-500 block">Free · Near {listing.location.split(',')[0]}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (listing.deliveryAvailable) {
                        setDeliveryOption('delivery');
                      } else {
                        showToast('Pickup only', 'The lender only offers self-pickup for this item.', 'info');
                      }
                    }}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      !listing.deliveryAvailable
                        ? 'opacity-40 cursor-not-allowed border-neutral-200 bg-neutral-50'
                        : deliveryOption === 'delivery'
                        ? 'border-[#0F5A47] bg-emerald-50/50 text-[#0F5A47]'
                        : 'border-neutral-200 hover:border-neutral-300 text-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-semibold mb-0.5">
                      <Truck className="w-3.5 h-3.5" />
                      <span>Doorstep</span>
                    </div>
                    <span className="text-[11px] text-neutral-500 block">
                      {listing.deliveryAvailable ? `+₹${listing.deliveryFee}` : 'Not available'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Dynamic Price Breakdown */}
              <div className="pt-4 border-t border-neutral-100 space-y-2 text-xs text-neutral-600">
                <div className="flex justify-between items-center">
                  <span>
                    ₹{listing.dailyPrice} × {rentalDays} {rentalDays === 1 ? 'day' : 'days'}
                  </span>
                  <span className="font-semibold text-neutral-800 tabular-nums">₹{rentalFee}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1">
                    <span>Service fee (10%)</span>
                    <Info className="w-3 h-3 text-neutral-400" />
                  </span>
                  <span className="font-semibold text-neutral-800 tabular-nums">₹{serviceFee}</span>
                </div>

                {deliveryOption === 'delivery' && (
                  <div className="flex justify-between items-center">
                    <span>Neighborhood delivery</span>
                    <span className="font-semibold text-neutral-800 tabular-nums">₹{deliveryFee}</span>
                  </div>
                )}

                <div className="flex justify-between items-center text-emerald-800">
                  <span className="flex items-center gap-1">
                    <span>Refundable security deposit</span>
                    <ShieldCheck className="w-3 h-3" />
                  </span>
                  <span className="font-semibold tabular-nums">₹{listing.securityDeposit}</span>
                </div>

                <div className="pt-3 border-t border-neutral-200 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-neutral-900">Total payable</span>
                  <div className="text-right">
                    <span className="text-xl font-bold text-neutral-900 tabular-nums">
                      ₹{totalDue}
                    </span>
                    <span className="text-[10px] text-neutral-400 block">
                      Includes ₹{listing.securityDeposit} deposit refunded on return
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleReserveNow}
                  className="w-full py-3.5 text-xs sm:text-sm font-semibold text-white bg-[#0F5A47] hover:bg-[#0B4536] rounded-xl shadow-xs transition-colors text-center"
                >
                  Reserve now &rarr;
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleAddToBag}
                    className="py-2.5 text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors text-center"
                  >
                    Add to cart
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleWishlist(listing.id)}
                    className="py-2.5 text-xs font-semibold text-neutral-700 border border-neutral-300 hover:border-neutral-400 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                    <span>{isWishlisted ? 'Saved' : 'Wishlist'}</span>
                  </button>
                </div>
              </div>

              {/* Trust Badge Footer */}
              <div className="pt-4 border-t border-neutral-100 flex items-center gap-3 text-[11px] text-neutral-500">
                <ShieldCheck className="w-5 h-5 text-[#0F5A47] shrink-0" />
                <span>
                  Deposit held safely in escrow. Only released to owner in case of unreturned damage.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Items Section */}
        {similarItems.length > 0 && (
          <div className="mt-20 pt-12 border-t border-neutral-200/80">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 font-display">
                  More in {listing.category} nearby
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Other options available within your neighborhood.
                </p>
              </div>
              <Link
                to={`/browse?category=${listing.category}`}
                className="text-xs font-semibold text-[#0F5A47] hover:underline"
              >
                View all &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarItems.map((item) => (
                <ProductCard key={item.id} listing={item} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Report Modal */}
      <ReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        targetTitle={listing.title}
        targetType="listing"
      />
    </div>
  );
};
