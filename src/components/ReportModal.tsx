import React, { useState } from 'react';
import { X, ShieldAlert, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetTitle: string;
  targetType: 'listing' | 'user';
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  targetTitle,
  targetType,
}) => {
  const { showToast } = useApp();
  const [reason, setReason] = useState('condition');
  const [details, setDetails] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      showToast('Report submitted', 'Our Community Safety team is reviewing this item.', 'info');
      setIsSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-6 border border-neutral-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center flex flex-col items-center">
            <CheckCircle className="w-12 h-12 text-[#0F5A47] mb-3" />
            <h3 className="text-lg font-semibold text-neutral-900">Thank you for reporting</h3>
            <p className="text-xs text-neutral-600 mt-1 max-w-xs">
              We investigate every flag within 4 hours to keep the neighborhood sharing pool safe.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-3 text-rose-600">
              <ShieldAlert className="w-5 h-5" />
              <h3 className="font-semibold text-neutral-900 text-base">
                Report this {targetType}
              </h3>
            </div>

            <p className="text-xs text-neutral-600 mb-4">
              Flagging: <span className="font-medium text-neutral-900">{targetTitle}</span>
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Reason for flag
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full text-xs p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-[#0F5A47]"
                >
                  <option value="condition">Misrepresented condition or photos</option>
                  <option value="pricing">Suspicious pricing or fraudulent deposit</option>
                  <option value="prohibited">Prohibited or counterfeit item</option>
                  <option value="unresponsive">Unresponsive lender</option>
                  <option value="other">Other safety violation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Additional Details
                </label>
                <textarea
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Describe what went wrong or why this violates guidelines..."
                  className="w-full text-xs p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-[#0F5A47] placeholder:text-neutral-400"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
