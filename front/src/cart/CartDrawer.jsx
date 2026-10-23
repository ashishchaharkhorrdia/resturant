import React from 'react';
import {
  ShoppingBag,
  X,
  Minus,
  Plus,
  ArrowRight
} from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cart = [],
  totalCartCount = 0,
  subtotal = 0,
  tax = 0,
  deliveryFee = 0,
  couponDiscount = 0,
  total = 0,
  updateCartItemQuantity,
  couponInput = '',
  setCouponInput,
  appliedCoupon = null,
  couponError = '',
  handleApplyCoupon,
  removeCoupon,
  onProceedToCheckout
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border-l border-slate-800 w-full max-w-md h-full flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-orange-400" />
            <h3 className="font-bold text-sm text-white">Your Order Basket ({totalCartCount})</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-3 p-6">
              <ShoppingBag className="w-12 h-12 text-slate-600" />
              <h4 className="font-bold text-white text-sm">Your basket is empty</h4>
              <p className="text-xs text-slate-400">Discover our artisan stone-baked pizzas and juicy smash burgers to get started.</p>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white font-bold text-xs"
              >
                Browse Specials
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.cartItemId} className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h4 className="font-bold text-xs text-white leading-tight">{item.name}</h4>
                    <div className="text-[11px] text-slate-400 mt-0.5 space-y-0.5">
                      {item.size && <div>Size: <span className="text-slate-300 font-semibold">{item.size}</span></div>}
                      {item.crust && <div>Crust: <span className="text-slate-300 font-semibold">{item.crust}</span></div>}
                      {item.addOns && item.addOns.length > 0 && (
                        <div>Extras: <span className="text-orange-400 font-medium">{item.addOns.join(', ')}</span></div>
                      )}
                      {item.notes && <div className="italic text-slate-500">Note: "{item.notes}"</div>}
                    </div>
                  </div>

                  <span className="font-bold text-xs text-white shrink-0">
                    ${item.itemTotal.toFixed(2)}
                  </span>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between pt-1 border-t border-slate-800/60">
                  <span className="text-[10px] text-slate-500">${item.unitPrice.toFixed(2)} each</span>
                  <div className="flex items-center space-x-1.5 bg-slate-800 rounded-lg p-0.5">
                    <button
                      onClick={() => updateCartItemQuantity(item.cartItemId, -1)}
                      className="w-6 h-6 rounded bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-white"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateCartItemQuantity(item.cartItemId, 1)}
                      className="w-6 h-6 rounded bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-white"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bill Summary & Promo Code */}
        {cart.length > 0 && (
          <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-3 text-xs">
            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="space-y-1">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Promo code (e.g. TASTY20)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 uppercase font-mono"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-orange-400 font-bold text-xs"
                >
                  Apply
                </button>
              </div>
              {couponError && <p className="text-[11px] text-red-400">{couponError}</p>}
              {appliedCoupon && (
                <div className="flex items-center justify-between p-2 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400 text-[11px]">
                  <span>Code <strong>{appliedCoupon.code}</strong> applied (-${couponDiscount.toFixed(2)})</span>
                  <button type="button" onClick={removeCoupon} className="text-slate-400 hover:text-white">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </form>

            {/* Subtotals & Taxes */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800 text-slate-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (8.5%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-400 font-bold">FREE</span>
                  ) : (
                    `$${deliveryFee.toFixed(2)}`
                  )}
                </span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-orange-400 font-semibold">
                  <span>Promo Discount</span>
                  <span>-${couponDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-slate-800">
                <span>Total Amount</span>
                <span className="text-base text-orange-400">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={onProceedToCheckout}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 hover:opacity-95 text-white font-bold text-sm shadow-xl shadow-orange-500/25 flex items-center justify-center space-x-2 active:scale-95 transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
