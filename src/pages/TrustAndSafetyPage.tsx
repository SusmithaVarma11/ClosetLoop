import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  UserCheck, 
  CheckCircle2, 
  FileText, 
  AlertTriangle, 
  HelpCircle,
  Flag,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ReportModal } from '../components/ReportModal';

export const TrustAndSafetyPage: React.FC = () => {
  const [reportModalOpen, setReportModalOpen] = useState(false);

  return (
    <div className="min-h-screen py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F5A47] uppercase tracking-wider mb-2">
          <ShieldCheck className="w-4 h-4" />
          <span>Trust & Safety Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 font-display">
          Borrowing with peace of mind.
        </h1>
        <p className="text-sm text-neutral-600 mt-3 leading-relaxed">
          ClosetLoop operates on peer respect reinforced by institutional-grade deposit escrows, government ID checks, and condition guarantees.
        </p>
      </div>

      {/* 4 Pillars of Trust */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-8 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#0F5A47] flex items-center justify-center">
            <UserCheck className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-neutral-900">1. Mandatory Identity Verification</h2>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Every lender and borrower connects a government ID (Aadhaar/Passport/Driving License) and phone number before placing or accepting reservations. There are no anonymous participants on ClosetLoop.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-8 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#0F5A47] flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-neutral-900">2. Refundable Security Deposit Escrow</h2>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Borrowers place a security deposit that stays in an escrow vault throughout the rental. It cannot be unilaterally seized by the lender—only released upon verified safe handover or mediated repair.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-8 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#0F5A47] flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-neutral-900">3. In-Person Handover Inspection</h2>
          <p className="text-xs text-neutral-600 leading-relaxed">
            During pickup, both parties inspect the item and confirm zippers, lenses, or accessories match the listing description. A 4-digit handover confirmation code activates the rental.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-8 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#0F5A47] flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-neutral-900">4. Community Standards & Rules</h2>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Every item features transparent care instructions, dry-cleaning policies, and designated usage limits. Borrowers treat neighbors’ belongings like their own.
          </p>
        </div>
      </div>

      {/* FAQ & Dispute Resolution */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-10 space-y-6 mb-16">
        <h2 className="text-xl font-bold text-neutral-900 font-display">
          Frequently Asked Safety Questions
        </h2>

        <div className="divide-y divide-neutral-100 text-xs">
          <div className="py-4 space-y-1.5">
            <h4 className="font-bold text-neutral-900 text-sm">
              What happens if an item gets accidentally stained or damaged?
            </h4>
            <p className="text-neutral-600 leading-relaxed">
              If minor wear occurs (e.g. food spill on a dress), the actual professional cleaning cost is deducted from the refundable security deposit, and the remainder is refunded to the borrower. For major damage, our Mediation Team reviews the condition log.
            </p>
          </div>

          <div className="py-4 space-y-1.5">
            <h4 className="font-bold text-neutral-900 text-sm">
              When is my security deposit released?
            </h4>
            <p className="text-neutral-600 leading-relaxed">
              Once you hand back the item and the owner confirms receipt, the escrow system automatically initiates the full deposit refund to your original payment method within 2 to 4 hours.
            </p>
          </div>

          <div className="py-4 space-y-1.5">
            <h4 className="font-bold text-neutral-900 text-sm">
              Can I report a suspicious user or misleading listing?
            </h4>
            <p className="text-neutral-600 leading-relaxed">
              Yes. Every product page has a report flag. We investigate flags within 4 hours and temporarily suspend accounts with multiple negative feedback reports.
            </p>
          </div>
        </div>
      </div>

      {/* Safety Pledge & Report CTA */}
      <div className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold font-display">Need help or want to report an issue?</h3>
          <p className="text-xs text-neutral-400 mt-1 max-w-md leading-relaxed">
            Our neighborhood trust & safety agents monitor all active reservations 7 days a week.
          </p>
        </div>

        <button
          onClick={() => setReportModalOpen(true)}
          className="px-5 py-2.5 text-xs font-semibold text-neutral-900 bg-white hover:bg-neutral-100 rounded-xl transition-colors whitespace-nowrap flex items-center gap-1.5"
        >
          <Flag className="w-4 h-4 text-rose-600" />
          <span>Report an issue</span>
        </button>
      </div>

      <ReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        targetTitle="General Safety Issue"
        targetType="user"
      />
    </div>
  );
};
