import React, { useState } from 'react';
import { settingsService } from '../../../services/settingsService';
import { Save, CheckCircle2, Building, ShieldCheck, Globe } from 'lucide-react';

export const SettingsManager = () => {
  const [settings, setSettings] = useState(settingsService.getSettings());
  const [savedMsg, setSavedMsg] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    settingsService.updateSettings(settings);
    setSavedMsg('Settings saved successfully!');
    setTimeout(() => setSavedMsg(''), 3000);
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6 max-w-4xl">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-base font-black text-slate-900 uppercase tracking-tight">
            Global Platform & Site Settings
          </h2>
          <p className="text-xs text-slate-500">Configure company info, GST, defaults, and SEO settings</p>
        </div>
        {savedMsg && (
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
            {savedMsg}
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Company Name</label>
            <input
              type="text"
              value={settings.company_name}
              onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
              className="w-full p-2.5 border border-slate-300 rounded-xl outline-none font-semibold text-slate-800"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Official GSTIN Number</label>
            <input
              type="text"
              value={settings.gstin}
              onChange={(e) => setSettings({ ...settings, gstin: e.target.value })}
              className="w-full p-2.5 border border-slate-300 rounded-xl outline-none font-mono font-bold text-slate-800"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Contact Email</label>
            <input
              type="email"
              value={settings.contact_email}
              onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
              className="w-full p-2.5 border border-slate-300 rounded-xl outline-none font-medium text-slate-800"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">WhatsApp Number</label>
            <input
              type="text"
              value={settings.whatsapp_number}
              onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
              className="w-full p-2.5 border border-slate-300 rounded-xl outline-none font-medium text-slate-800"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Default SEO Meta Description</label>
          <textarea
            rows={3}
            value={settings.default_meta_description}
            onChange={(e) => setSettings({ ...settings, default_meta_description: e.target.value })}
            className="w-full p-2.5 border border-slate-300 rounded-xl outline-none font-medium text-slate-800"
          />
        </div>

        <div className="pt-3">
          <button
            type="submit"
            className="bg-[#02408f] hover:bg-blue-900 text-white font-bold text-xs px-6 py-3 rounded-xl flex items-center gap-1.5 shadow-md"
          >
            <Save className="w-4 h-4 text-amber-300" />
            <span>Save Global Platform Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
