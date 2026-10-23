import React from 'react';
import {
  Flame,
  Clock,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export default function Hero({ items = [], handleOpenCustomizer }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 py-10 md:py-16 border-b border-slate-800/80">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-3.5 py-1 text-xs font-semibold text-orange-400">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span>Stone-Baked at 800°F & Fresh Smashed Angus</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-none">
              Crave The Heat. <br />
              <span className="bg-gradient-to-r from-red-500 via-orange-400 to-amber-400 bg-clip-text text-transparent">
                Taste The Crust.
              </span>
            </h1>
            
            <p className="text-sm sm:text-base text-slate-300 max-w-xl font-normal leading-relaxed mx-auto lg:mx-0">
              Inspired by the authentic speed and satisfaction of Domino's and McDonald's. Hand-tossed artisan dough, aged mozzarella, smash-griddled double patties, and fiery wings delivered hot in 30 minutes.
            </p>

            {/* Order Mode Switcher on Mobile & Hero CTA */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => {
                  const menuEl = document.getElementById('menu-section');
                  menuEl?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 hover:opacity-95 text-white font-bold text-sm shadow-xl shadow-orange-500/20 flex items-center space-x-2 transform active:scale-95 transition-all"
              >
                <span>Explore Menu & Order Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center space-x-4 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <div className="flex items-center space-x-1.5">
                  <Clock className="w-4 h-4 text-orange-400" />
                  <span>30 Min Hot Guarantee</span>
                </div>
                <div className="w-px h-4 bg-slate-800" />
                <div className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-green-400" />
                  <span>100% Fresh Daily</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md rounded-2xl overflow-hidden border border-slate-800 shadow-2xl shadow-orange-500/10 group">
              <img
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80"
                alt="Hot Artisan Pizza Fresh From Stone Oven"
                className="w-full h-72 sm:h-84 object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">Chef's Signature</span>
                  <h4 className="text-sm font-bold text-white">Pepperoni & Hot Honey Feast</h4>
                  <p className="text-xs text-slate-400">$16.99 | 100% Cupping Pepperoni</p>
                </div>
                <button
                  onClick={() => {
                    const item = items.find(i => i.id === 'item-piz-1');
                    if (item && handleOpenCustomizer) handleOpenCustomizer(item);
                  }}
                  className="px-3.5 py-2 rounded-lg bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white font-bold text-xs shadow-md"
                >
                  Customize
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
