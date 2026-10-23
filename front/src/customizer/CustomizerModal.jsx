import React from 'react';
import {
  Flame,
  X,
  Check,
  Plus,
  Minus,
  ArrowRight
} from 'lucide-react';

export default function CustomizerModal({
  customizingItem,
  setCustomizingItem,
  onAddToCart,
  calculateCustomizedPrice
}) {
  if (!customizingItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">{customizingItem.name}</h3>
              <span className="text-xs text-orange-400 font-semibold">
                Base: ${customizingItem.basePrice.toFixed(2)}
              </span>
            </div>
          </div>
          <button
            onClick={() => setCustomizingItem(null)}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* Size Selection */}
          {customizingItem.sizes && customizingItem.sizes.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-200 uppercase tracking-wider text-[11px] flex items-center space-x-1.5">
                  <span>1. Select Size</span>
                  <span className="text-orange-400">*</span>
                </label>
                <span className="text-slate-400 text-[10px]">Required</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {customizingItem.sizes.map((s, idx) => {
                  const isSelected = customizingItem.selectedSize?.name === s.name;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCustomizingItem({ ...customizingItem, selectedSize: s })}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                        isSelected
                          ? 'bg-orange-500/10 border-orange-500 text-white shadow-md'
                          : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <span className="font-bold text-xs">{s.name}</span>
                      <span className={`text-[11px] mt-1 ${isSelected ? 'text-orange-400 font-bold' : 'text-slate-400'}`}>
                        {s.priceDelta > 0 ? `+$${s.priceDelta.toFixed(2)}` : 'Standard'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Crust / Bun Selection */}
          {customizingItem.crusts && customizingItem.crusts.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-200 uppercase tracking-wider text-[11px] flex items-center space-x-1.5">
                  <span>2. Select Crust / Bun Style</span>
                </label>
                <span className="text-slate-400 text-[10px]">Optional</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {customizingItem.crusts.map((c, idx) => {
                  const isSelected = customizingItem.selectedCrust?.name === c.name;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCustomizingItem({ ...customizingItem, selectedCrust: c })}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-orange-500/10 border-orange-500 text-white shadow-md'
                          : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <span className="font-bold text-xs">{c.name}</span>
                      <span className={`text-[11px] ${isSelected ? 'text-orange-400 font-bold' : 'text-slate-400'}`}>
                        {c.priceDelta > 0 ? `+$${c.priceDelta.toFixed(2)}` : 'Included'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Add-ons Checklist */}
          {customizingItem.addOns && customizingItem.addOns.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
                  3. Extra Toppings & Dipping Sauces
                </label>
                <span className="text-slate-400 text-[10px]">Multi-select</span>
              </div>
              <div className="space-y-2">
                {customizingItem.addOns.map((addon, idx) => {
                  const isChecked = customizingItem.selectedAddOns?.some(a => a.name === addon.name);
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        const current = customizingItem.selectedAddOns || [];
                        const next = isChecked
                          ? current.filter(a => a.name !== addon.name)
                          : [...current, addon];
                        setCustomizingItem({ ...customizingItem, selectedAddOns: next });
                      }}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-orange-500/10 border-orange-500 text-white'
                          : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800/80'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                          isChecked ? 'bg-orange-500 border-orange-500 text-white' : 'border-slate-600'
                        }`}>
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                        <span className="text-xs font-semibold">{addon.name}</span>
                      </div>
                      <span className="text-xs font-bold text-orange-400">
                        +${addon.price.toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
              Special Instructions for Chef
            </label>
            <input
              type="text"
              placeholder="e.g. Extra crispy crust, sauce on the side, no raw onion"
              value={customizingItem.notes || ''}
              onChange={(e) => setCustomizingItem({ ...customizingItem, notes: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500"
            />
          </div>

        </div>

        {/* Modal Footer with Live Price & Add Button */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          {/* Quantity Selector */}
          <div className="flex items-center space-x-2 bg-slate-800 rounded-xl p-1 border border-slate-700">
            <button
              type="button"
              onClick={() => setCustomizingItem({ ...customizingItem, quantity: Math.max(1, (customizingItem.quantity || 1) - 1) })}
              className="w-8 h-8 rounded-lg bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-white"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center font-bold text-sm text-white">
              {customizingItem.quantity || 1}
            </span>
            <button
              type="button"
              onClick={() => setCustomizingItem({ ...customizingItem, quantity: (customizingItem.quantity || 1) + 1 })}
              className="w-8 h-8 rounded-lg bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-white"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Total & Add CTA */}
          <button
            type="button"
            onClick={onAddToCart}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 hover:opacity-95 text-white font-bold text-xs shadow-lg shadow-orange-500/20 flex items-center space-x-2 active:scale-95 transition-all"
          >
            <span>Add To Cart • ${calculateCustomizedPrice(customizingItem).toFixed(2)}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
