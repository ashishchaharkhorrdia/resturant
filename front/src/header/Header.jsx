import React from 'react';
import {
  Flame,
  Search,
  X,
  Clock,
  Sparkles,
  ShoppingBag,
  Truck
} from 'lucide-react';

export default function Header({
  settings,
  orderType,
  setOrderType,
  searchQuery,
  setSearchQuery,
  totalCartCount,
  subtotal,
  setIsTrackerOpen,
  setIsCartOpen,
  setActiveCategory
}) {
  return (
    <>
      {/* Top Brand Notification Banner */}
      <div className="bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white text-xs md:text-sm font-semibold py-2 px-4 shadow-md text-center flex items-center justify-center space-x-2">
        <Sparkles className="w-4 h-4 animate-pulse" />
        <span>{settings?.announcement || 'Stone-Baked Perfection & Hand-Smashed Burgers | 20% OFF with code TASTY20'}</span>
        <span className="hidden md:inline bg-black/20 px-2 py-0.5 rounded text-xs uppercase tracking-wider font-bold">Domino & Mac Standard</span>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Flame className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-xl md:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-red-500 via-orange-400 to-amber-400 bg-clip-text text-transparent">
                FLAME & DOUGH
              </span>
              <p className="text-[11px] font-medium text-slate-400 tracking-wider uppercase">Artisan Oven & Grill</p>
            </div>
          </div>

          {/* Delivery / Takeaway Switcher */}
          <div className="hidden lg:flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 shadow-inner">
            <button
              onClick={() => setOrderType('delivery')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                orderType === 'delivery'
                  ? 'bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>Hot Delivery (30m)</span>
            </button>
            <button
              onClick={() => setOrderType('takeaway')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                orderType === 'takeaway'
                  ? 'bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Store Pickup (15m)</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search artisan pizzas, burgers, wings, desserts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/60 border border-slate-700/80 focus:border-orange-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Action Buttons: Live Track & Cart */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsTrackerOpen(true)}
              className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700/90 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
            >
              <Clock className="w-4 h-4 text-orange-400" />
              <span className="hidden sm:inline">Track Order</span>
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 hover:opacity-95 text-white font-bold text-sm shadow-lg shadow-orange-500/25 transition-all transform active:scale-95"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline">Cart</span>
              {totalCartCount > 0 && (
                <span className="bg-slate-950 text-orange-400 font-extrabold text-xs px-2 py-0.5 rounded-full ml-1 border border-orange-500/30">
                  {totalCartCount}
                </span>
              )}
              {subtotal > 0 && (
                <span className="hidden lg:inline ml-1 text-xs opacity-90 border-l border-white/30 pl-2">
                  ${subtotal.toFixed(2)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search pizzas, smash burgers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>
      </header>
    </>
  );
}
