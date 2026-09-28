import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-white/95 backdrop-blur-md border border-neutral-200/80 shadow-lg rounded-xl p-4 flex items-start gap-3 transition-all duration-200 animate-in slide-in-from-bottom-3"
        >
          <div className="shrink-0 mt-0.5">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#0F5A47]" />}
            {toast.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-600" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-neutral-700" />}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-neutral-900 leading-tight">{toast.title}</h4>
            {toast.description && (
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed">{toast.description}</p>
            )}
          </div>
          <button
            onClick={() => dismissToast(toast.id)}
            className="text-neutral-400 hover:text-neutral-700 p-1 -mr-1 -mt-1 transition-colors"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
