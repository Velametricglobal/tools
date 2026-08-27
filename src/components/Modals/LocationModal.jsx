import React, { useState } from 'react';
import { MapPin, X, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LocationModal = () => {
  const { isLocationModalOpen, setIsLocationModalOpen, location, setLocation, showToast } = useApp();
  const [pincodeInput, setPincodeInput] = useState(location.pincode);

  if (!isLocationModalOpen) return null;

  const handleSaveLocation = (e) => {
    e.preventDefault();
    if (pincodeInput.length === 6) {
      setLocation({
        pincode: pincodeInput,
        city: pincodeInput.startsWith('7') ? 'Kolkata' : pincodeInput.startsWith('1') ? 'New Delhi' : 'Mumbai',
        state: pincodeInput.startsWith('7') ? 'West Bengal' : pincodeInput.startsWith('1') ? 'Delhi' : 'Maharashtra'
      });
      showToast(`Pincode updated to ${pincodeInput}`);
      setIsLocationModalOpen(false);
    } else {
      showToast('Please enter a valid 6-digit Indian pincode', 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 relative space-y-4">
        
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#339a99]" />
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              Change Delivery Location
            </h3>
          </div>
          <button
            onClick={() => setIsLocationModalOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-full"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSaveLocation} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Enter 6-Digit Pincode:</label>
            <input
              type="text"
              value={pincodeInput}
              onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, '').slice(0, 6))}
              maxLength={6}
              required
              className="w-full text-sm font-bold bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 outline-none focus:border-[#339a99]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#339a99] hover:bg-teal-700 text-white font-extrabold text-xs py-3 rounded-xl shadow-md transition-colors"
          >
            Update Delivery Location
          </button>
        </form>

      </div>
    </div>
  );
};
