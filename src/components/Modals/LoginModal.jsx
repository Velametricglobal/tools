import React, { useState } from 'react';
import { User, X, Phone, ShieldCheck, Coins, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LoginModal = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, user, setUser, showToast } = useApp();
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [gstNo, setGstNo] = useState(user.gstNo || '');

  if (!isLoginModalOpen) return null;

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUser((prev) => ({
      ...prev,
      name,
      phone,
      gstNo
    }));
    showToast('Profile and GSTIN billing details updated successfully!');
    setIsLoginModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 relative space-y-4">
        
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#339a99]" />
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              Toolsvilla Account & Profile
            </h3>
          </div>
          <button
            onClick={() => setIsLoginModalOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-full"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-amber-500" />
              <div>
                <span className="font-bold text-amber-900 block">Rewards Coin Balance</span>
                <span className="text-amber-700">{user.coins} Toolsvilla Coins</span>
              </div>
            </div>
            <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-md">
              VIP MEMBER
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-700 font-semibold block mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 outline-none"
              />
            </div>

            <div>
              <label className="text-slate-700 font-semibold block mb-1">Mobile Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 outline-none"
              />
            </div>

            <div>
              <label className="text-slate-700 font-semibold block mb-1">
                Default GSTIN (For 18% Tax Credit)
              </label>
              <input
                type="text"
                value={gstNo}
                onChange={(e) => setGstNo(e.target.value.toUpperCase())}
                placeholder="e.g. 19AAACG1234F1Z5"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 outline-none uppercase font-bold text-slate-800"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#339a99] hover:bg-teal-700 text-white font-extrabold text-xs py-3 rounded-xl shadow-md transition-colors"
          >
            Save Account Settings
          </button>
        </form>

      </div>
    </div>
  );
};
