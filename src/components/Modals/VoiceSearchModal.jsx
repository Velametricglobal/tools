import React, { useState, useEffect } from 'react';
import { Mic, X, Volume2, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const VoiceSearchModal = () => {
  const { isVoiceSearchOpen, setIsVoiceSearchOpen, setSearchQuery } = useApp();
  const [listeningState, setListeningState] = useState('Listening...');
  const [spokenText, setSpokenText] = useState('');

  useEffect(() => {
    if (isVoiceSearchOpen) {
      setListeningState('Listening...');
      setSpokenText('');

      const t1 = setTimeout(() => {
        setSpokenText('5 HP Water Pump');
        setListeningState('Processing voice query...');
      }, 2000);

      const t2 = setTimeout(() => {
        setSearchQuery('Pump');
        setIsVoiceSearchOpen(false);
      }, 3500);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [isVoiceSearchOpen]);

  if (!isVoiceSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl border border-slate-200 relative space-y-6">
        
        <button
          onClick={() => setIsVoiceSearchOpen(false)}
          className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 bg-teal-500/20 rounded-full animate-ping" />
          <div className="w-20 h-20 bg-gradient-to-tr from-[#007777] to-[#339a99] text-white rounded-full flex items-center justify-center shadow-lg relative z-10">
            <Mic className="w-10 h-10 animate-bounce" />
          </div>
        </div>

        <div>
          <h3 className="text-base font-extrabold text-slate-900">{listeningState}</h3>
          <p className="text-xs text-slate-500 mt-1">
            Say something like "Power Tiller", "Chainsaw", or "Submersible Pump"
          </p>
        </div>

        {spokenText && (
          <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-xs font-bold text-teal-800 flex items-center justify-center gap-2">
            <Volume2 className="w-4 h-4 text-[#339a99]" />
            <span>"{spokenText}"</span>
          </div>
        )}

      </div>
    </div>
  );
};
