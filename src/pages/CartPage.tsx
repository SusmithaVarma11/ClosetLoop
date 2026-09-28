import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trash2, 
  ArrowRight, 
  ShoppingBag, 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  Store, 
  Truck,
  ArrowLeft 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateCartDates } = useApp();
  const navigate = useNavigate();

  // Summary calculations
  const subtotal = cart.reduce((acc, item) => acc + item.listing.dailyPrice * item.days, 0);
  const serviceFee = Math.round(subtotal * 0.1);
  const totalDeposit = cart.reduce((acc, item) => acc + item.listing.securityDeposit, 0);
  const totalDue = subtotal + serviceFee + totalDeposit;

  const handleDateChange = (
    listingId: string,
    field: 'start' | 'end',
    currentStart: string,
    currentEnd: string,
    newVal: string
  ) => {
    let s = currentStart;
    let e = currentEnd;
    if (field === 'start') s = newVal;
    if (field === 'end') e = newVal;

    const startDateObj = new Date(s);
    const endDateObj = new Date(e);
    const diffTime = endDateObj.getTime() - startDateObj.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const safeDays = diffDays > 0 ? diffDays : 1;

    updateCartDates(listingId, s, e, safeDays);
  };

  return (
    <div className="min-h-screen py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="pb-8 border-b border-neutral-200/80 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0F5A47] uppercase tracking-wider mb-1">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Reservation Bag</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 font-display">
            Your Cart
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Review your rental schedule and deposit breakdown before reserving.
          </p>
        </div>

        <Link
          to="/browse"
          className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue browsing</span>
        </Link>
      </div>

      {cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart items list */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => {
              const itemTotal = item.listing.dailyPrice * item.days;
              return (
                <div
                  key={item.listingId}
                  className="bg-white rounded-3xl border border-neutral-200/80 p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-start"
                >
                  {/* Thumbnail */}
                  <Link
                    to={`/listing/${item.listing.id}`}
                    className="w-full sm:w-32 aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 shrink-0 block"
                  >
                    <img
                      src={item.listing.images[0]}
                      alt={item.listing.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0 w-full space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 text-[11px] text-neutral-500 mb-1">
                          <span className="font-semibold text-neutral-700">{item.listing.category}</span>
                          <span aria-hidden="true">·</span>
                          <span className="flex items-center gap-0.5">
                            <MapPin className="w-3 h-3 text-neutral-400" />
                            <span>{item.listing.location.split(',')[0]}</span>
                          </span>
                        </div>
                        <Link
                          to={`/listing/${item.listing.id}`}
                          className="font-bold text-neutral-900 text-base sm:text-lg hover:text-[#0F5A47] transition-colors leading-snug line-clamp-1"
                        >
                          {item.listing.title}
                        </Link>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.listingId)}
                        className="p-1.5 text-neutral-400 hover:text-rose-600 rounded-lg transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Date Pickers Inline */}
                    <div className="bg-neutral-50 p-3 rounded-2xl border border-neutral-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="block text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                          From (Borrow)
                        </span>
                        <input
                          type="date"
                          value={item.startDate}
                          onChange={(e) =>
                            handleDateChange(
                              item.listingId,
                              'start',
                              item.startDate,
                              item.endDate,
                              e.target.value
                            )
                          }
                          className="w-full text-xs font-semibold text-neutral-800 bg-white border border-neutral-200 rounded-lg p-1.5 outline-none focus:border-[#0F5A47]"
                        />
                      </div>

                      <div>
                        <span className="block text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                          To (Return)
                        </span>
                        <input
                          type="date"
                          value={item.endDate}
                          min={item.startDate}
                          onChange={(e) =>
                            handleDateChange(
                              item.listingId,
                              'end',
                              item.startDate,
                              item.endDate,
                              e.target.value
                            )
                          }
                          className="w-full text-xs font-semibold text-neutral-800 bg-white border border-neutral-200 rounded-lg p-1.5 outline-none focus:border-[#0F5A47]"
                        />
                      </div>
                    </div>

                    {/* Pricing summary for this item */}
                    <div className="pt-2 flex items-center justify-between text-xs text-neutral-600">
                      <div>
                        <span className="font-semibold text-neutral-900 tabular-nums">
                          ₹{item.listing.dailyPrice}
                        </span>{' '}
                        × {item.days} {item.days === 1 ? 'day' : 'days'} ={' '}
                        <span className="font-bold text-neutral-900 tabular-nums">
                          ₹{itemTotal}
                        </span>
                      </div>
                      <div className="text-[11px] text-neutral-500">
                        Deposit: <span className="font-medium text-neutral-700">₹{item.listing.securityDeposit}</span> (refundable)
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sticky Order Summary */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-bold text-neutral-900">Order Summary</h3>

              <div className="space-y-3 text-xs text-neutral-600">
                <div className="flex justify-between items-center">
                  <span>Rental Subtotal</span>
                  <span className="font-semibold text-neutral-900 tabular-nums">₹{subtotal}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Platform Service Fee (10%)</span>
                  <span className="font-semibold text-neutral-900 tabular-nums">₹{serviceFee}</span>
                </div>

                <div className="flex justify-between items-center text-emerald-800 font-medium">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Refundable Deposit</span>
                  </span>
                  <span className="tabular-nums">₹{totalDeposit}</span>
                </div>

                <div className="pt-4 border-t border-neutral-200 flex justify-between items-baseline">
                  <div>
                    <span className="text-base font-bold text-neutral-900 block">Total Due</span>
                    <span className="text-[11px] text-neutral-400">
                      Deposit returned post-rental
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-neutral-900 tabular-nums">
                    ₹{totalDue}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate('/checkout')}
                className="w-full py-3.5 text-xs sm:text-sm font-semibold text-white bg-[#0F5A47] hover:bg-[#0B4536] rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Proceed to checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-[11px] text-neutral-500 text-center leading-relaxed">
                By reserving, you agree to our Community Lending Standards and Deposit Escrow Terms.
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-neutral-200/80 p-12 sm:p-16 text-center max-w-md mx-auto my-12">
          <div className="w-14 h-14 rounded-2xl bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-7 h-7 stroke-[1.5]" />
          </div>
          <h2 className="text-xl font-bold text-neutral-900 mb-2 font-display">
            Your closet is empty.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mb-6 leading-relaxed">
            Find something worth borrowing in your neighborhood — like designer outfits, audio gear, or power tools.
          </p>
          <Link
            to="/browse"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-[#0F5A47] hover:bg-[#0B4536] rounded-xl transition-colors shadow-xs"
          >
            <span>Explore items</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
};
