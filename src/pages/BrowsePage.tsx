import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  SlidersHorizontal, 
  MapPin, 
  X, 
  RotateCcw,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { CategoryType, ItemCondition } from '../types';

export const BrowsePage: React.FC = () => {
  const { listings } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState<string>(searchParams.get('category') || 'All');
  const [maxDistance, setMaxDistance] = useState<number>(10);
  const [priceRange, setPriceRange] = useState<string>('all');
  const [condition, setCondition] = useState<string>('all');
  const [deliveryFilter, setDeliveryFilter] = useState<string>('all'); // all, pickup, delivery
  const [sortBy, setSortBy] = useState<string>('recommended');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Sync state if URL query params change
  useEffect(() => {
    const q = searchParams.get('search');
    if (q !== null) setSearchQuery(q);
    const cat = searchParams.get('category');
    if (cat !== null) setCategory(cat);
  }, [searchParams]);

  const categories = [
    'All',
    'Fashion',
    'Accessories',
    'Electronics',
    'Books',
    'Sports',
    'Tools',
    'Travel',
    'Events',
  ];

  const handleCategoryClick = (cat: string) => {
    setCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setCategory('All');
    setMaxDistance(10);
    setPriceRange('all');
    setCondition('all');
    setDeliveryFilter('all');
    setSortBy('recommended');
    setSearchParams({});
  };

  // Filtered and sorted listings
  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      // 1. Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCat = item.category.toLowerCase().includes(query);
        const matchesLoc = item.location.toLowerCase().includes(query);
        const matchesOwner = item.owner.name.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesCat && !matchesLoc && !matchesOwner) {
          return false;
        }
      }

      // 2. Category
      if (category !== 'All' && item.category !== category) {
        return false;
      }

      // 3. Distance
      if (item.distanceKm > maxDistance) {
        return false;
      }

      // 4. Price range
      if (priceRange === 'under200' && item.dailyPrice >= 200) return false;
      if (priceRange === '200to500' && (item.dailyPrice < 200 || item.dailyPrice > 500)) return false;
      if (priceRange === '500to1000' && (item.dailyPrice < 500 || item.dailyPrice > 1000)) return false;
      if (priceRange === 'above1000' && item.dailyPrice <= 1000) return false;

      // 5. Condition
      if (condition !== 'all' && item.condition !== condition) {
        return false;
      }

      // 6. Delivery / Pickup
      if (deliveryFilter === 'delivery' && !item.deliveryAvailable) return false;
      if (deliveryFilter === 'pickup' && !item.pickupAvailable) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.dailyPrice - b.dailyPrice;
      if (sortBy === 'price-desc') return b.dailyPrice - a.dailyPrice;
      if (sortBy === 'nearest') return a.distanceKm - b.distanceKm;
      if (sortBy === 'popular') return b.reviewCount - a.reviewCount;
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      // 'recommended':
      return (b.rating * 10 + (b.featured ? 5 : 0)) - (a.rating * 10 + (a.featured ? 5 : 0));
    });
  }, [listings, searchQuery, category, maxDistance, priceRange, condition, deliveryFilter, sortBy]);

  const activeFilterCount = (category !== 'All' ? 1 : 0) +
    (maxDistance !== 10 ? 1 : 0) +
    (priceRange !== 'all' ? 1 : 0) +
    (condition !== 'all' ? 1 : 0) +
    (deliveryFilter !== 'all' ? 1 : 0);

  return (
    <div className="min-h-screen pb-20">
      {/* Top Header */}
      <div className="bg-white border-b border-neutral-200/70 pt-8 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 font-display">
              Find something worth borrowing.
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1.5">
              Available gear and occasion wear from verified lenders in your neighborhood.
            </p>
          </div>

          {/* Search bar & Controls */}
          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value) {
                    searchParams.set('search', e.target.value);
                  } else {
                    searchParams.delete('search');
                  }
                  setSearchParams(searchParams);
                }}
                placeholder="Search for dresses, cameras, books, tools..."
                className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:bg-white focus:border-[#0F5A47] placeholder:text-neutral-400 transition-colors"
              />
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    searchParams.delete('search');
                    setSearchParams(searchParams);
                  }}
                  className="absolute right-3.5 top-3 text-neutral-400 hover:text-neutral-700"
                  aria-label="Clear search text"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold bg-white border border-neutral-200 rounded-xl text-neutral-800"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#0F5A47]" />
              <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <ArrowUpDown className="w-4 h-4 text-neutral-400 shrink-0 hidden sm:block" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto text-xs py-2.5 px-3 bg-white border border-neutral-200 rounded-xl text-neutral-800 focus:outline-none focus:border-[#0F5A47]"
                aria-label="Sort listings"
              >
                <option value="recommended">Sort: Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="nearest">Nearest First</option>
                <option value="popular">Most Popular</option>
                <option value="newest">Recently Added</option>
              </select>
            </div>
          </div>

          {/* Interactive Category Filter Bar (Functional Buttons) */}
          <div className="mt-5 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                    active
                      ? 'bg-neutral-900 text-white shadow-xs'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/80 hover:text-neutral-900'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Browse Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 bg-white rounded-2xl border border-neutral-200/80 p-5 space-y-6 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#0F5A47]" />
                <span>Filters</span>
              </h3>
              {activeFilterCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-neutral-500 hover:text-[#0F5A47] flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Max Distance Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-neutral-800 mb-2">
                <span>Maximum Distance</span>
                <span className="text-[#0F5A47] font-bold tabular-nums">{maxDistance} km</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                step="1"
                value={maxDistance}
                onChange={(e) => setMaxDistance(Number(e.target.value))}
                className="w-full accent-[#0F5A47] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                <span>1 km (walking)</span>
                <span>25 km (city)</span>
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-xs font-semibold text-neutral-800 mb-2">
                Daily Price
              </label>
              <div className="space-y-1.5 text-xs text-neutral-600">
                {[
                  { id: 'all', label: 'Any price' },
                  { id: 'under200', label: 'Under ₹200 / day' },
                  { id: '200to500', label: '₹200 - ₹500 / day' },
                  { id: '500to1000', label: '₹500 - ₹1,000 / day' },
                  { id: 'above1000', label: 'Above ₹1,000 / day' },
                ].map((p) => (
                  <label key={p.id} className="flex items-center gap-2 cursor-pointer hover:text-neutral-900">
                    <input
                      type="radio"
                      name="priceRangeDesktop"
                      checked={priceRange === p.id}
                      onChange={() => setPriceRange(p.id)}
                      className="accent-[#0F5A47]"
                    />
                    <span>{p.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Condition Filter */}
            <div>
              <label className="block text-xs font-semibold text-neutral-800 mb-2">
                Item Condition
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full text-xs p-2 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-800 focus:outline-none focus:border-[#0F5A47]"
              >
                <option value="all">Any Condition</option>
                <option value="Brand New">Brand New</option>
                <option value="Like New">Like New</option>
                <option value="Gently Used">Gently Used</option>
                <option value="Good">Good</option>
              </select>
            </div>

            {/* Delivery / Pickup method */}
            <div>
              <label className="block text-xs font-semibold text-neutral-800 mb-2">
                Handover Method
              </label>
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'pickup', label: 'Pickup' },
                  { id: 'delivery', label: 'Delivery' },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setDeliveryFilter(m.id)}
                    className={`py-1.5 px-2 rounded-md font-medium text-center transition-colors ${
                      deliveryFilter === m.id
                        ? 'bg-neutral-900 text-white'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Results Grid Container */}
          <main className="lg:col-span-9">
            {/* Header info */}
            <div className="flex items-center justify-between mb-5 text-xs text-neutral-500">
              <div>
                Showing <span className="font-bold text-neutral-800 tabular-nums">{filteredListings.length}</span>{' '}
                {filteredListings.length === 1 ? 'item' : 'items'} nearby
              </div>
              {searchQuery && (
                <div className="text-neutral-600">
                  Search results for &ldquo;<span className="font-semibold text-neutral-900">{searchQuery}</span>&rdquo;
                </div>
              )}
            </div>

            {/* Listing Grid */}
            {filteredListings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredListings.map((item) => (
                  <ProductCard key={item.id} listing={item} />
                ))}
              </div>
            ) : (
              /* Empty State with Actionable Guidance */
              <div className="bg-white rounded-3xl border border-neutral-200 p-12 text-center max-w-lg mx-auto my-8">
                <div className="w-12 h-12 rounded-2xl bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-1">
                  We couldn&rsquo;t find that yet.
                </h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto mb-6 leading-relaxed">
                  {searchQuery
                    ? `No listings match "${searchQuery}" with the current filters. Try expanding your search distance or browse other categories.`
                    : 'No items match your active filters. Try resetting filters to see available gear.'}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={resetFilters}
                    className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors"
                  >
                    Clear all filters
                  </button>
                  <button
                    onClick={() => {
                      setCategory('Electronics');
                      setSearchQuery('');
                      searchParams.set('category', 'Electronics');
                      setSearchParams(searchParams);
                    }}
                    className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-white bg-[#0F5A47] hover:bg-[#0B4536] rounded-xl transition-colors"
                  >
                    Try browsing Electronics
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Slide-over / Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/40 backdrop-blur-xs lg:hidden animate-in fade-in">
          <div className="bg-white rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="text-base font-bold text-neutral-900">Filter Listings</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Distance */}
            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-neutral-800 mb-2">
                <span>Maximum Distance</span>
                <span className="text-[#0F5A47] font-bold">{maxDistance} km</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                step="1"
                value={maxDistance}
                onChange={(e) => setMaxDistance(Number(e.target.value))}
                className="w-full accent-[#0F5A47]"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-xs font-semibold text-neutral-800 mb-2">
                Price Range
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'all', label: 'Any price' },
                  { id: 'under200', label: 'Under ₹200' },
                  { id: '200to500', label: '₹200 - ₹500' },
                  { id: '500to1000', label: '₹500 - ₹1,000' },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPriceRange(p.id)}
                    className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-colors ${
                      priceRange === p.id
                        ? 'border-[#0F5A47] bg-emerald-50 text-[#0F5A47]'
                        : 'border-neutral-200 text-neutral-700'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Handover */}
            <div>
              <label className="block text-xs font-semibold text-neutral-800 mb-2">
                Handover Method
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {['all', 'pickup', 'delivery'].map((m) => (
                  <button
                    key={m}
                    onClick={() => setDeliveryFilter(m)}
                    className={`py-2 px-3 rounded-xl border font-medium capitalize text-center ${
                      deliveryFilter === m
                        ? 'border-[#0F5A47] bg-emerald-50 text-[#0F5A47]'
                        : 'border-neutral-200 text-neutral-700'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center gap-3">
              <button
                onClick={() => {
                  resetFilters();
                  setMobileFilterOpen(false);
                }}
                className="flex-1 py-3 text-xs font-semibold text-neutral-600 bg-neutral-100 rounded-xl"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3 text-xs font-semibold text-white bg-[#0F5A47] rounded-xl shadow-xs"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
