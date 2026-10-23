import React from 'react';
import {
  Truck,
  ShoppingBag,
  X,
  ArrowRight
} from 'lucide-react';

export default function CheckoutModal({
  isOpen,
  onClose,
  orderType = 'delivery',
  setOrderType,
  customerForm,
  setCustomerForm,
  handlePlaceOrder,
  isSubmittingOrder = false,
  cart = [],
  total = 0
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center space-x-2">
            <Truck className="w-5 h-5 text-orange-400" />
            <h3 className="font-bold text-sm text-white">Complete Your Order</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handlePlaceOrder} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
          
          {/* Order Mode Toggle */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">Order Type</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`p-3 rounded-xl border flex items-center justify-center space-x-2 font-bold ${
                  orderType === 'delivery'
                    ? 'bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white'
                    : 'bg-slate-800 border-slate-700 text-slate-300'
                }`}
              >
                <Truck className="w-4 h-4" />
                <span>Home Delivery</span>
              </button>
              <button
                type="button"
                onClick={() => setOrderType('takeaway')}
                className={`p-3 rounded-xl border flex items-center justify-center space-x-2 font-bold ${
                  orderType === 'takeaway'
                    ? 'bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white'
                    : 'bg-slate-800 border-slate-700 text-slate-300'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Store Takeaway</span>
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <label className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">Customer Details</label>
            <div>
              <input
                type="text"
                required
                placeholder="Full Name *"
                value={customerForm.name}
                onChange={(e) => setCustomerForm({ ...customerForm, name: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="tel"
                required
                placeholder="Phone Number *"
                value={customerForm.phone}
                onChange={(e) => setCustomerForm({ ...customerForm, phone: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={customerForm.email}
                onChange={(e) => setCustomerForm({ ...customerForm, email: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
              />
            </div>

            {orderType === 'delivery' && (
              <div>
                <textarea
                  required
                  rows={2}
                  placeholder="Delivery Street Address, Apartment, Suite *"
                  value={customerForm.address}
                  onChange={(e) => setCustomerForm({ ...customerForm, address: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                />
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <label className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">Payment Option</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'card', label: 'Credit Card' },
                { id: 'cash', label: 'Cash On Hand' },
                { id: 'upi', label: 'UPI / Online' }
              ].map(pm => (
                <button
                  key={pm.id}
                  type="button"
                  onClick={() => setCustomerForm({ ...customerForm, paymentMethod: pm.id })}
                  className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all ${
                    customerForm.paymentMethod === pm.id
                      ? 'bg-orange-500/20 border-orange-500 text-orange-400'
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  {pm.label}
                </button>
              ))}
            </div>
          </div>

          {/* Summary of checkout */}
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
            <div>
              <span className="text-slate-400 block">{cart.length} unique items</span>
              <span className="font-bold text-white">Domino's 30-min guarantee active</span>
            </div>
            <div className="text-right">
              <span className="text-slate-400 block text-[10px]">Grand Total</span>
              <span className="text-base font-black text-orange-400">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Place Order CTA */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmittingOrder}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 hover:opacity-95 text-white font-bold text-sm shadow-xl shadow-orange-500/25 flex items-center justify-center space-x-2 active:scale-95 transition-all disabled:opacity-50"
            >
              {isSubmittingOrder ? (
                <span>Submitting Order to Kitchen...</span>
              ) : (
                <>
                  <span>Confirm & Place Order (${total.toFixed(2)})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
