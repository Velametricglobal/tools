import React, { useState } from 'react';
import { useRenova } from '../../../context/RenovaContext';
import { TEJAS_CATEGORIES } from '../../../data/tejasCategories';
import { TEJAS_PRODUCTS } from '../../../data/tejasProducts';
import {
  Plus,
  Package,
  FolderPlus,
  Trash2,
  CheckCircle2,
  Tag,
  ShieldCheck,
  Image as ImageIcon,
  DollarSign,
  Zap,
  Wrench,
  RotateCw,
  Flame,
  Droplets,
  Scale,
  Box,
  Truck,
  Cpu
} from 'lucide-react';

export const ICON_OPTIONS = [
  { name: 'Wrench', label: 'Wrench / Machinery' },
  { name: 'Zap', label: 'Zap / Power' },
  { name: 'RotateCw', label: 'Rotate / Pulverizer' },
  { name: 'Flame', label: 'Flame / Roasting' },
  { name: 'Droplets', label: 'Droplets / Oil Press' },
  { name: 'Scale', label: 'Scale / Grading' },
  { name: 'Box', label: 'Box / Packaging' },
  { name: 'ShieldCheck', label: 'Shield / Preservation' },
  { name: 'Truck', label: 'Truck / Logistics' },
  { name: 'Cpu', label: 'Cpu / Automation' }
];

