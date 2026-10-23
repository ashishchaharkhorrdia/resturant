import React from 'react';
import {
  Flame,
  MapPin,
  Phone,
  Clock,
  ShieldCheck
} from 'lucide-react';

export default function Footer({ settings }) {
  return (
    <footer className="mt-auto bg-slate-900 border-t border-slate-800 py-10 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 flex items-center justify-center text-white">
              <Flame className="w-5 h-5" />
            </div>
            <span className="font-bold text-base text-white">FLAME & DOUGH</span>
          </div>
          <p className="leading-relaxed">
            Stone-baked pizzas, smash-griddled Angus burgers, and twice-fried peri-peri wings. Fast, piping hot, and handcrafted.
          </p>
        </div>

        <div className="space-y-2">
          <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">Restaurant Location</h5>
          <div className="flex items-start space-x-2 text-slate-300">
            <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
            <span>{settings?.address || '452 Lexington Avenue, Manhattan, NY 10017'}</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-300">
            <Phone className="w-4 h-4 text-orange-400 shrink-0" />
            <span>{settings?.phone || '+1 (800) 555-3473'}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">Operating Hours</h5>
          <div className="flex items-center space-x-2 text-slate-300">
            <Clock className="w-4 h-4 text-orange-400 shrink-0" />
            <span>{settings?.openingHours || '10:30 AM - 11:30 PM (Daily)'}</span>
          </div>
          <p className="text-[11px] text-slate-500">Last orders accepted 30 minutes before closing time.</p>
        </div>

        <div className="space-y-2">
          <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">Staff & Admin Portals</h5>
          <p className="text-slate-400">Are you on the restaurant team?</p>
          <div className="space-y-1.5 pt-1">
            <a
              href="http://localhost:5174"
              target="_blank"
              rel="noreferrer"
              className="block text-orange-400 hover:text-orange-300 font-semibold"
            >
              Launch Admin Management Portal &rarr;
            </a>
            <a
              href="http://localhost:5175"
              target="_blank"
              rel="noreferrer"
              className="block text-amber-400 hover:text-amber-300 font-semibold"
            >
              Launch Store Counter POS & Kitchen Display &rarr;
            </a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-500 text-[11px]">
        <span>© 2026 FLAME & DOUGH Artisan Kitchen. All rights reserved.</span>
        <span className="flex items-center space-x-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Strict Health & Hygiene Safe Certified</span>
        </span>
      </div>
    </footer>
  );
}
