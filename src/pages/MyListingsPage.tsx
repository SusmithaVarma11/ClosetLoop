import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Eye, 
  Trash2, 
  Pause, 
  Play, 
  TrendingUp, 
  Package, 
  Clock, 
  CheckCircle, 
  Coins,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MyListingsPage: React.FC = () => {
  const { listings, user, deleteListing, toggleListingAvailability, showToast } = useApp();

  // Find listings owned by current user (or fallback to demo items if first time)
  const myListings = listings.filter(
    (l) => l.owner.id === 'usr-me' || l.owner.name === user.name || l.id === 'fas-001' || l.id === 'fas-002'
  );

  const totalListings = myListings.length;
  const activeRentalsCount = 1;
  const totalEarnings = 3450;

  return (
    <div className="min-h-screen py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Header */}
      <div className="pb-8 border-b border-neutral-200/80 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0F5A47] uppercase tracking-wider mb-1">
            <Coins className="w-3.5 h-3.5" />
            <span>Lender Overview</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 font-display">
            My Lending Closet
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Manage your items available to borrow, track active rentals, and earnings.
          </p>
        </div>

        <Link
          to="/list-item"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#0F5A47] hover:bg-[#0B4536] rounded-xl transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>List new item</span>
        </Link>
      </div>

      {/* Metrics Row (Elegant & Restrained) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-2xs">
          <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
            Total Listings
          </span>
          <div className="text-2xl font-bold text-neutral-900 mt-1 font-display tabular-nums">
            {totalListings}
          </div>
          <span className="text-xs text-neutral-400 mt-1 block">Live in neighborhood</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-2xs">
          <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
            Active Rentals
          </span>
          <div className="text-2xl font-bold text-emerald-800 mt-1 font-display tabular-nums">
            {activeRentalsCount}
          </div>
          <span className="text-xs text-neutral-400 mt-1 block">Currently with neighbor</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-2xs">
          <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
            Lifetime Earnings
          </span>
          <div className="text-2xl font-bold text-neutral-900 mt-1 font-display tabular-nums">
            ₹{totalEarnings}
          </div>
          <span className="text-xs text-emerald-700 mt-1 flex items-center gap-1 font-medium">
            <TrendingUp className="w-3 h-3" />
            <span>+₹750 this week</span>
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-2xs">
          <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
            Lender Rating
          </span>
          <div className="text-2xl font-bold text-neutral-900 mt-1 font-display tabular-nums">
            ⭐ 4.95
          </div>
          <span className="text-xs text-neutral-400 mt-1 block">18 positive reviews</span>
        </div>
      </div>

      {/* Listings Table / Cards */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 overflow-hidden shadow-xs">
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-neutral-900">Your Items ({myListings.length})</h2>
          <span className="text-xs text-neutral-500">Live inventory</span>
        </div>

        {myListings.length > 0 ? (
          <div className="divide-y divide-neutral-100">
            {myListings.map((item) => (
              <div
                key={item.id}
                className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-neutral-50/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-14 rounded-2xl overflow-hidden bg-neutral-100 shrink-0">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-semibold text-neutral-500">
                        {item.category}
                      </span>
                      <span aria-hidden="true" className="text-neutral-300">·</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          item.isAvailable
                            ? 'bg-emerald-50 text-[#0F5A47]'
                            : 'bg-neutral-100 text-neutral-600'
                        }`}
                      >
                        {item.isAvailable ? 'Active' : 'Paused'}
                      </span>
                    </div>

                    <Link
                      to={`/listing/${item.id}`}
                      className="font-bold text-neutral-900 text-sm hover:text-[#0F5A47] transition-colors"
                    >
                      {item.title}
                    </Link>

                    <div className="text-xs text-neutral-500 mt-0.5">
                      <span className="font-semibold text-neutral-900 tabular-nums">
                        ₹{item.dailyPrice}
                      </span>{' '}
                      / day · ₹{item.securityDeposit} deposit · {item.location}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <Link
                    to={`/listing/${item.id}`}
                    className="p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors text-xs flex items-center gap-1 font-semibold"
                    title="View item"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="hidden sm:inline">View</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => toggleListingAvailability(item.id)}
                    className="p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors text-xs flex items-center gap-1 font-semibold"
                    title={item.isAvailable ? 'Pause item' : 'Activate item'}
                  >
                    {item.isAvailable ? (
                      <>
                        <Pause className="w-4 h-4" />
                        <span className="hidden sm:inline">Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 text-[#0F5A47]" />
                        <span className="hidden sm:inline">Activate</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to remove "${item.title}"?`)) {
                        deleteListing(item.id);
                      }
                    }}
                    className="p-2 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors text-xs flex items-center gap-1 font-semibold"
                    title="Delete item"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <Package className="w-12 h-12 stroke-1 text-neutral-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-neutral-900">No items listed yet</h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto mt-1 mb-6">
              Have high-end clothes, camera accessories, or tools sitting unused? List them to start earning today.
            </p>
            <Link
              to="/list-item"
              className="inline-flex px-5 py-2.5 text-xs font-semibold text-white bg-[#0F5A47] rounded-xl"
            >
              List your first item
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