export const ProductsManager = () => {
  const context = useRenova() || {};
  const products = context.products || TEJAS_PRODUCTS;
  const categories = context.categories || TEJAS_CATEGORIES;
  const addProduct = context.addProduct || (() => {});
  const addCategory = context.addCategory || (() => {});
  const deleteProduct = context.deleteProduct || (() => {});

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'categories'
  const [successMsg, setSuccessMsg] = useState('');

  // New Category Form State
  const [newCat, setNewCat] = useState({
    id: '',
    name: '',
    slug: '',
    icon: 'Wrench',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    description: '',
    subcategories: ''
  });

  // New Product Form State
  const [newProd, setNewProd] = useState({
    id: '',
    name: '',
    category: categories[0]?.id || 'fruit-veg',
    subcategory: '',
    price: 95000,
    originalPrice: 120000,
    discount: '20% OFF',
    rating: 4.8,
    reviews: 12,
    badge: 'NEW ARRIVAL • SS 304',
    inStock: true,
    material: '100% AISI 304 Food Grade Stainless Steel',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    description: 'High capacity commercial machinery engineered for continuous industrial operations.',
    specs: {
      capacity: '100 Kg/Hr',
      power: '3 Phase 5 HP Motor',
      warranty: '1 Year On-Site Warranty'
    }
  });

  const handleCreateCategory = (e) => {
    e.preventDefault();
    if (!newCat.name) return;
    const catId = newCat.id || newCat.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const subArr = newCat.subcategories
      ? newCat.subcategories.split(',').map((s) => s.trim()).filter(Boolean)
      : ['General Equipment'];

    const categoryObj = {
      id: catId,
      name: newCat.name,
      slug: catId,
      icon: newCat.icon || 'Wrench',
      image: newCat.image || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      count: 0,
      description: newCat.description || 'Commercial industrial food processing equipment.',
      subcategories: subArr
    };

    addCategory(categoryObj);
    setSuccessMsg(`Successfully added category "${newCat.name}" with icon & image!`);
    setNewCat({
      id: '',
      name: '',
      slug: '',
      icon: 'Wrench',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      description: '',
      subcategories: ''
    });
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!newProd.name || !newProd.price) return;
    const prodId = newProd.id || `tejas-${Date.now()}`;

    const productObj = {
      ...newProd,
      id: prodId,
      price: Number(newProd.price),
      originalPrice: Number(newProd.originalPrice || newProd.price * 1.2),
      specs: {
        capacity: newProd.specs?.capacity || 'Custom Production',
        power: newProd.specs?.power || 'Electric / Hydraulic',
        warranty: '1 Year Official Warranty'
      }
    };

    addProduct(productObj);
    setSuccessMsg(`Successfully added product "${newProd.name}"!`);
    setNewProd({
      id: '',
      name: '',
      category: categories[0]?.id || 'fruit-veg',
      subcategory: '',
      price: 95000,
      originalPrice: 120000,
      discount: '20% OFF',
      rating: 4.8,
      reviews: 12,
      badge: 'NEW ARRIVAL • SS 304',
      inStock: true,
      material: '100% AISI 304 Food Grade Stainless Steel',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      description: 'High capacity commercial machinery engineered for continuous industrial operations.',
      specs: {
        capacity: '100 Kg/Hr',
        power: '3 Phase 5 HP Motor',
        warranty: '1 Year On-Site Warranty'
      }
    });
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-black text-slate-900 uppercase tracking-tight">
            Products & Categories CMS Manager
          </h2>
          <p className="text-xs text-slate-500">
            Add new machinery models, create product categories with icons & images, manage SS 304 specs
          </p>
        </div>

        <div className="flex items-center gap-2">
          {successMsg && (
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 animate-in fade-in">
              {successMsg}
            </span>
          )}

          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'products'
                  ? 'bg-[#02408f] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Products ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'categories'
                  ? 'bg-[#02408f] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Categories ({categories.length})
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: PRODUCTS MANAGER */}
      {activeTab === 'products' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Form: Add New Product */}
          <div className="lg:col-span-5 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xs font-black uppercase text-slate-900 tracking-wider flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-[#02408f]" />
                Add New Product
              </h3>
              <span className="text-[10px] bg-sky-100 text-[#02408f] font-bold px-2 py-0.5 rounded-md">
                Live CMS Sync
              </span>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Product Model Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Commercial SS 304 Steam Blancher"
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl outline-none font-semibold text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category *</label>
                  <select
                    value={newProd.category}
                    onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl outline-none font-bold text-slate-800 bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Subcategory Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Steam Blanchers"
                    value={newProd.subcategory}
                    onChange={(e) => setNewProd({ ...newProd, subcategory: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl outline-none text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Offer Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newProd.price}
                    onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl outline-none font-black text-[#02408f]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={newProd.originalPrice}
                    onChange={(e) => setNewProd({ ...newProd, originalPrice: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl outline-none font-bold text-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Product Photo URL</label>
                <input
                  type="text"
                  value={newProd.image}
                  onChange={(e) => setNewProd({ ...newProd, image: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl outline-none text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Capacity / Motor Spec</label>
                <input
                  type="text"
                  placeholder="e.g. 500 Kg/Hr • 3 Phase 7.5 HP"
                  value={newProd.specs.capacity}
                  onChange={(e) =>
                    setNewProd({ ...newProd, specs: { ...newProd.specs, capacity: e.target.value } })
                  }
                  className="w-full p-2.5 border border-slate-300 rounded-xl outline-none text-slate-800"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#02408f] hover:bg-blue-900 text-white font-black text-xs py-3 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 mt-2"
              >
                <Plus className="w-4 h-4 text-amber-300" />
                <span>Publish New Machinery Product</span>
              </button>
            </form>
          </div>

          {/* Right Table: Existing Products List */}
          <div className="lg:col-span-7 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xs font-black uppercase text-slate-900 tracking-wider">
                Current Machinery Catalog ({products.length} Products)
              </h3>
              <span className="text-[10px] text-slate-400 font-bold">1-Click Remove</span>
            </div>

            <div className="divide-y divide-slate-100 max-h-[550px] overflow-y-auto pr-1">
              {products.map((prod) => (
                <div key={prod.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div>
                      <h4 className="font-extrabold text-slate-900">{prod.name}</h4>
                      <span className="text-[10px] font-bold text-[#02408f] block">
                        Category: {prod.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-black text-slate-900">
                      ₹{prod.price.toLocaleString('en-IN')}
                    </span>
                    <button
                      onClick={() => deleteProduct(prod.id)}
                      className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: CATEGORIES MANAGER (WITH ICON & IMAGE OPTIONS) */}
      {activeTab === 'categories' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Form: Add New Category */}
          <div className="lg:col-span-5 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xs font-black uppercase text-slate-900 tracking-wider flex items-center gap-1.5">
                <FolderPlus className="w-4 h-4 text-[#02408f]" />
                Add New Category (Icon & Image)
              </h3>
              <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-md">
                Rich Visuals
              </span>
            </div>

            <form onSubmit={handleCreateCategory} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Roasting & Preservation Machines"
                  value={newCat.name}
                  onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl outline-none font-semibold text-slate-800"
                />
              </div>

              {/* ICON & IMAGE SELECTORS */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category Icon *</label>
                  <select
                    value={newCat.icon}
                    onChange={(e) => setNewCat({ ...newCat, icon: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl outline-none font-bold text-slate-800 bg-white"
                  >
                    {ICON_OPTIONS.map((opt) => (
                      <option key={opt.name} value={opt.name}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Banner Image URL</label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/..."
                    value={newCat.image}
                    onChange={(e) => setNewCat({ ...newCat, image: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl outline-none text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Subcategories (Comma Separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Tilting Drum Roaster, Seed Dryer, Coffee Bean Roaster"
                  value={newCat.subcategories}
                  onChange={(e) => setNewCat({ ...newCat, subcategories: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl outline-none text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Category Description</label>
                <textarea
                  rows={3}
                  placeholder="Commercial roasters for nuts, coffee beans, grains & preservation equipment."
                  value={newCat.description}
                  onChange={(e) => setNewCat({ ...newCat, description: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl outline-none font-medium text-slate-800"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#02408f] hover:bg-blue-900 text-white font-black text-xs py-3 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 mt-2"
              >
                <Plus className="w-4 h-4 text-amber-300" />
                <span>Create New Category with Icon & Image</span>
              </button>
            </form>
          </div>

          {/* Right Table: Existing Categories List with Icon & Image Previews */}
          <div className="lg:col-span-7 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xs font-black uppercase text-slate-900 tracking-wider">
                Current Product Categories ({categories.length} Categories)
              </h3>
            </div>

            <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
              {categories.map((cat) => (
                <div key={cat.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {cat.image && (
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                        />
                      )}
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-black bg-blue-900 text-amber-300 px-2 py-0.5 rounded-md uppercase">
                            Icon: {cat.icon || 'Wrench'}
                          </span>
                          <h4 className="font-extrabold text-slate-900 text-sm">{cat.name}</h4>
                        </div>
                      </div>
                    </div>

                    <span className="text-[10px] font-black bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md">
                      {cat.count} Products
                    </span>
                  </div>

                  <p className="text-slate-500 text-[11px]">{cat.description}</p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {(cat.subcategories || []).map((sub, sIdx) => (
                      <span key={sIdx} className="bg-white text-slate-700 border border-slate-200 text-[10px] font-bold px-2 py-0.5 rounded-md">
                        • {sub}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
