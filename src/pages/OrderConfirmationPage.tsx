import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  ArrowRight, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  MessageSquare, 
  Printer,
  Compass
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { orders } = useApp();

  const order = orders.find((o) => o.orderId === orderId) || orders[0];

  if (!order) {
    return (
      <div className="max-w-xl mx-auto py-24 px-4 text-center">
        <h2 className="text-xl font-bold text-neutral-900 mb-2">Order not found</h2>
        <Link to="/browse" className="text-xs font-semibold text-[#0F5A47]">
          Browse items &rarr;
        </Link>
      </div>
    );
  }

  const primaryItem = order.items[0];

  return (
    <div className="min-h-screen py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Celebration Header */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-[#0F5A47] flex items-center justify-center mx-auto mb-4 border border-emerald-100 shadow-xs">
          <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
        </div>
        <span className="text-xs font-bold text-[#0F5A47] uppercase tracking-wider">
          Reservation #{order.orderId}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 font-display mt-1">
          You&rsquo;re all set! 🎉
        </h1>
        <p className="text-sm text-neutral-600 mt-2 max-w-md mx-auto leading-relaxed">
          Your <strong className="text-neutral-900 font-semibold">{primaryItem?.listing.title}</strong> is reserved and held in escrow.
        </p>
      </div>

      {/* Main Reservation Card */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-sm p-6 sm:p-8 space-y-8 mb-8">
        {/* Timing Window Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-[#FBFBF9] border border-neutral-200/70">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-[#0F5A47] shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                Pickup Scheduled
              </span>
              <span className="text-sm font-bold text-neutral-900">
                {order.pickupTime}
              </span>
              <span className="text-xs text-neutral-500 block">
                {primaryItem ? primaryItem.startDate : 'Tomorrow'}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 sm:border-l sm:border-neutral-200/70 sm:pl-4">
            <div className="w-9 h-9 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-700 shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                Scheduled Return
              </span>
              <span className="text-sm font-bold text-neutral-900">
                {order.returnTime}
              </span>
              <span className="text-xs text-neutral-500 block">
                {primaryItem ? primaryItem.endDate : 'Final rental day'}
              </span>
            </div>
          </div>
        </div>

        {/* Reserved Items */}
        <div>
          <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4">
            Reserved Items
          </h3>
          <div className="space-y-4">
            {order.items.map((it, idx) => (
              <div key={idx} className="flex gap-4 items-center">
                <div className="w-20 h-16 rounded-xl overflow-hidden bg-neutral-100 shrink-0">
                  <img
                    src={it.listing.images[0]}
                    alt={it.listing.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-neutral-900 truncate">{it.listing.title}</h4>
                  <p className="text-xs text-neutral-500">
                    {it.days} {it.days === 1 ? 'day rental' : 'days rental'} · {it.listing.location}
                  </p>
                  <p className="text-xs text-neutral-700 font-medium">
                    Owner: {it.listing.owner.name} ({it.listing.owner.responseTime})
                  </p>
                </div>
                <div className="text-right text-xs">
                  <span className="font-bold text-neutral-900 block tabular-nums">
                    ₹{it.rentalCost}
                  </span>
                  <span className="text-[11px] text-emerald-700">
                    +₹{it.deposit} deposit
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Handover & Location */}
        <div className="pt-6 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div>
            <h4 className="font-bold text-neutral-900 mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#0F5A47]" />
              <span>Handover Coordinates</span>
            </h4>
            <p className="text-neutral-600 leading-relaxed">
              {order.deliveryMethod === 'pickup' ? (
                <>
                  <strong className="text-neutral-800">Self Pickup:</strong> {primaryItem?.listing.owner.neighborhood || 'Indiranagar, Bengaluru'}
                  <br />
                  Exact apartment number and intercom unlocked in active order view.
                </>
              ) : (
                <>
                  <strong className="text-neutral-800">Doorstep Delivery:</strong> {order.address?.houseFlat}, {order.address?.street}, {order.address?.city} ({order.address?.pincode})
                </>
              )}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-neutral-900 mb-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#0F5A47]" />
              <span>Escrow Security Deposit</span>
            </h4>
            <p className="text-neutral-600 leading-relaxed">
              ₹{order.securityDeposit} safely locked in escrow with payment ID <code className="text-neutral-700 font-mono text-[11px]">{order.paymentId}</code>. Released immediately when returned in original condition.
            </p>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="pt-6 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="text-neutral-500">
            Payment method: <span className="font-semibold text-neutral-800 uppercase">{order.paymentMethod}</span> · Status:{' '}
            <span className="font-bold text-[#0F5A47]">Confirmed (Reserved)</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-neutral-400 mr-2">Total Paid:</span>
            <span className="text-xl font-bold text-neutral-900 tabular-nums">
              ₹{order.totalPaid}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to="/orders"
          className="w-full sm:w-auto px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-[#0F5A47] hover:bg-[#0B4536] rounded-xl transition-colors text-center shadow-xs flex items-center justify-center gap-2"
        >
          <span>View all orders</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          to="/browse"
          className="w-full sm:w-auto px-6 py-3.5 text-xs sm:text-sm font-semibold text-neutral-700 bg-white border border-neutral-300 hover:bg-neutral-50 rounded-xl transition-colors text-center flex items-center justify-center gap-2"
        >
          <Compass className="w-4 h-4" />
          <span>Continue browsing</span>
        </Link>
      </div>
    </div>
  );
};
