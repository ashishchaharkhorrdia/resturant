import React from 'react';
import { UtensilsCrossed } from 'lucide-react';
import MenuItemCard from './MenuItemCard';

export default function MenuGrid({
  loading = false,
  items = [],
  categories = [],
  onCustomize,
  onResetFilters
}) {
  if (loading) {
    return (
      <div className="py-24 text-center space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-orange-500 border-t-transparent animate-spin mx-auto"></div>
        <p className="text-slate-400 text-sm">Heating up stone ovens & fetching menu...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-20 text-center space-y-3 bg-slate-900/50 rounded-2xl border border-slate-800 p-8">
        <UtensilsCrossed className="w-12 h-12 text-slate-600 mx-auto" />
        <h3 className="text-lg font-bold text-white">No items found</h3>
        <p className="text-slate-400 text-xs max-w-sm mx-auto">
          Try clearing your search query or switching category filters to explore more items.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="mt-3 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200"
          >
            Reset Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(item => {
        const category = categories.find(c => c.id === item.categoryId);
        return (
          <MenuItemCard
            key={item.id}
            item={item}
            category={category}
            onCustomize={onCustomize}
          />
        );
      })}
    </div>
  );
}
