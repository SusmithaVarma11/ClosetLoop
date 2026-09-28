import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Check, 
  MessageSquare,
  AlertCircle,
  PackageCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OrderStatus } from '../types';

export const OrdersPage: React.FC = () => {
  const { orders, updateOrderStatus, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'active' | 'completed' | 'cancelled'>('upcoming');

  const filteredOrders = orders.filter((order) => {
    if (activeTab === 'upcoming') {
      return order.status === 'Reserved' || order.status === 'Ready for pickup';
    }
    if (activeTab === 'active') {
      return order.status === 'Picked up' || order.status === 'Active rental';
    }
    if (activeTab === 'completed') {
      return order.status === 'Returned' || order.status === 'Completed';
    }
    if (activeTab === 'cancelled') {
      return order.status === 'Cancelled';
    }
    return true;
  });

  return (
    <div className="min-h-screen py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="pb-8 border-b border-neutral-200/80 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0F5A47] uppercase tracking-wider mb-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Reservations</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 font-display">
            My Borrowed Orders
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Track pickup timelines, handover codes, and deposit releases.
          </p>
        </div>

        {/* Tab Controls (Functional Buttons) */}
        <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-xl">
          {[
            { id: 'upcoming', label: 'Upcoming' },
            { id: 'active', label: 'Active' },
            { id: 'completed', label: 'Completed' },
            { id: 'cancelled', label: 'Cancelled' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length > 0 ? (
        <div className="space-y-6">
          {filteredOrders.map((order) => {
            const firstItem = order.items[0];
            return (
              <div
                key={order.orderId}
                className="bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-8 space-y-6 shadow-xs"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-100 gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-neutral-900 font-mono">#{order.orderId}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-neutral-500">
                        Reserved on {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-[#0F5A47] bg-emerald-50 px-2.5 py-1 rounded-md">
                      {order.status}
                    </span>

                    {/* Status Simulation Action for Testing/Demonstration */}
                    {order.status === 'Reserved' && (
                      <button
                        onClick={() => updateOrderStatus(order.orderId, 'Picked up')}
                        className="px-3 py-1 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors"
                      >
                        Simulate Pickup &rarr;
                      </button>
                    )}

                    {order.status === 'Picked up' && (
                      <button
                        onClick={() => updateOrderStatus(order.orderId, 'Completed')}
                        className="px-3 py-1 text-xs font-semibold text-white bg-[#0F5A47] hover:bg-[#0B4536] rounded-lg transition-colors"
                      >
                        Simulate Return &rarr;
                      </button>
                    )}
                  </div>
                </div>

                {/* Items & Owner Details */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-7 space-y-4">
                    {order.items.map((it, idx) => (
                      <div key={idx} className="flex gap-4 items-center">
                        <Link
                          to={`/listing/${it.listing.id}`}
                          className="w-20 h-16 rounded-2xl overflow-hidden bg-neutral-100 shrink-0 block"
                        >
                          <img
                            src={it.listing.images[0]}
                            alt={it.listing.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <Link
                            to={`/listing/${it.listing.id}`}
                            className="text-sm font-bold text-neutral-900 hover:text-[#0F5A47] transition-colors truncate block"
                          >
                            {it.listing.title}
                          </Link>
                          <p className="text-xs text-neutral-500">
                            {it.startDate} &rarr; {it.endDate} ({it.days} {it.days === 1 ? 'day' : 'days'})
                          </p>
                          <p className="text-xs text-neutral-700 font-medium">
                            Lender: {it.listing.owner.name} ({it.listing.owner.neighborhood})
                          </p>
                        </div>
                      </div>
                    ))}

                    <div className="p-4 rounded-2xl bg-neutral-50 text-xs text-neutral-600 flex items-center justify-between">
                      <div>
                        <span>Handover: </span>
                        <strong className="text-neutral-900 capitalize font-medium">{order.deliveryMethod}</strong>
                        {order.deliveryMethod === 'pickup' && ` · ${firstItem?.listing.owner.neighborhood}`}
                      </div>
                      <button
                        onClick={() =>
                          showToast('Chat active', `Direct message thread open with ${firstItem?.listing.owner.name}.`, 'info')
                        }
                        className="text-[#0F5A47] font-semibold hover:underline flex items-center gap-1"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chat Owner</span>
                      </button>
                    </div>
                  </div>

                  {/* Rental Progress Timeline */}
                  <div className="lg:col-span-5 bg-[#FBFBF9] p-5 rounded-2xl border border-neutral-200/70">
                    <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#0F5A47]" />
                      <span>Rental Progress Timeline</span>
                    </h4>

                    <div className="space-y-4">
                      {order.timeline.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-3 relative">
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs mt-0.5 ${
                              step.completed
                                ? 'bg-[#0F5A47] text-white'
                                : step.current
                                ? 'bg-amber-400 text-white ring-4 ring-amber-100'
                                : 'bg-neutral-200 text-neutral-400'
                            }`}
                          >
                            {step.completed ? (
                              <Check className="w-3 h-3 stroke-[3]" />
                            ) : (
                              <span className="w-1.5 h-1.5 rounded-full bg-white" />
                            )}
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-neutral-900 block leading-tight">
                              {step.title}
                            </span>
                            <span className="text-[11px] text-neutral-400 block mt-0.5">{step.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 pt-4 border-t border-neutral-200/60 flex items-center justify-between text-xs">
                      <span className="text-neutral-500">Deposit in escrow:</span>
                      <span className="font-bold text-emerald-800 tabular-nums">
                        ₹{order.securityDeposit} (Locked)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-neutral-200/80 p-12 text-center max-w-md mx-auto my-12">
          <Clock className="w-12 h-12 stroke-1 text-neutral-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-neutral-900">No {activeTab} orders</h3>
          <p className="text-xs text-neutral-500 mt-1 mb-6">
            You don’t have any reservations under the &ldquo;{activeTab}&rdquo; filter.
          </p>
          <Link
            to="/browse"
            className="inline-flex px-5 py-2.5 text-xs font-semibold text-white bg-[#0F5A47] rounded-xl"
          >
            Find something to borrow
          </Link>
        </div>
      )}
    </div>
  );
};
