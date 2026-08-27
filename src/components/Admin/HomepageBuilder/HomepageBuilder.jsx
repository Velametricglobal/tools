import React, { useState, useEffect } from 'react';
import {
  LayoutGrid,
  Plus,
  Trash2,
  Copy,
  Eye,
  Save,
  CheckCircle2,
  MoveUp,
  MoveDown,
  Layers,
  Sliders,
  Settings,
  Tv,
  Box,
  Wrench,
  Sparkles,
  RotateCcw,
  Globe
} from 'lucide-react';
import { builderService } from '../../../services/builderService';

export const SECTION_PALETTE = [
  { type: 'HERO', label: 'Main Hero Banner', icon: Tv, desc: 'Headline, sub-headline, CTAs & hero image' },
  { type: '3D_HERO', label: '3D Interactive Viewer', icon: Box, desc: '3D GLTF model orbit & camera animation' },
  { type: 'STATS', label: 'Business Statistics', icon: Sparkles, desc: '4-column animated numbers counter' },
  { type: 'SERVICES', label: 'Dynamic Services Showcase', icon: Wrench, desc: 'Dynamic grid from Services CMS' },
  { type: 'PROCESS', label: '5-Step Process Timeline', icon: Layers, desc: 'Ordered step-by-step workflow' },
  { type: 'CTA', label: 'Conversion Call-to-Action', icon: Globe, desc: 'High-contrast bottom conversion block' }
];

