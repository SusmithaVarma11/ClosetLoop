import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Sparkles, HeartHandshake, Leaf } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-300 pt-16 pb-24 md:pb-16 mt-20 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Core Mission Banner */}
        <div className="pb-12 border-b border-neutral-800 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center shrink-0 text-emerald-400">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-1">Sustainable Circularity</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                By borrowing instead of buying, you cut down manufacturing waste, packaging, and closet clutter.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center shrink-0 text-emerald-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-1">Deposit & Identity Protected</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Every member is verified. Security deposits remain safely escrowed until items are inspected and returned.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center shrink-0 text-emerald-400">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-1">Hyperlocal Neighborhoods</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Pickup directly from neighbors within 1-5 km or choose low-carbon neighborhood doorstep delivery.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation & Directory */}
        <div className="py-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <Link to="/" className="inline-flex items-center gap-1.5 text-xl font-bold tracking-tight text-white font-display mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
              <span>ClosetLoop</span>
            </Link>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed mb-4">
              Your neighborhood has everything you need. You just don’t own it yet. High-quality peer-to-peer wardrobe and gear borrowing.
            </p>
            <div className="text-xs text-neutral-500">
              Designed with care for mindful communities.
            </div>
          </div>

          <div>
            <h5 className="text-xs font-semibold text-white tracking-wider uppercase mb-3">Borrow</h5>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><Link to="/browse?category=Fashion" className="hover:text-white transition-colors">Fashion & Evening Wear</Link></li>
              <li><Link to="/browse?category=Electronics" className="hover:text-white transition-colors">Cameras & Audio</Link></li>
              <li><Link to="/browse?category=Accessories" className="hover:text-white transition-colors">Jewellery & Bags</Link></li>
              <li><Link to="/browse?category=Travel" className="hover:text-white transition-colors">Camping & Tents</Link></li>
              <li><Link to="/browse?category=Tools" className="hover:text-white transition-colors">Power Tools & DIY</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-semibold text-white tracking-wider uppercase mb-3">Lend</h5>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><Link to="/list-item" className="hover:text-white transition-colors">List an Item</Link></li>
              <li><Link to="/my-listings" className="hover:text-white transition-colors">Lender Dashboard</Link></li>
              <li><Link to="/trust-and-safety" className="hover:text-white transition-colors">Deposit Protection</Link></li>
              <li><Link to="/trust-and-safety" className="hover:text-white transition-colors">Host Guidelines</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-semibold text-white tracking-wider uppercase mb-3">Trust & Safety</h5>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><Link to="/trust-and-safety" className="hover:text-white transition-colors">Verification Process</Link></li>
              <li><Link to="/trust-and-safety" className="hover:text-white transition-colors">Resolution Center</Link></li>
              <li><Link to="/orders" className="hover:text-white transition-colors">Manage Reservations</Link></li>
              <li><Link to="/profile" className="hover:text-white transition-colors">Community Standards</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} ClosetLoop Technologies Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-neutral-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-neutral-400 cursor-pointer">Security Protocol</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
