import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  ShieldCheck, 
  MapPin, 
  Star, 
  Calendar, 
  Clock, 
  CreditCard, 
  Edit3, 
  Save, 
  ShoppingBag, 
  Heart, 
  Check, 
  Coins
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProfilePage: React.FC = () => {
  const { user, updateUserProfile, orders, wishlist } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [location, setLocation] = useState(user.location);
  const [bio, setBio] = useState(user.bio);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      email,
      phone,
      location,
      bio,
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Profile Card Header */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-10 mb-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-sm bg-neutral-100 shrink-0">
                <img
                  src={user.avatar}
                  alt={user.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              {user.verified && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#0F5A47] text-white flex items-center justify-center border-2 border-white">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-neutral-900 font-display">
                  {user.name}
                </h1>
                <span className="text-[11px] font-semibold text-[#0F5A47] bg-emerald-50 px-2 py-0.5 rounded-md">
                  {user.idVerificationStatus}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-neutral-500 mt-1 flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{user.location}</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-0.5 text-neutral-800 font-medium">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{user.rating}</span>
                  <span className="text-neutral-400 font-normal">({user.reviewsCount} reviews)</span>
                </span>
                <span aria-hidden="true">·</span>
                <span>Member since {user.memberSince}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Cancel Editing' : 'Edit Profile'}</span>
          </button>
        </div>

        {/* Bio */}
        {!isEditing && (
          <p className="mt-6 pt-6 border-t border-neutral-100 text-xs text-neutral-600 leading-relaxed max-w-2xl">
            {user.bio}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form / Info */}
        <div className="lg:col-span-7 space-y-6">
          {/* Edit Form */}
          {isEditing ? (
            <form
              onSubmit={handleSaveProfile}
              className="bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-8 space-y-4 text-xs"
            >
              <h3 className="text-base font-bold text-neutral-900 mb-2">Edit Account Information</h3>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Neighborhood / City</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Bio</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#0F5A47] rounded-xl flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save changes</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-8 space-y-6">
              <h3 className="text-base font-bold text-neutral-900">Personal Information</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-neutral-400 block mb-0.5">Email</span>
                  <span className="font-semibold text-neutral-800">{user.email}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block mb-0.5">Phone</span>
                  <span className="font-semibold text-neutral-800">{user.phone}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block mb-0.5">Neighborhood</span>
                  <span className="font-semibold text-neutral-800">{user.location}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block mb-0.5">Aadhaar / Gov ID</span>
                  <span className="font-semibold text-emerald-800 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Trust & Community Pledge */}
          <div className="bg-[#0F5A47]/5 rounded-3xl border border-[#0F5A47]/20 p-6 flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-[#0F5A47] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-[#0F5A47]">ClosetLoop Trust Score: 98/100</h4>
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                You have 0 deposit disputes and 100% on-time return rate. Top 5% lender and borrower in Indiranagar.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Quick Shortcuts & Activity */}
        <div className="lg:col-span-5 space-y-4">
          <Link
            to="/orders"
            className="bg-white p-5 rounded-2xl border border-neutral-200/80 hover:border-[#0F5A47]/40 flex items-center justify-between transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-700">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-neutral-900">My Borrowed Orders</h4>
                <p className="text-xs text-neutral-500">{orders.length} total reservations</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-[#0F5A47]">&rarr;</span>
          </Link>

          <Link
            to="/my-listings"
            className="bg-white p-5 rounded-2xl border border-neutral-200/80 hover:border-[#0F5A47]/40 flex items-center justify-between transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-700">
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-neutral-900">My Lending Closet</h4>
                <p className="text-xs text-neutral-500">Manage listings & earnings</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-[#0F5A47]">&rarr;</span>
          </Link>

          <Link
            to="/wishlist"
            className="bg-white p-5 rounded-2xl border border-neutral-200/80 hover:border-[#0F5A47]/40 flex items-center justify-between transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-700">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-neutral-900">Saved Wishlist</h4>
                <p className="text-xs text-neutral-500">{wishlist.length} saved items</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-[#0F5A47]">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