export const HomepageBuilder = () => {
  const [sections, setSections] = useState([]);
  const [selectedSecId, setSelectedSecId] = useState(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [versions, setVersions] = useState([]);
  const [activeTab, setActiveTab] = useState('canvas'); // 'canvas' | 'versions'
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    loadSections();
    loadVersions();
  }, []);

  const loadSections = async () => {
    const secs = await builderService.getPageSections('home');
    setSections(secs);
    if (secs.length > 0) setSelectedSecId(secs[0].id);
  };

  const loadVersions = async () => {
    const vers = await builderService.getVersions();
    setVersions(vers);
  };

  const handleAddSection = (secType) => {
    const palette = SECTION_PALETTE.find((p) => p.type === secType);
    const newSec = {
      id: `sec-${Date.now()}`,
      section_type: secType,
      name: palette ? palette.label : secType,
      sort_order: sections.length + 1,
      is_enabled: true,
      content_json: {
        heading: `New ${secType} Title`,
        description: 'Configure your section details in the right inspector panel.',
        ...(secType === 'STATS' ? { stats: [{ number: '100', label: 'Projects' }] } : {})
      },
      style_json: { background_color: '#ffffff', text_color: '#0f172a' }
    };
    const updated = [...sections, newSec];
    setSections(updated);
    setSelectedSecId(newSec.id);
  };

  const handleMove = (index, direction) => {
    const updated = [...sections];
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= updated.length) return;
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setSections(updated);
  };

  const handleDuplicate = (secId) => {
    const target = sections.find((s) => s.id === secId);
    if (!target) return;
    const clone = {
      ...target,
      id: `sec-${Date.now()}`,
      name: `${target.name} (Copy)`
    };
    setSections([...sections, clone]);
  };

  const handleDelete = (secId) => {
    const updated = sections.filter((s) => s.id !== secId);
    setSections(updated);
    if (selectedSecId === secId) {
      setSelectedSecId(updated.length > 0 ? updated[0].id : null);
    }
  };

  const handleSaveDraft = async () => {
    await builderService.saveDraft(sections);
    await loadVersions();
    setStatusMsg('Draft saved successfully!');
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const handlePublish = async () => {
    await builderService.publishPage(sections);
    await loadVersions();
    setStatusMsg('Homepage published to live website!');
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const handleRestoreVersion = async (verId) => {
    const restored = await builderService.restoreVersion(verId);
    setSections(restored);
    setStatusMsg('Restored previous page version!');
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const selectedSec = sections.find((s) => s.id === selectedSecId);

  const updateSelectedContent = (key, value) => {
    if (!selectedSec) return;
    setSections((prev) =>
      prev.map((s) =>
        s.id === selectedSecId
          ? {
              ...s,
              content_json: { ...s.content_json, [key]: value }
            }
          : s
      )
    );
  };

  return (
    <div className="space-y-4">
      
      {/* Builder Top Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-black text-slate-900 uppercase tracking-tight">
              Visual Front-Page Builder
            </h2>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-300">
              ELEMENTOR / FRAMER STYLE
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Drag, edit, configure 3D parameters & publish homepage sections without touching code
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {statusMsg && (
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 animate-in fade-in">
              {statusMsg}
            </span>
          )}

          <button
            onClick={() => setIsPreviewMode((prev) => !prev)}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 border transition-all ${
              isPreviewMode
                ? 'bg-amber-400 text-slate-950 border-amber-500 font-black'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>{isPreviewMode ? 'Exit Preview' : 'Live Preview'}</span>
          </button>

          <button
            onClick={handleSaveDraft}
            className="bg-sky-50 text-[#02408f] hover:bg-sky-100 border border-sky-200 text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Draft</span>
          </button>

          <button
            onClick={handlePublish}
            className="bg-[#02408f] hover:bg-blue-900 text-white text-xs font-black px-5 py-2 rounded-xl flex items-center gap-1.5 shadow-md transition-colors"
          >
            <CheckCircle2 className="w-4 h-4 text-amber-300" />
            <span>Publish Page</span>
          </button>
        </div>
      </div>

      {/* Main Builder Grid: Left Palette | Center Canvas | Right Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* 1. LEFT SIDEBAR - COMPONENT PALETTE & VERSION HISTORY */}
        <div className="lg:col-span-3 space-y-4">
          
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-black uppercase text-slate-900 tracking-wider">
                Section Palette
              </span>
              <span className="text-[10px] text-slate-400 font-bold">Click + Add</span>
            </div>

            <div className="space-y-2">
              {SECTION_PALETTE.map((pal) => {
                const IconComp = pal.icon;
                return (
                  <button
                    key={pal.type}
                    onClick={() => handleAddSection(pal.type)}
                    className="w-full p-2.5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 text-left transition-all group flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-[#02408f] flex items-center justify-center shrink-0 group-hover:bg-[#02408f] group-hover:text-white transition-colors">
                        <IconComp className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-slate-800 group-hover:text-[#02408f]">
                          {pal.label}
                        </span>
                        <span className="text-[10px] text-slate-400 block line-clamp-1">
                          {pal.desc}
                        </span>
                      </div>
                    </div>
                    <Plus className="w-4 h-4 text-slate-300 group-hover:text-[#02408f]" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Page Version History */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <span className="text-xs font-black uppercase text-slate-900 tracking-wider block border-b border-slate-100 pb-2">
              Page Versions ({versions.length})
            </span>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {versions.map((ver) => (
                <div
                  key={ver.id}
                  className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-800 block">Version #{ver.version_number}</span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {ver.status} • {new Date(ver.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <button
                    onClick={() => handleRestoreVersion(ver.id)}
                    className="text-[10px] font-bold text-[#02408f] hover:underline bg-white px-2 py-1 rounded-md border border-slate-200"
                  >
                    Restore
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 2. CENTER - LIVE PAGE CANVAS */}
        <div className="lg:col-span-6 space-y-3">
          
          <div className="bg-slate-900 text-white px-4 py-2.5 rounded-2xl flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              Live Homepage Canvas ({sections.length} Sections)
            </span>
            <span className="text-[10px] text-slate-400 font-medium">Click section to inspect</span>
          </div>

          <div className="space-y-4">
            {sections.map((sec, idx) => {
              const isSelected = sec.id === selectedSecId;

              return (
                <div
                  key={sec.id}
                  onClick={() => setSelectedSecId(sec.id)}
                  className={`bg-white rounded-2xl border-2 transition-all p-4 relative group cursor-pointer ${
                    isSelected
                      ? 'border-[#02408f] shadow-xl ring-2 ring-blue-400/30'
                      : 'border-slate-200 hover:border-sky-300 shadow-xs'
                  }`}
                >
                  {/* Section Controls Top Bar */}
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="bg-slate-900 text-white font-black text-[10px] px-2 py-0.5 rounded-md">
                        #{idx + 1}
                      </span>
                      <span className="font-extrabold text-slate-900 uppercase tracking-tight">
                        {sec.name} ({sec.section_type})
                      </span>
                    </div>

                    <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleMove(idx, -1); }}
                        className="p-1 rounded-md hover:bg-slate-100 text-slate-600"
                        title="Move Up"
                      >
                        <MoveUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleMove(idx, 1); }}
                        className="p-1 rounded-md hover:bg-slate-100 text-slate-600"
                        title="Move Down"
                      >
                        <MoveDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDuplicate(sec.id); }}
                        className="p-1 rounded-md hover:bg-slate-100 text-slate-600"
                        title="Duplicate Section"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(sec.id); }}
                        className="p-1 rounded-md hover:bg-rose-50 text-rose-600"
                        title="Delete Section"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Section Content Preview Render */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5 text-xs text-slate-700">
                    <h4 className="font-extrabold text-slate-900 text-sm">
                      {sec.content_json.heading || sec.content_json.title || sec.name}
                    </h4>
                    {sec.content_json.description && (
                      <p className="text-slate-500 line-clamp-2">{sec.content_json.description}</p>
                    )}
                    {sec.section_type === '3D_HERO' && (
                      <div className="bg-slate-900 text-sky-300 p-2 rounded-lg text-[10px] font-mono">
                        3D Orbit Enabled • Model: {sec.content_json.model_url || 'Default 3D Asset'}
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* 3. RIGHT SIDEBAR - PROPERTY INSPECTOR */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-black uppercase text-slate-900 tracking-wider flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-[#02408f]" />
                Section Inspector
              </span>
              {selectedSec && (
                <span className="text-[10px] bg-sky-100 text-[#02408f] font-bold px-2 py-0.5 rounded-md">
                  {selectedSec.section_type}
                </span>
              )}
            </div>

            {selectedSec ? (
              <div className="space-y-3 text-xs">
                
                {/* Section Name */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Section Title/Name</label>
                  <input
                    type="text"
                    value={selectedSec.name}
                    onChange={(e) => {
                      const nameVal = e.target.value;
                      setSections((prev) =>
                        prev.map((s) => (s.id === selectedSecId ? { ...s, name: nameVal } : s))
                      );
                    }}
                    className="w-full p-2 border border-slate-300 rounded-xl outline-none font-semibold text-slate-800"
                  />
                </div>

                {/* Section Content Fields */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Main Heading</label>
                  <input
                    type="text"
                    value={selectedSec.content_json.heading || selectedSec.content_json.title || ''}
                    onChange={(e) => updateSelectedContent(selectedSec.content_json.heading ? 'heading' : 'title', e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-xl outline-none font-semibold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Description / Subtitle</label>
                  <textarea
                    rows={3}
                    value={selectedSec.content_json.description || selectedSec.content_json.subtitle || ''}
                    onChange={(e) => updateSelectedContent(selectedSec.content_json.description ? 'description' : 'subtitle', e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-xl outline-none font-medium text-slate-800"
                  />
                </div>

                {/* 3D Parameters Inspector */}
                {selectedSec.section_type === '3D_HERO' && (
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <span className="text-[11px] font-black uppercase text-[#02408f] tracking-wider block">
                      3D Model Orbit Controls
                    </span>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-1">Rotation Speed</label>
                      <input
                        type="range"
                        min="0.1"
                        max="5.0"
                        step="0.1"
                        value={selectedSec.content_json.rotation_speed || 1.5}
                        onChange={(e) => updateSelectedContent('rotation_speed', Number(e.target.value))}
                        className="w-full accent-[#02408f]"
                      />
                    </div>
                  </div>
                )}

              </div>
            ) : (
              <p className="text-xs text-slate-400 text-center py-6">Select a section to inspect properties</p>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
