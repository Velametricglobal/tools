import React from 'react';
import { X, Scale, FileText, CheckCircle2, ShieldCheck, Trash2, ArrowRight } from 'lucide-react';
import { useRenova } from '../../context/RenovaContext';

export const ProductCompareModal = () => {
  const {
    compareList,
    toggleCompare,
    clearCompare,
    isCompareOpen,
    setIsCompareOpen,
    products,
    addToRFQ
  } = useRenova();

  if (!isCompareOpen) return null;

  const comparedProducts = products.filter((p) => compareList.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#02408f] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black uppercase tracking-tight">
                Side-by-Side Equipment Comparison Matrix
              </h2>
              <p className="text-xs text-sky-200">
                Comparing {comparedProducts.length} of 3 selected machinery items
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {comparedProducts.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-xs font-bold text-sky-200 hover:text-amber-300 flex items-center gap-1 bg-blue-900/60 px-3 py-1.5 rounded-lg transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}

            <button
              onClick={() => setIsCompareOpen(false)}
              className="w-9 h-9 rounded-full bg-blue-900/80 hover:bg-blue-800 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content - Comparison Table */}
        <div className="p-6 overflow-y-auto flex-1 divide-y divide-slate-200">
          {comparedProducts.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <Scale className="w-16 h-16 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-700">No Machines Selected for Comparison</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Click the "Compare" checkbox on any machine card in the product catalog to compare specifications side-by-side.
              </p>
              <button
                onClick={() => setIsCompareOpen(false)}
                className="bg-[#02408f] hover:bg-blue-900 text-white text-xs font-bold px-6 py-2.5 rounded-xl inline-flex items-center gap-2"
              >
                <span>Return to Product Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[650px]">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="p-3 text-xs font-extrabold uppercase text-slate-400 w-1/4">
                      Specification Item
                    </th>
                    {comparedProducts.map((prod) => (
                      <th key={prod.id} className="p-3 w-1/4 text-center align-top relative">
                        <button
                          onClick={() => toggleCompare(prod.id)}
                          className="absolute top-2 right-2 text-slate-400 hover:text-rose-500 p-1"
                          title="Remove from comparison"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="space-y-2">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-24 h-24 object-cover rounded-xl border border-slate-200 mx-auto shadow-xs"
                          />
                          <h4 className="text-xs font-extrabold text-slate-900 line-clamp-2 leading-tight">
                            {prod.name}
                          </h4>
                          <div className="text-center">
                            <span className="text-sm font-black text-[#02408f] block">
                              ₹{prod.price.toLocaleString('en-IN')}
                            </span>
                            <span className="text-[10px] text-slate-400 line-through">
                              ₹{prod.originalPrice.toLocaleString('en-IN')}
                            </span>
                          </div>
                          <button
                            onClick={() => addToRFQ(prod)}
                            className="w-full bg-[#02408f] hover:bg-blue-900 text-white font-bold text-xs py-2 rounded-xl flex items-center justify-center gap-1 shadow-xs transition-colors"
                          >
                            <FileText className="w-3.5 h-3.5 text-amber-300" />
                            <span>Add to RFQ</span>
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  
                  {/* Category */}
                  <tr>
                    <td className="p-3 font-bold text-slate-900 bg-slate-50">Main Category</td>
                    {comparedProducts.map((prod) => (
                      <td key={prod.id} className="p-3 text-center capitalize font-semibold text-slate-700">
                        {prod.category.replace(/-/g, ' ')}
                      </td>
                    ))}
                  </tr>

                  {/* Subcategory */}
                  <tr>
                    <td className="p-3 font-bold text-slate-900 bg-slate-50">Subcategory Division</td>
                    {comparedProducts.map((prod) => (
                      <td key={prod.id} className="p-3 text-center text-slate-600 font-medium">
                        {prod.subcategory}
                      </td>
                    ))}
                  </tr>

                  {/* Motor / Power Required */}
                  <tr>
                    <td className="p-3 font-bold text-slate-900 bg-slate-50">Motor Power / Capacity</td>
                    {comparedProducts.map((prod) => (
                      <td key={prod.id} className="p-3 text-center font-bold text-[#02408f]">
                        {prod.specifications['Motor Power'] ||
                          prod.specifications['Power Required'] ||
                          prod.specifications['Motor'] ||
                          prod.specifications['Press Pressure'] ||
                          'Commercial Motor Equipped'}
                      </td>
                    ))}
                  </tr>

                  {/* Production Rate */}
                  <tr>
                    <td className="p-3 font-bold text-slate-900 bg-slate-50">Production Output Rate</td>
                    {comparedProducts.map((prod) => (
                      <td key={prod.id} className="p-3 text-center font-semibold text-slate-800">
                        {prod.specifications['Grading Capacity'] ||
                          prod.specifications['Processing Capacity'] ||
                          prod.specifications['Batch Capacity'] ||
                          prod.specifications['Capacity'] ||
                          prod.specifications['Production Rate'] ||
                          prod.specifications['Water Output'] ||
                          'Continuous Duty Output'}
                      </td>
                    ))}
                  </tr>

                  {/* Material Construction */}
                  <tr>
                    <td className="p-3 font-bold text-slate-900 bg-slate-50">Material Grade</td>
                    {comparedProducts.map((prod) => (
                      <td key={prod.id} className="p-3 text-center font-medium text-slate-700">
                        <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-300">
                          {prod.material}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Machine Weight */}
                  <tr>
                    <td className="p-3 font-bold text-slate-900 bg-slate-50">Machine Weight</td>
                    {comparedProducts.map((prod) => (
                      <td key={prod.id} className="p-3 text-center font-medium text-slate-700">
                        {prod.specifications['Weight'] || 'Industrial Grade Heavy Frame'}
                      </td>
                    ))}
                  </tr>

                  {/* Warranty */}
                  <tr>
                    <td className="p-3 font-bold text-slate-900 bg-slate-50">Official Warranty</td>
                    {comparedProducts.map((prod) => (
                      <td key={prod.id} className="p-3 text-center font-bold text-emerald-700">
                        {prod.warranty}
                      </td>
                    ))}
                  </tr>

                  {/* Key Features */}
                  <tr>
                    <td className="p-3 font-bold text-slate-900 bg-slate-50">Key Engineering Features</td>
                    {comparedProducts.map((prod) => (
                      <td key={prod.id} className="p-3 align-top">
                        <ul className="space-y-1.5 text-left text-[11px] text-slate-600">
                          {prod.keyFeatures.map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Official Tejas & Company Specifications Guaranteed</span>
          </div>

          <button
            onClick={() => setIsCompareOpen(false)}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors"
          >
            Close Matrix
          </button>
        </div>

      </div>
    </div>
  );
};
