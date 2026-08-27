import React from 'react';
import { X, Trash2, FileText, Send, ShieldCheck, ArrowRight, MessageSquare } from 'lucide-react';
import { useRenova } from '../../context/RenovaContext';

export const RFQDrawer = () => {
  const {
    rfqCart,
    isRFQDrawerOpen,
    setIsRFQDrawerOpen,
    removeFromRFQ,
    updateRFQQuantity,
    rfqSubtotal,
    user,
    showToast
  } = useRenova();

  if (!isRFQDrawerOpen) return null;

  const handleSendWhatsAppRFQ = () => {
    let msg = `*PK RENOVA INDUSTRIES - RFQ QUOTATION REQUEST*\n\n`;
    msg += `Customer Name: ${user.name}\n`;
    msg += `Company: ${user.company}\n`;
    msg += `City: ${user.city}\n\n`;
    msg += `*Requested Equipment List:*\n`;

    rfqCart.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.product.name}\n   - Qty: ${item.quantity} | Est Rate: ₹${item.product.price.toLocaleString('en-IN')}\n`;
      if (item.customNotes) {
        msg += `   - Note: ${item.customNotes}\n`;
      }
    });

    msg += `\n*Est. Subtotal:* ₹${rfqSubtotal.toLocaleString('en-IN')}\n`;
    msg += `Please send formal quotation PDF & delivery schedule to my phone.`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/918954799323?text=${encoded}`, '_blank');
    showToast('Redirected to WhatsApp RFQ with your quotation list!');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 bg-[#0f172a] text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-400" />
              <h2 className="text-xs font-black uppercase tracking-wider">
                RFQ Quotation List ({rfqCart.reduce((s, i) => s + i.quantity, 0)} Items)
              </h2>
            </div>
            <button
              onClick={() => setIsRFQDrawerOpen(false)}
              className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 divide-y divide-slate-100">
            {rfqCart.length > 0 ? (
              rfqCart.map(({ product, quantity, customNotes }) => (
                <div key={product.id} className="pt-4 first:pt-0 flex gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg border border-slate-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="text-xs font-bold text-slate-800 line-clamp-2 leading-snug">
                      {product.name}
                    </h4>
                    <div className="text-[11px] text-[#02408f] font-extrabold">
                      Est. Factory Rate: ₹{product.price.toLocaleString('en-IN')} × {quantity}
                    </div>

                    {customNotes && (
                      <p className="text-[10px] text-amber-700 bg-amber-50 p-1 rounded-md font-medium">
                        Note: {customNotes}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center border border-slate-200 rounded-md overflow-hidden bg-slate-50">
                        <button
                          onClick={() => updateRFQQuantity(product.id, -1)}
                          className="px-2 py-0.5 text-xs font-bold text-slate-600 hover:bg-slate-200"
                        >
                          -
                        </button>
                        <span className="px-2.5 text-xs font-bold text-slate-800">{quantity}</span>
                        <button
                          onClick={() => updateRFQQuantity(product.id, 1)}
                          className="px-2 py-0.5 text-xs font-bold text-slate-600 hover:bg-slate-200"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromRFQ(product.id)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 space-y-3">
                <FileText className="w-12 h-12 text-slate-300 mx-auto" />
                <p className="text-xs font-bold text-slate-600">Your quotation list is empty</p>
              </div>
            )}
          </div>

          {/* Footer & Actions */}
          {rfqCart.length > 0 && (
            <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
              
              <div className="flex justify-between text-xs font-black text-slate-900 border-b border-slate-200 pb-2">
                <span>Estimated Factory Subtotal:</span>
                <span className="text-base text-[#02408f]">
                  ₹{rfqSubtotal.toLocaleString('en-IN')}
                </span>
              </div>

              <button
                onClick={handleSendWhatsAppRFQ}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 uppercase tracking-wider transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send Quotation to WhatsApp (+91 89547 99323)</span>
              </button>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
