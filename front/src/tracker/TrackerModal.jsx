import React from 'react';
import {
  Clock,
  X,
  CheckCircle2,
  ChefHat,
  Package,
  Truck,
  Sparkles
} from 'lucide-react';

const defaultTrackerStages = (orderType) => [
  { key: 'pending', label: 'Order Confirmed', icon: CheckCircle2, desc: 'Kitchen received your ticket' },
  { key: 'preparing', label: 'In the Oven & Grill', icon: ChefHat, desc: 'Crafting fresh with high heat' },
  { key: 'ready', label: 'Bake Tested & Packed', icon: Package, desc: 'Inspected and packed in hot thermal bag' },
  { key: 'out_for_delivery', label: orderType === 'delivery' ? 'Out for Delivery' : 'Ready for Counter Pickup', icon: Truck, desc: 'On the way to your doorstep' },
  { key: 'completed', label: 'Delivered & Enjoyed', icon: Sparkles, desc: 'Delivered hot and fresh' }
];

const defaultGetStageIndex = (status) => {
  switch (status) {
    case 'pending':
    case 'confirmed': return 0;
    case 'preparing': return 1;
    case 'ready': return 2;
    case 'out_for_delivery': return 3;
    case 'completed': return 4;
    default: return 0;
  }
};

export default function TrackerModal({
  isOpen,
  onClose,
  trackingQuery = '',
  setTrackingQuery,
  handleSearchTracker,
  trackingError = '',
  trackedOrder = null,
  orderType = 'delivery',
  trackerStages,
  getStageIndex = defaultGetStageIndex
}) {
  if (!isOpen) return null;

  const stages = trackerStages || defaultTrackerStages(orderType);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-orange-400" />
            <h3 className="font-bold text-sm text-white">Live Kitchen & Delivery Tracker</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tracker Query Bar */}
        <div className="p-4 bg-slate-950/60 border-b border-slate-800">
          <form onSubmit={handleSearchTracker} className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Enter Order # (e.g. 10101) or phone number"
              value={trackingQuery}
              onChange={(e) => setTrackingQuery(e.target.value)}
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 font-mono"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white font-bold text-xs shadow-md"
            >
              Track
            </button>
          </form>
          {trackingError && <p className="text-xs text-red-400 mt-2">{trackingError}</p>}
        </div>

        {/* Tracking Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {trackedOrder ? (
            <div className="space-y-6">
              {/* Order Top Summary */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Order ID</span>
                  <h4 className="text-base font-extrabold text-white">{trackedOrder.id}</h4>
                  <p className="text-xs text-slate-400">Placed for: <span className="text-slate-200">{trackedOrder.customer?.name}</span></p>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Status</span>
                  <div className="inline-block ml-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-orange-500/20 text-orange-400 border border-orange-500/40">
                    {trackedOrder.status?.replace(/_/g, ' ')}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Est. Time: ~{trackedOrder.estimatedTimeMinutes || 25} mins</p>
                </div>
              </div>

              {/* Domino's Style 5-Stage Tracker Bar */}
              <div className="space-y-4">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">Preparation & Dispatch Progress</h5>
                <div className="space-y-3">
                  {stages.map((stage, idx) => {
                    const currentStageIdx = getStageIndex(trackedOrder.status);
                    const isCompleted = idx < currentStageIdx;
                    const isCurrent = idx === currentStageIdx;
                    const StageIcon = stage.icon;

                    return (
                      <div
                        key={stage.key}
                        className={`p-3 rounded-xl border flex items-center space-x-3.5 transition-all ${
                          isCurrent
                            ? 'bg-gradient-to-r from-red-950/60 via-orange-950/60 to-slate-900 border-orange-500/80 shadow-md shadow-orange-500/10'
                            : isCompleted
                            ? 'bg-slate-950/80 border-emerald-900/60 text-slate-300'
                            : 'bg-slate-950/30 border-slate-800/50 opacity-40'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          isCurrent
                            ? 'bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white shadow-md'
                            : isCompleted
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-800 text-slate-500'
                        }`}>
                          <StageIcon className="w-4 h-4" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h6 className={`text-xs font-bold ${isCurrent ? 'text-orange-400' : isCompleted ? 'text-slate-200' : 'text-slate-500'}`}>
                              {stage.label}
                            </h6>
                            {isCurrent && (
                              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-orange-500 text-black animate-pulse">
                                In Progress
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">{stage.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Items in order */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <h6 className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">Items in Ticket</h6>
                <div className="space-y-1.5 divide-y divide-slate-800/80">
                  {trackedOrder.items?.map((it, idx) => (
                    <div key={idx} className="pt-1.5 flex justify-between text-slate-300">
                      <div>
                        <span className="font-bold text-white">{it.quantity}x</span> {it.name}
                        {it.size && <span className="text-slate-500 text-[10px] ml-1">({it.size})</span>}
                      </div>
                      <span className="font-semibold">${(it.itemTotal || it.unitPrice * it.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-white text-xs">
                  <span>Total Paid</span>
                  <span className="text-orange-400">${trackedOrder.total?.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center space-y-3">
              <Clock className="w-12 h-12 text-slate-600 mx-auto" />
              <h4 className="font-bold text-white text-sm">Enter an Order Number to Track</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                You can enter your order number (e.g. 10101) or customer phone number to see real-time stone oven and delivery updates.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
