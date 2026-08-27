import React from 'react';
import { useRenova } from '../context/RenovaContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts } = useRenova();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`p-3.5 rounded-xl shadow-2xl border text-xs font-bold flex items-center gap-2.5 pointer-events-auto animate-in slide-in-from-bottom-3 duration-200 ${
            toast.type === 'error'
              ? 'bg-rose-900 text-white border-rose-700'
              : toast.type === 'info'
              ? 'bg-slate-900 text-white border-slate-700'
              : 'bg-[#113636] text-white border-teal-600'
          }`}
        >
          {toast.type === 'error' ? (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          ) : toast.type === 'info' ? (
            <Info className="w-4 h-4 text-cyan-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          <span className="flex-1">{toast.message}</span>
        </div>
      ))}
    </div>
  );
};
