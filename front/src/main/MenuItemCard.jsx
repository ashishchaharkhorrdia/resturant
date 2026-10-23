import React from 'react';
import {
  Flame,
  Clock,
  Plus
} from 'lucide-react';

export default function MenuItemCard({ item, category, onCustomize }) {
  return (
    <div className="group bg-slate-900 rounded-2xl border border-slate-800 hover:border-orange-500/50 transition-all duration-300 flex flex-col overflow-hidden shadow-lg hover:shadow-xl hover:shadow-orange-500/5">
      {/* Item Image with Badges */}
      <div className="relative h-48 overflow-hidden bg-slate-950">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
        
        {/* Type Badges (Veg/Non-Veg & Spicy) */}
        <div className="absolute top-3 left-3 flex items-center space-x-1.5">
          <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider flex items-center space-x-1 border ${
            item.isVeg
              ? 'bg-emerald-950/90 border-emerald-500 text-emerald-300'
              : 'bg-red-950/90 border-red-500 text-red-300'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-emerald-400' : 'bg-red-400'}`}></span>
            <span>{item.isVeg ? 'Veg' : 'Non-Veg'}</span>
          </span>

          {item.isSpicy && (
            <span className="bg-orange-950/90 border border-orange-500/80 text-orange-300 px-2 py-0.5 rounded text-[10px] font-bold flex items-center space-x-1">
              <Flame className="w-3 h-3 text-orange-400" />
              <span>Spicy</span>
            </span>
          )}
        </div>

        {/* Prep time badge */}
        <div className="absolute bottom-2 left-3 flex items-center space-x-1 text-slate-300 text-[11px] bg-slate-900/80 backdrop-blur-sm px-2 py-0.5 rounded-md border border-slate-800">
          <Clock className="w-3 h-3 text-orange-400" />
          <span>{item.preparationTimeMinutes || 15} mins</span>
        </div>

        {/* Calories */}
        {item.calories && (
          <div className="absolute bottom-2 right-3 text-slate-400 text-[11px] bg-slate-900/80 backdrop-blur-sm px-2 py-0.5 rounded-md border border-slate-800">
            {item.calories} kcal
          </div>
        )}
      </div>

      {/* Item Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-orange-400">
            {category?.name || 'Artisan Special'}
          </div>
          <h3 className="font-bold text-base text-white group-hover:text-orange-400 transition-colors leading-snug">
            {item.name}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Footer: Price and Add / Customize Button */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Starting from</span>
            <span className="text-lg font-black text-white">
              ${item.basePrice.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => onCustomize(item)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 hover:opacity-95 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-orange-500/20 active:scale-95 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Customize & Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
