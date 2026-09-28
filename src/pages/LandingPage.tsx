import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Coins, 
  RefreshCw, 
  Users, 
  Award,
  Calendar,
  CheckCircle2,
  Package,
  ChevronRight,
  Shirt,
  Gem,
  Camera,
  BookOpen,
  Trophy,
  Wrench,
  Compass
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES, HERO_IMAGE } from '../data/mockData';

export const LandingPage: React.FC = () => {
  const { listings } = useApp();
  const navigate = useNavigate();
  const [quickSearch, setQuickSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [heroImageLoaded, setHeroImageLoaded] = useState(true);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      navigate(`/browse?search=${encodeURIComponent(quickSearch.trim())}`);
    } else {
      navigate('/browse');
    }
  };

  const popularListings = listings.filter((l) => l.popular).slice(0, 8);
  const featuredListings = listings.filter((l) => l.featured).slice(0, 4);

  // Category Icon helper
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'Fashion': return <Shirt className="w-5 h-5" />;
      case 'Accessories': return <Gem className="w-5 h-5" />;
      case 'Electronics': return <Camera className="w-5 h-5" />;
      case 'Books': return <BookOpen className="w-5 h-5" />;
      case 'Sports': return <Trophy className="w-5 h-5" />;
      case 'Tools': return <Wrench className="w-5 h-5" />;
      case 'Travel': return <Compass className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden border-b border-neutral-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Mission, Headline & Search */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Quiet unboxed kicker */}
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0F5A47] tracking-wider uppercase mb-4">
                <span>The Neighborhood Rental Marketplace</span>
                <span aria-hidden="true">·</span>
                <span>Verified Neighbors</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 font-display leading-[1.1] mb-6 text-balance">
                Borrow what you need. <br className="hidden sm:inline" />
                <span className="text-[#0F5A47] font-editorial italic font-normal">Keep what you love.</span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-neutral-600 max-w-xl leading-relaxed mb-8">
                Your neighborhood has everything you need. You just don’t own it yet. Borrow tailored blazers, cinema cameras, camping tents, and rare books from verified people nearby.
              </p>

              {/* Hyperlocal Search Container */}
              <form
                onSubmit={handleHeroSearch}
                className="bg-white p-2 rounded-2xl shadow-sm border border-neutral-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-xl mb-6"
              >
                <div className="flex-1 flex items-center pl-3 pr-2 py-1.5 gap-2.5 border-b sm:border-b-0 sm:border-r border-neutral-100">
                  <Search className="w-4 h-4 text-neutral-400 shrink-0" />
                  <input
                    type="text"
                    value={quickSearch}
                    onChange={(e) => setQuickSearch(e.target.value)}
                    placeholder="Try 'blazer for wedding', 'Sony camera', 'tent'..."
                    className="w-full text-xs sm:text-sm bg-transparent outline-none placeholder:text-neutral-400 text-neutral-900"
                  />
                </div>

                <div className="flex items-center pl-3 pr-2 py-1.5 gap-2 text-neutral-500">
                  <MapPin className="w-4 h-4 text-[#0F5A47] shrink-0" />
                  <span className="text-xs font-medium text-neutral-700 whitespace-nowrap">Within 5 km</span>
                </div>

                <button
                  type="submit"
                  className="px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-[#0F5A47] hover:bg-[#0B4536] rounded-xl transition-colors whitespace-nowrap flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>Search</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Quick tags */}
              <div className="flex items-center gap-2 text-xs text-neutral-500 flex-wrap">
                <span className="font-medium text-neutral-700">Popular today:</span>
                {['Black Blazer', 'Sony A7 III', 'Banarasi Saree', 'Camping Tent', 'Power Drill'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => navigate(`/browse?search=${encodeURIComponent(tag)}`)}
                    className="text-neutral-600 hover:text-[#0F5A47] hover:underline transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Curated Collection Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-md aspect-[4/3] lg:aspect-[1/1] w-full">
                {heroImageLoaded ? (
                  <img
                    src={HERO_IMAGE}
                    alt="ClosetLoop curated collection of borrowable wardrobe and gear"
                    referrerPolicy="no-referrer"
                    onError={() => setHeroImageLoaded(false)}
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center text-neutral-400">
                    <Package className="w-16 h-16 stroke-1 text-neutral-400" />
                  </div>
                )}

                {/* Quiet Floating Trust Callout */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 border border-neutral-200/80 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#0F5A47] flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-neutral-900 leading-tight">100% Escrow Protected</div>
                      <div className="text-[11px] text-neutral-500">Security deposits released upon return</div>
                    </div>
                  </div>
                  <Link
                    to="/browse"
                    className="text-xs font-semibold text-[#0F5A47] hover:underline shrink-0"
                  >
                    Explore &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Browse by Category */}
      <section id="categories" className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 font-display">
              Browse by category
            </h2>
            <p className="text-sm text-neutral-500 mt-1 max-w-lg">
              High-caliber gear, occasion wear, and utility tools ready for short-term rental nearby.
            </p>
          </div>
          <Link
            to="/browse"
            className="text-xs sm:text-sm font-semibold text-[#0F5A47] hover:text-[#0B4536] flex items-center gap-1 shrink-0"
          >
            <span>View all 8 categories</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/browse?category=${cat.id}`}
              className="group bg-white p-5 rounded-2xl border border-neutral-200/70 hover:border-[#0F5A47]/40 hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-800 flex items-center justify-center group-hover:bg-[#0F5A47] group-hover:text-white transition-colors">
                  {getCategoryIcon(cat.id)}
                </div>
                <span className="text-xs text-neutral-400 font-medium tabular-nums">
                  {cat.count}
                </span>
              </div>
              <div>
                <h3 className="text-base font-semibold text-neutral-900 group-hover:text-[#0F5A47] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. How ClosetLoop Works */}
      <section id="how-it-works" className="py-16 md:py-20 bg-white border-y border-neutral-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold text-[#0F5A47] tracking-wider uppercase">
              Simple 3-Step Flow
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 font-display mt-2">
              How ClosetLoop works
            </h2>
            <p className="text-sm text-neutral-500 mt-2">
              Borrowing from neighbors is as seamless as booking a ride, with zero friction and guaranteed deposits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="flex flex-col p-6 rounded-2xl bg-[#FBFBF9] border border-neutral-200/70">
              <div className="w-10 h-10 rounded-full bg-neutral-900 text-white font-bold text-sm flex items-center justify-center mb-5 font-display">
                01
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">1. Discover</h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Find something worth borrowing nearby. Filter by distance, price, category, and verified owner ratings.
              </p>
              <div className="mt-6 pt-4 border-t border-neutral-200/50 text-xs text-neutral-400">
                Avg. pickup radius: 1.8 km
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col p-6 rounded-2xl bg-[#FBFBF9] border border-neutral-200/70">
              <div className="w-10 h-10 rounded-full bg-[#0F5A47] text-white font-bold text-sm flex items-center justify-center mb-5 font-display">
                02
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">2. Reserve</h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Select your rental duration. Pay securely with refundable deposit protection and schedule in-person pickup or delivery.
              </p>
              <div className="mt-6 pt-4 border-t border-neutral-200/50 text-xs text-neutral-400">
                Escrow protected security
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col p-6 rounded-2xl bg-[#FBFBF9] border border-neutral-200/70">
              <div className="w-10 h-10 rounded-full bg-neutral-900 text-white font-bold text-sm flex items-center justify-center mb-5 font-display">
                03
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">3. Return</h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Give it back when you’re done. The lender inspects the item and your security deposit is released automatically.
              </p>
              <div className="mt-6 pt-4 border-t border-neutral-200/50 text-xs text-neutral-400">
                100% deposit return rate
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Popular Near You */}
      <section className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 font-display">
              Popular near you
            </h2>
            <p className="text-sm text-neutral-500 mt-1">
              Top-rated listings borrowed frequently in your neighborhood this week.
            </p>
          </div>
          <Link
            to="/browse"
            className="text-xs sm:text-sm font-semibold text-[#0F5A47] hover:text-[#0B4536] flex items-center gap-1"
          >
            <span>Explore all listings</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularListings.map((item) => (
            <ProductCard key={item.id} listing={item} />
          ))}
        </div>
      </section>

      {/* 5. Why ClosetLoop? */}
      <section className="py-16 md:py-20 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-semibold text-emerald-400 tracking-wider uppercase">
              The Purpose
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-display mt-2 text-balance">
              Why buy something you only need for 24 hours?
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 mt-3 leading-relaxed">
              We accumulate thousands worth of occasional clothing, camera equipment, and tools that sit unused 98% of the year. ClosetLoop turns neighborhood closets into shared resources.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="border-t border-neutral-800 pt-6">
              <div className="text-2xl font-bold text-white mb-2 font-display">Save 85%+</div>
              <h3 className="text-sm font-semibold text-emerald-400 mb-1">Save Money</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Borrow a ₹15,000 blazer for ₹250. Rent a ₹1.5L camera kit for ₹900. Spend on experiences, not storage.
              </p>
            </div>

            <div className="border-t border-neutral-800 pt-6">
              <div className="text-2xl font-bold text-white mb-2 font-display">-120 kg CO₂</div>
              <h3 className="text-sm font-semibold text-emerald-400 mb-1">Cut Waste</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Every borrowed outfit or power tool prevents unnecessary factory production, retail shipping, and landfill discard.
              </p>
            </div>

            <div className="border-t border-neutral-800 pt-6">
              <div className="text-2xl font-bold text-white mb-2 font-display">₹12,400/mo</div>
              <h3 className="text-sm font-semibold text-emerald-400 mb-1">Earn from Idle Items</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Turn quality items sitting idle in your wardrobe or drawer into reliable passive income for your household.
              </p>
            </div>

            <div className="border-t border-neutral-800 pt-6">
              <div className="text-2xl font-bold text-white mb-2 font-display">100% Verified</div>
              <h3 className="text-sm font-semibold text-emerald-400 mb-1">Verified Community</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Connect with respectful, vetted neighbors. Build genuine local trust and reciprocity right where you live.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Curated Editorial Spotlight */}
      <section className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 font-display">
              Curated Wardrobe & Gear
            </h2>
            <p className="text-sm text-neutral-500 mt-1">
              Top-tier picks for weddings, photo shoots, and weekend getaways.
            </p>
          </div>
          <Link
            to="/browse?category=Fashion"
            className="text-xs sm:text-sm font-semibold text-[#0F5A47] hover:text-[#0B4536] flex items-center gap-1"
          >
            <span>Explore fashion & events</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredListings.map((item) => (
            <ProductCard key={item.id} listing={item} />
          ))}
        </div>
      </section>

      {/* 7. Bottom CTA */}
      <section className="pb-16 pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F5A47] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-display leading-tight mb-3">
              Why buy it for one day?
            </h2>
            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
              Join thousands of neighbors borrowing what they need and earning from what they own. No clutter, no regret.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link
              to="/browse"
              className="px-6 py-3.5 text-xs sm:text-sm font-semibold bg-white text-neutral-900 hover:bg-neutral-100 rounded-xl transition-colors text-center shadow-sm"
            >
              Start exploring
            </Link>
            <Link
              to="/list-item"
              className="px-6 py-3.5 text-xs sm:text-sm font-semibold bg-emerald-950/40 text-white hover:bg-emerald-950/60 border border-white/20 rounded-xl transition-colors text-center"
            >
              List an item
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
