import React from 'react';
import {
  Flame,
  Pizza,
  UtensilsCrossed,
  Coffee,
  CakeSlice,
  PackageCheck,
  Check
} from 'lucide-react';

const renderDefaultCategoryIcon = (iconName, className = 'w-4 h-4') => {
  switch (iconName) {
    case 'Pizza': return <Pizza className={className} />;
    case 'Flame': return <Flame className={className} />;
    case 'UtensilsCrossed': return <UtensilsCrossed className={className} />;
    case 'Coffee': return <Coffee className={className} />;
    case 'CakeSlice': return <CakeSlice className={className} />;
    case 'PackageCheck': return <PackageCheck className={className} />;
    default: return <UtensilsCrossed className={className} />;
  }
};

export default function Nav({
  categories = [],
  items = [],
  activeCategory = 'all',
  setActiveCategory,
  vegOnly = false,
  setVegOnly,
  renderCategoryIcon = renderDefaultCategoryIcon
}) {
  return (
    <section id="menu-section" className="sticky top-20 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Scrollable Categories List */}
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setActiveCategory('all')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <Flame className="w-4 h-4" />
              <span>All Specials ({items.length})</span>
            </button>

            {categories.map(cat => {
              const count = items.filter(i => i.categoryId === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    activeCategory === cat.id
                      ? 'bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {renderCategoryIcon(cat.iconName, 'w-4 h-4')}
                  <span>{cat.name} ({count})</span>
                </button>
              );
            })}
          </div>

          {/* Vegetarian Toggle Filter */}
          <div className="hidden sm:flex items-center space-x-2 pl-4 border-l border-slate-800 shrink-0">
            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                vegOnly
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                  : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className={`w-3 h-3 rounded-full border flex items-center justify-center ${vegOnly ? 'border-emerald-400 bg-emerald-500' : 'border-slate-500'}`}>
                {vegOnly && <Check className="w-2.5 h-2.5 text-black" />}
              </div>
              <span>Veg Only</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
