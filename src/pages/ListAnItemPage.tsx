import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Upload, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Image as ImageIcon,
  Eye
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CategoryType, ItemCondition } from '../types';
import { ProductCard } from '../components/ProductCard';

export const ListAnItemPage: React.FC = () => {
  const { addListing, user, showToast } = useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState<number>(1);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CategoryType>('Fashion');
  const [subcategory, setSubcategory] = useState('Occasion Wear');
  const [description, setDescription] = useState('');

  // Photos
  const [images, setImages] = useState<string[]>([
    '/src/assets/images/hero_curated_collection_1790614305476.jpg'
  ]);
  const [customImageUrl, setCustomImageUrl] = useState('');

  // Preset quick picks
  const samplePresets = [
    { label: 'Italian Blazer', url: '/src/assets/images/product_black_blazer_1790614320001.jpg' },
    { label: 'Sony Mirrorless', url: '/src/assets/images/product_sony_camera_1790614331789.jpg' },
    { label: 'Banarasi Saree', url: '/src/assets/images/product_silk_saree_1790614344335.jpg' },
    { label: 'Curated Studio Curation', url: '/src/assets/images/hero_curated_collection_1790614305476.jpg' },
  ];

  // Pricing
  const [dailyPrice, setDailyPrice] = useState<number>(250);
  const [securityDeposit, setSecurityDeposit] = useState<number>(1500);

  // Availability & Location
  const [location, setLocation] = useState('Indiranagar, Bengaluru');
  const [pickupAvailable, setPickupAvailable] = useState(true);
  const [deliveryAvailable, setDeliveryAvailable] = useState(true);
  const [deliveryFee, setDeliveryFee] = useState<number>(50);

  // Rules & Condition
  const [condition, setCondition] = useState<ItemCondition>('Like New');
  const [rules, setRules] = useState<string>('Strictly dry-clean handled by lender.\nReturn in original garment bag.\nNo smoking while using item.');
  const [included, setIncluded] = useState<string>('Protective dust bag\nWooden suit hanger\nCare instructions card');
  const [careInstructions, setCareInstructions] = useState('Keep away from direct heat. Hang immediately on arrival.');

  const handleAddImageUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (customImageUrl.trim()) {
      setImages((prev) => [...prev, customImageUrl.trim()]);
      setCustomImageUrl('');
    }
  };

  const handlePublish = () => {
    if (!title.trim() || !description.trim()) {
      showToast('Missing details', 'Please complete the title and description before publishing.', 'warning');
      return;
    }

    const rulesArray = rules.split('\n').filter((r) => r.trim().length > 0);
    const includedArray = included.split('\n').filter((i) => i.trim().length > 0);

    const newListing = addListing({
      title: title.trim(),
      category,
      subcategory,
      description: description.trim(),
      dailyPrice,
      securityDeposit,
      images,
      distanceKm: 1.2,
      location,
      condition,
      pickupAvailable,
      deliveryAvailable,
      deliveryFee: deliveryAvailable ? deliveryFee : 0,
      rules: rulesArray,
      included: includedArray,
      careInstructions: careInstructions.trim(),
      isAvailable: true,
      featured: false,
      popular: false,
    });

    navigate('/my-listings');
  };

  // Preview dummy listing for Card preview
  const previewListing = {
    id: 'preview-temp',
    title: title || 'Italian Wool Tailored Blazer',
    category,
    subcategory,
    description: description || 'High-end wardrobe piece available for short-term borrowing.',
    dailyPrice,
    securityDeposit,
    images: images.length > 0 ? images : ['/src/assets/images/product_black_blazer_1790614320001.jpg'],
    rating: 5.0,
    reviewCount: 0,
    distanceKm: 1.2,
    location,
    condition,
    pickupAvailable,
    deliveryAvailable,
    deliveryFee,
    owner: {
      id: 'usr-me',
      name: user.name,
      avatar: user.avatar,
      rating: 5.0,
      reviewsCount: 18,
      verified: true,
      memberSince: 'Today',
      responseTime: '< 15 mins',
      neighborhood: location,
    },
    rules: rules.split('\n').filter(Boolean),
    included: included.split('\n').filter(Boolean),
    isAvailable: true,
    createdAt: 'Today',
  };

  return (
    <div className="min-h-screen py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 text-center max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F5A47] uppercase tracking-wider mb-1">
          <Plus className="w-3.5 h-3.5" />
          <span>Lender Studio</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 font-display">
          List an Item to Lend
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 mt-1">
          Turn items you rarely use into monthly passive income while helping neighbors.
        </p>

        {/* Stepper Indicator */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {[1, 2, 3, 4, 5, 6, 7].map((s) => (
            <div
              key={s}
              onClick={() => s <= step && setStep(s)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                step === s
                  ? 'w-8 bg-[#0F5A47]'
                  : step > s
                  ? 'w-4 bg-emerald-700'
                  : 'w-4 bg-neutral-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Multi-Step Box */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-sm p-6 sm:p-10">
        {/* STEP 1: Basic Information */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">
                Step 1 of 7
              </span>
              <h2 className="text-xl font-bold text-neutral-900 font-display mt-0.5">
                What item are you offering to lend?
              </h2>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-neutral-800 mb-1.5">
                  Item Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Italian Wool Classic Black Blazer (Size 40/M)"
                  className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#0F5A47] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-neutral-800 mb-1.5">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CategoryType)}
                    className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:bg-white focus:border-[#0F5A47] outline-none"
                  >
                    {['Fashion', 'Accessories', 'Electronics', 'Books', 'Sports', 'Tools', 'Travel', 'Events'].map(
                      (cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-neutral-800 mb-1.5">
                    Subcategory / Style
                  </label>
                  <input
                    type="text"
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                    placeholder="e.g. Formal Wear, Cameras, Outdoor"
                    className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:bg-white focus:border-[#0F5A47] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-neutral-800 mb-1.5">
                  Detailed Description
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe material, fit, accessories included, original purchase price, and why it's great..."
                  className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:bg-white focus:border-[#0F5A47] outline-none leading-relaxed"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Photos */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">
                Step 2 of 7
              </span>
              <h2 className="text-xl font-bold text-neutral-900 font-display mt-0.5">
                Add high-quality photos
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                Natural studio light helps items rent 3× faster.
              </p>
            </div>

            {/* Quick Presets for Demo */}
            <div>
              <label className="block text-xs font-semibold text-neutral-800 mb-2">
                Quick Sample Photos:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {samplePresets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setImages([preset.url])}
                    className="p-2 border border-neutral-200 rounded-xl hover:border-[#0F5A47] text-left text-xs flex items-center gap-2"
                  >
                    <img
                      src={preset.url}
                      alt={preset.label}
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                    <span className="truncate font-medium">{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Images Gallery */}
            <div>
              <label className="block text-xs font-semibold text-neutral-800 mb-2">
                Selected Images ({images.length})
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-200 group"
                  >
                    <img src={img} alt="Upload preview" className="w-full h-full object-cover" />
                    {images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setImages(images.filter((_, i) => i !== idx))}
                        className="absolute top-2 right-2 p-1 bg-black/60 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Add Custom Image URL */}
            <form onSubmit={handleAddImageUrl} className="flex gap-2 text-xs">
              <input
                type="url"
                value={customImageUrl}
                onChange={(e) => setCustomImageUrl(e.target.value)}
                placeholder="Or paste an image URL (https://...)"
                className="flex-1 p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-[#0F5A47]"
              />
              <button
                type="submit"
                className="px-4 py-2.5 font-semibold text-white bg-neutral-900 rounded-xl"
              >
                Add URL
              </button>
            </form>
          </div>
        )}

        {/* STEP 3: Pricing */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">
                Step 3 of 7
              </span>
              <h2 className="text-xl font-bold text-neutral-900 font-display mt-0.5">
                Set fair daily rental price & deposit
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                Rentals typically price at 2–5% of the item’s retail value per day.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
                <span className="block font-bold text-sm text-neutral-900">
                  Daily Rental Fee (₹)
                </span>
                <p className="text-[11px] text-neutral-500">
                  What borrowers pay for each 24 hours of usage.
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-neutral-700">₹</span>
                  <input
                    type="number"
                    min="20"
                    step="10"
                    value={dailyPrice}
                    onChange={(e) => setDailyPrice(Number(e.target.value))}
                    className="w-full p-2.5 bg-white border border-neutral-200 rounded-xl text-lg font-bold text-neutral-900"
                  />
                  <span className="text-xs text-neutral-500">/ day</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
                <span className="block font-bold text-sm text-neutral-900">
                  Refundable Security Deposit (₹)
                </span>
                <p className="text-[11px] text-neutral-500">
                  Escrowed until safe return. Protects against damage or loss.
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-neutral-700">₹</span>
                  <input
                    type="number"
                    min="100"
                    step="100"
                    value={securityDeposit}
                    onChange={(e) => setSecurityDeposit(Number(e.target.value))}
                    className="w-full p-2.5 bg-white border border-neutral-200 rounded-xl text-lg font-bold text-neutral-900"
                  />
                </div>
              </div>
            </div>

            {/* Estimated Earnings Note */}
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-center justify-between text-xs text-emerald-900">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#0F5A47]" />
                <span>
                  Lending 6 days a month could earn you{' '}
                  <strong className="font-bold">₹{dailyPrice * 6}</strong>.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Availability */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">
                Step 4 of 7
              </span>
              <h2 className="text-xl font-bold text-neutral-900 font-display mt-0.5">
                Availability & Rental Windows
              </h2>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-neutral-900">Instant Borrowing Active</h3>
                  <p className="text-neutral-500 text-[11px]">
                    Borrowers can select any dates starting tomorrow onwards.
                  </p>
                </div>
                <div className="w-10 h-6 rounded-full bg-[#0F5A47] flex items-center p-1 cursor-pointer">
                  <div className="w-4 h-4 rounded-full bg-white ml-auto" />
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-200 flex items-center justify-between">
                <span>Minimum rental duration:</span>
                <span className="font-bold text-neutral-800">1 day</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Maximum rental duration:</span>
                <span className="font-bold text-neutral-800">14 days</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Location & Handover */}
        {step === 5 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">
                Step 5 of 7
              </span>
              <h2 className="text-xl font-bold text-neutral-900 font-display mt-0.5">
                Pickup Location & Handover
              </h2>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-neutral-800 mb-1.5">
                  Neighborhood / Area
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Indiranagar 12th Main, Bengaluru"
                  className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl"
                />
              </div>

              <div className="p-4 rounded-2xl border border-neutral-200 space-y-3">
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <span className="font-bold text-neutral-900 block">Offer Doorstep Delivery?</span>
                    <span className="text-neutral-500 text-[11px]">
                      You or a local courier can drop off the item for a small fee.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={deliveryAvailable}
                    onChange={(e) => setDeliveryAvailable(e.target.checked)}
                    className="w-4 h-4 accent-[#0F5A47]"
                  />
                </label>

                {deliveryAvailable && (
                  <div className="pt-3 border-t border-neutral-100 flex items-center gap-3">
                    <span className="text-neutral-600">Delivery Fee to charge borrower:</span>
                    <div className="flex items-center gap-1 font-bold">
                      <span>₹</span>
                      <input
                        type="number"
                        value={deliveryFee}
                        onChange={(e) => setDeliveryFee(Number(e.target.value))}
                        className="w-20 p-1.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-bold"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: Condition & Rental Rules */}
        {step === 6 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">
                Step 6 of 7
              </span>
              <h2 className="text-xl font-bold text-neutral-900 font-display mt-0.5">
                Condition, Included Items & Rules
              </h2>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-neutral-800 mb-1.5">
                  Item Condition
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['Brand New', 'Like New', 'Gently Used', 'Good'] as ItemCondition[]).map((cond) => (
                    <button
                      key={cond}
                      type="button"
                      onClick={() => setCondition(cond)}
                      className={`p-3 rounded-xl border text-center font-medium ${
                        condition === cond
                          ? 'border-[#0F5A47] bg-emerald-50 text-[#0F5A47]'
                          : 'border-neutral-200 text-neutral-600'
                      }`}
                    >
                      {cond}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-neutral-800 mb-1.5">
                  What&rsquo;s included (one per line)
                </label>
                <textarea
                  rows={3}
                  value={included}
                  onChange={(e) => setIncluded(e.target.value)}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-800 mb-1.5">
                  Rental rules for borrower (one per line)
                </label>
                <textarea
                  rows={3}
                  value={rules}
                  onChange={(e) => setRules(e.target.value)}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 7: Live Marketplace Preview & Publish */}
        {step === 7 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">
                Step 7 of 7
              </span>
              <h2 className="text-xl font-bold text-neutral-900 font-display mt-0.5">
                Listing Preview
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                Here is exactly how your item appears in the ClosetLoop marketplace feed.
              </p>
            </div>

            <div className="max-w-sm mx-auto">
              <ProductCard listing={previewListing as any} />
            </div>

            <div className="p-4 rounded-2xl bg-[#FBFBF9] border border-neutral-200 text-xs text-neutral-600 space-y-1">
              <div className="font-semibold text-neutral-900">Platform Lending Guarantee</div>
              <p>
                All rentals on ClosetLoop are backed by identity verification and refundable deposit escrow.
              </p>
            </div>
          </div>
        )}

        {/* Stepper Navigation Buttons */}
        <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="px-4 py-2.5 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 7 ? (
            <button
              type="button"
              onClick={() => {
                if (step === 1 && !title.trim()) {
                  showToast('Title required', 'Please enter a title for your item.', 'warning');
                  return;
                }
                setStep((s) => s + 1);
              }}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-[#0F5A47] hover:bg-[#0B4536] rounded-xl transition-colors flex items-center gap-1.5"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePublish}
              className="px-8 py-3 text-xs sm:text-sm font-semibold text-white bg-[#0F5A47] hover:bg-[#0B4536] rounded-xl transition-colors shadow-xs flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>Publish Listing</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
