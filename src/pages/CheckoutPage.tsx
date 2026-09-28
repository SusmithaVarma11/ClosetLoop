import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Store, 
  Truck, 
  CreditCard, 
  Smartphone, 
  Building2, 
  Wallet, 
  Lock, 
  CheckCircle2, 
  ArrowLeft,
  Sparkles,
  Loader2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CheckoutPage: React.FC = () => {
  const { cart, user, createOrder } = useApp();
  const navigate = useNavigate();

  // If cart is empty, redirect
  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-24 px-4 text-center">
        <h2 className="text-xl font-bold text-neutral-900 mb-2">No items to checkout</h2>
        <p className="text-xs text-neutral-500 mb-6">Your reservation cart is currently empty.</p>
        <Link
          to="/browse"
          className="inline-flex px-5 py-2.5 text-xs font-semibold text-white bg-[#0F5A47] rounded-xl"
        >
          Browse items
        </Link>
      </div>
    );
  }

  // Form State
  const [fullName, setFullName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('pickup');
  const [houseFlat, setHouseFlat] = useState('Flat 402, Green Glen Apts');
  const [street, setStreet] = useState('12th Main Road, HAL 2nd Stage');
  const [city, setCity] = useState('Bengaluru');
  const [state, setState] = useState('Karnataka');
  const [pincode, setPincode] = useState('560008');

  // Payment Options
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'wallet'>('upi');
  const [upiId, setUpiId] = useState('susmitha@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('•••');

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('Verifying reservation availability...');

  // Pricing calculations
  const subtotal = cart.reduce((acc, item) => acc + item.listing.dailyPrice * item.days, 0);
  const serviceFee = Math.round(subtotal * 0.1);
  const deliveryFee = deliveryMethod === 'delivery' ? 60 : 0;
  const securityDeposit = cart.reduce((acc, item) => acc + item.listing.securityDeposit, 0);
  const grandTotal = subtotal + serviceFee + deliveryFee + securityDeposit;

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Realistic multi-stage processing simulation
    setTimeout(() => {
      setProcessingStep('Authorizing security deposit escrow...');
    }, 700);

    setTimeout(() => {
      setProcessingStep('Finalizing neighborhood reservation...');
    }, 1400);

    setTimeout(() => {
      const order = createOrder({
        contact: { fullName, email, phone },
        deliveryMethod,
        address: deliveryMethod === 'delivery' ? { houseFlat, street, city, state, pincode } : undefined,
        paymentMethod,
      });

      setIsProcessing(false);
      navigate(`/order-confirmation/${order.orderId}`);
    }, 2100);
  };

  return (
    <div className="min-h-screen py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="pb-6 border-b border-neutral-200/80 mb-8 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0F5A47] uppercase tracking-wider mb-1">
            <Lock className="w-3.5 h-3.5" />
            <span>Secure Checkout</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 font-display">
            Confirm & Pay
          </h1>
        </div>

        <Link
          to="/cart"
          className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Edit Cart</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Multi-step checkout form */}
        <div className="lg:col-span-7 space-y-8">
          <form onSubmit={handlePaymentSubmit} className="space-y-8">
            {/* Step 1: Contact Details */}
            <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-neutral-100">
                <div className="w-7 h-7 rounded-full bg-neutral-900 text-white font-bold text-xs flex items-center justify-center font-display">
                  1
                </div>
                <h2 className="text-base font-bold text-neutral-900">Contact Information</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-neutral-700 mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:bg-white focus:border-[#0F5A47]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:bg-white focus:border-[#0F5A47]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Phone Number (for pickup SMS)</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:bg-white focus:border-[#0F5A47]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Handover & Delivery Details */}
            <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b border-neutral-100">
                <div className="w-7 h-7 rounded-full bg-neutral-900 text-white font-bold text-xs flex items-center justify-center font-display">
                  2
                </div>
                <h2 className="text-base font-bold text-neutral-900">Handover Method</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <label
                  onClick={() => setDeliveryMethod('pickup')}
                  className={`p-4 rounded-2xl border cursor-pointer flex flex-col justify-between transition-all ${
                    deliveryMethod === 'pickup'
                      ? 'border-[#0F5A47] bg-emerald-50/40 text-neutral-900 ring-1 ring-[#0F5A47]'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 font-bold text-sm">
                      <Store className="w-4 h-4 text-[#0F5A47]" />
                      <span>Self Pickup</span>
                    </div>
                    <span className="text-xs font-semibold text-[#0F5A47]">Free</span>
                  </div>
                  <p className="text-[11px] text-neutral-500 leading-relaxed">
                    Pickup directly from lender’s residence in Indiranagar / Koramangala. Coordinate via chat.
                  </p>
                </label>

                <label
                  onClick={() => setDeliveryMethod('delivery')}
                  className={`p-4 rounded-2xl border cursor-pointer flex flex-col justify-between transition-all ${
                    deliveryMethod === 'delivery'
                      ? 'border-[#0F5A47] bg-emerald-50/40 text-neutral-900 ring-1 ring-[#0F5A47]'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 font-bold text-sm">
                      <Truck className="w-4 h-4 text-[#0F5A47]" />
                      <span>Doorstep Delivery</span>
                    </div>
                    <span className="text-xs font-semibold text-neutral-900">+₹60</span>
                  </div>
                  <p className="text-[11px] text-neutral-500 leading-relaxed">
                    Neighborhood courier delivers right to your door and picks up on the return date.
                  </p>
                </label>
              </div>

              {/* Delivery Address fields if Doorstep selected */}
              {deliveryMethod === 'delivery' && (
                <div className="pt-4 border-t border-neutral-100 space-y-3 text-xs animate-in fade-in">
                  <h3 className="font-semibold text-neutral-800">Your Delivery Address</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-neutral-600 mb-1">House / Flat / Building</label>
                      <input
                        type="text"
                        required
                        value={houseFlat}
                        onChange={(e) => setHouseFlat(e.target.value)}
                        className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-neutral-600 mb-1">Street / Area / Landmark</label>
                      <input
                        type="text"
                        required
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-600 mb-1">City</label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-600 mb-1">Pincode</label>
                      <input
                        type="text"
                        required
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Step 3: Payment Method */}
            <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-neutral-900 text-white font-bold text-xs flex items-center justify-center font-display">
                    3
                  </div>
                  <h2 className="text-base font-bold text-neutral-900">Payment Option</h2>
                </div>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Simulated Gateway
                </span>
              </div>

              {/* Payment Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { id: 'upi', label: 'UPI / QR', icon: Smartphone },
                  { id: 'card', label: 'Cards', icon: CreditCard },
                  { id: 'netbanking', label: 'Net Banking', icon: Building2 },
                  { id: 'wallet', label: 'Wallets', icon: Wallet },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPaymentMethod(item.id as any)}
                      className={`p-3 rounded-2xl border font-semibold flex flex-col items-center gap-1.5 transition-all ${
                        paymentMethod === item.id
                          ? 'border-[#0F5A47] bg-emerald-50/50 text-[#0F5A47] ring-1 ring-[#0F5A47]'
                          : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* UPI Form */}
              {paymentMethod === 'upi' && (
                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-neutral-800">Enter UPI ID / VPA</span>
                    <span className="text-[10px] text-neutral-400">GPay, PhonePe, Paytm, BHIM</span>
                  </div>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="username@bank"
                    className="w-full p-2.5 bg-white border border-neutral-200 rounded-xl font-mono text-xs outline-none focus:border-[#0F5A47]"
                  />
                  <p className="text-[11px] text-neutral-500">
                    A test payment prompt will be simulated automatically when you proceed.
                  </p>
                </div>
              )}

              {/* Card Form */}
              {paymentMethod === 'card' && (
                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-3 text-xs">
                  <div>
                    <label className="block text-neutral-600 mb-1 font-semibold">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full p-2.5 bg-white border border-neutral-200 rounded-xl font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-neutral-600 mb-1">Valid Thru</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full p-2.5 bg-white border border-neutral-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-600 mb-1">CVV / CVC</label>
                      <input
                        type="password"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full p-2.5 bg-white border border-neutral-200 rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Netbanking Form */}
              {paymentMethod === 'netbanking' && (
                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 text-xs space-y-2">
                  <span className="font-semibold text-neutral-800 block">Select Popular Bank</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank'].map((b, i) => (
                      <div
                        key={b}
                        className={`p-2.5 rounded-xl border text-center font-medium cursor-pointer ${
                          i === 0 ? 'bg-[#0F5A47] text-white' : 'bg-white text-neutral-700'
                        }`}
                      >
                        {b}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Wallet Form */}
              {paymentMethod === 'wallet' && (
                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 text-xs space-y-2">
                  <span className="font-semibold text-neutral-800 block">Select Digital Wallet</span>
                  <div className="grid grid-cols-2 gap-2">
                    {['Paytm Wallet (₹2,500 bal)', 'Amazon Pay'].map((w, i) => (
                      <div
                        key={w}
                        className={`p-2.5 rounded-xl border font-medium cursor-pointer ${
                          i === 0 ? 'bg-emerald-50 border-[#0F5A47] text-[#0F5A47]' : 'bg-white text-neutral-700'
                        }`}
                      >
                        {w}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 text-sm font-semibold text-white bg-[#0F5A47] hover:bg-[#0B4536] disabled:opacity-75 rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{processingStep}</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Pay ₹{grandTotal} & Confirm Reservation</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500">
                <ShieldCheck className="w-4 h-4 text-[#0F5A47]" />
                <span>Simulated transaction. No real funds will be charged.</span>
              </div>
            </div>
          </form>
        </div>

        {/* Right: Reservation Breakdown Sidebar */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
          <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm p-6 sm:p-8 space-y-6">
            <h3 className="text-base font-bold text-neutral-900 pb-3 border-b border-neutral-100">
              Reservation Summary ({cart.length} {cart.length === 1 ? 'item' : 'items'})
            </h3>

            {/* Item list */}
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.listingId} className="flex gap-3 text-xs">
                  <div className="w-16 h-12 rounded-xl overflow-hidden bg-neutral-100 shrink-0">
                    <img
                      src={item.listing.images[0]}
                      alt={item.listing.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-neutral-900 truncate">{item.listing.title}</h4>
                    <p className="text-[11px] text-neutral-500">
                      {item.startDate} &rarr; {item.endDate} ({item.days} {item.days === 1 ? 'day' : 'days'})
                    </p>
                    <p className="text-[11px] font-semibold text-neutral-800">
                      ₹{item.listing.dailyPrice * item.days} + ₹{item.listing.securityDeposit} deposit
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="pt-4 border-t border-neutral-100 space-y-2.5 text-xs text-neutral-600">
              <div className="flex justify-between items-center">
                <span>Rental duration total</span>
                <span className="font-semibold text-neutral-900 tabular-nums">₹{subtotal}</span>
              </div>

              <div className="flex justify-between items-center">
                <span>Service & insurance fee (10%)</span>
                <span className="font-semibold text-neutral-900 tabular-nums">₹{serviceFee}</span>
              </div>

              <div className="flex justify-between items-center">
                <span>Handover ({deliveryMethod === 'delivery' ? 'Doorstep courier' : 'Self pickup'})</span>
                <span className="font-semibold text-neutral-900 tabular-nums">
                  {deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}
                </span>
              </div>

              <div className="flex justify-between items-center text-emerald-800 font-medium pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Refundable deposit (escrow)</span>
                </span>
                <span className="tabular-nums">₹{securityDeposit}</span>
              </div>

              <div className="pt-4 border-t border-neutral-200 flex justify-between items-baseline">
                <div>
                  <span className="text-base font-bold text-neutral-900 block">Total Due</span>
                  <span className="text-[11px] text-neutral-400">
                    ₹{securityDeposit} returned automatically upon item return
                  </span>
                </div>
                <span className="text-2xl font-bold text-neutral-900 tabular-nums">
                  ₹{grandTotal}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
