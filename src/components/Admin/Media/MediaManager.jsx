import React, { useState, useEffect } from 'react';
import { mediaService } from '../../../services/mediaService';
import { Image as ImageIcon, Upload, Trash2, Folder, Search } from 'lucide-react';

export const MediaManager = () => {
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setAssets(mediaService.getAssets());
  }, []);

  const filteredAssets = assets.filter((a) =>
    a.file_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-black text-slate-900 uppercase tracking-tight">
            Supabase Storage & Media Library
          </h2>
          <p className="text-xs text-slate-500">
            Manage uploaded machinery photos, CAD renders, 3D model files & document PDFs
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search media files..."
            className="p-2 border border-slate-300 rounded-xl text-xs outline-none"
          />
          <button className="bg-[#02408f] text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm">
            <Upload className="w-4 h-4 text-amber-300" />
            <span>Upload New Asset</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredAssets.map((asset) => (
          <div key={asset.id} className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs space-y-2 group">
            <div className="h-40 rounded-xl overflow-hidden bg-slate-100 relative">
              <img src={asset.file_url} alt={asset.alt_text} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </div>
            <div>
              <h5 className="font-extrabold text-xs text-slate-900 truncate">{asset.file_name}</h5>
              <span className="text-[10px] font-bold text-slate-400 block">{asset.dimensions} • {asset.folder}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
