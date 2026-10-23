import React, { useState, useEffect } from 'react';
import Header from './header/Header';
import Nav from './nav/Nav';
import Main from './main/Main';
import Footer from './footer/Footer';
import CustomizerModal from './customizer/CustomizerModal';
import CartDrawer from './cart/CartDrawer';
import CheckoutModal from './checkout/CheckoutModal';
import TrackerModal from './tracker/TrackerModal';

const API_BASE = '/api';

export default function App() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filtering & Search
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);

  // Ordering mode: delivery or takeaway
  const [orderType, setOrderType] = useState('delivery');

  // Modals & Panels
  const [customizingItem, setCustomizingItem] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);

  // Cart
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('flame_dough_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Coupons
  const [couponInput, setCouponInput] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  // Tracker & Checkout state
  const [trackingQuery, setTrackingQuery] = useState('');
  const [trackedOrder, setTrackedOrder] = useState(null);
  const [trackingError, setTrackingError] = useState('');
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [, setLatestPlacedOrder] = useState(null);

  // Form
  const [customerForm, setCustomerForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
    paymentMethod: 'card'
  });

  // Save cart
  useEffect(() => {
    localStorage.setItem('flame_dough_cart', JSON.stringify(cart));
  }, [cart]);

  // Load Initial Data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [catRes, itemRes, setRes] = await Promise.all([
        fetch(`${API_BASE}/categories`),
        fetch(`${API_BASE}/items`),
        fetch(`${API_BASE}/settings`)
      ]);
      const cats = await catRes.json();
      const itms = await itemRes.json();
      const sets = await setRes.json();

      if (cats.success) setCategories(cats.data);
      if (itms.success) setItems(itms.data);
      if (sets.success) setSettings(sets.data);
    } catch (err) {
      console.error('Error fetching restaurant data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Cart Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.itemTotal, 0);
  const taxRate = settings ? settings.taxRatePercent / 100 : 0.085;
  const tax = Number((subtotal * taxRate).toFixed(2));
  const rawDeliveryFee = orderType === 'takeaway' ? 0 : (settings ? settings.deliveryFee : 3.99);
  const isFreeDeliveryQualified = subtotal >= (settings?.freeDeliveryThreshold || 45) && orderType === 'delivery';
  const deliveryFee = isFreeDeliveryQualified || appliedCoupon?.discountType === 'delivery' ? 0 : rawDeliveryFee;
  const total = Math.max(0, Number((subtotal + tax + deliveryFee - couponDiscount).toFixed(2)));
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Apply Coupon
  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;

    try {
      const res = await fetch(`${API_BASE}/coupons/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponInput.trim(), subtotal })
      });
      const data = await res.json();
      if (data.success) {
        setAppliedCoupon(data.data.coupon);
        setCouponDiscount(data.data.discount);
        setCouponError('');
      } else {
        setCouponError(data.message || 'Invalid coupon');
        setAppliedCoupon(null);
        setCouponDiscount(0);
      }
    } catch (err) {
      setCouponError('Failed to validate coupon code');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setCouponInput('');
    setCouponError('');
  };

  // Add Item with Customization
  const handleOpenCustomizer = (item) => {
    setCustomizingItem({
      ...item,
      selectedSize: item.sizes?.[0] || null,
      selectedCrust: item.crusts?.[0] || null,
      selectedAddOns: [],
      quantity: 1,
      notes: ''
    });
  };

  const calculateCustomizedPrice = (itemState) => {
    if (!itemState) return 0;
    const sizeDelta = itemState.selectedSize?.priceDelta || 0;
    const crustDelta = itemState.selectedCrust?.priceDelta || 0;
    const addOnsTotal = itemState.selectedAddOns?.reduce((sum, addOn) => sum + addOn.price, 0) || 0;
    const unitPrice = itemState.basePrice + sizeDelta + crustDelta + addOnsTotal;
    return Number((unitPrice * (itemState.quantity || 1)).toFixed(2));
  };

  const handleAddCustomizedToCart = () => {
    if (!customizingItem) return;
    const sizeDelta = customizingItem.selectedSize?.priceDelta || 0;
    const crustDelta = customizingItem.selectedCrust?.priceDelta || 0;
    const addOnsTotal = customizingItem.selectedAddOns?.reduce((sum, a) => sum + a.price, 0) || 0;
    const unitPrice = Number((customizingItem.basePrice + sizeDelta + crustDelta + addOnsTotal).toFixed(2));
    const itemTotal = Number((unitPrice * customizingItem.quantity).toFixed(2));

    const cartEntry = {
      cartItemId: `${customizingItem.id}-${Date.now()}`,
      itemId: customizingItem.id,
      name: customizingItem.name,
      image: customizingItem.image,
      size: customizingItem.selectedSize?.name || null,
      crust: customizingItem.selectedCrust?.name || null,
      addOns: customizingItem.selectedAddOns?.map(a => a.name) || [],
      quantity: customizingItem.quantity,
      unitPrice,
      itemTotal,
      notes: customizingItem.notes
    };

    setCart(prev => [...prev, cartEntry]);
    setCustomizingItem(null);
    setIsCartOpen(true);
  };

  const updateCartItemQuantity = (cartItemId, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.cartItemId === cartItemId) {
          const newQty = item.quantity + delta;
          if (newQty <= 0) return null;
          return {
            ...item,
            quantity: newQty,
            itemTotal: Number((item.unitPrice * newQty).toFixed(2))
          };
        }
        return item;
      }).filter(Boolean);
    });
  };

  // Place Order
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!cart.length) return;
    if (!customerForm.name.trim() || !customerForm.phone.trim()) {
      alert('Please provide your name and phone number');
      return;
    }
    if (orderType === 'delivery' && !customerForm.address.trim()) {
      alert('Please provide your delivery address');
      return;
    }

    try {
      setIsSubmittingOrder(true);
      const payload = {
        source: 'web',
        orderType,
        customer: {
          name: customerForm.name.trim(),
          phone: customerForm.phone.trim(),
          email: customerForm.email.trim(),
          address: orderType === 'delivery' ? customerForm.address.trim() : 'Pickup at Counter',
          tableNumber: null
        },
        items: cart,
        subtotal,
        tax,
        deliveryFee,
        discount: couponDiscount,
        couponCode: appliedCoupon?.code || null,
        total,
        paymentMethod: customerForm.paymentMethod,
        paymentStatus: 'paid',
        status: 'pending',
        staffNotes: customerForm.notes
      };

      const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success) {
        setLatestPlacedOrder(data.data);
        setCart([]);
        localStorage.removeItem('flame_dough_cart');
        setIsCheckoutOpen(false);
        setTrackedOrder(data.data);
        setIsTrackerOpen(true);
      } else {
        alert(data.message || 'Failed to place order');
      }
    } catch (err) {
      console.error('Order submission error:', err);
      alert('Unable to connect to order server. Please try again.');
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  // Live Tracker Search
  const handleSearchTracker = async (e) => {
    e?.preventDefault();
    if (!trackingQuery.trim()) return;
    setTrackingError('');

    try {
      const res = await fetch(`${API_BASE}/orders/track/${encodeURIComponent(trackingQuery.trim())}`);
      const data = await res.json();
      if (data.success && data.data && data.data.length > 0) {
        setTrackedOrder(data.data[0]);
      } else {
        setTrackingError('No orders found matching this order number or phone number.');
        setTrackedOrder(null);
      }
    } catch (err) {
      setTrackingError('Failed to lookup order tracking status.');
    }
  };

  // Poller for tracked order status
  useEffect(() => {
    if (!isTrackerOpen || !trackedOrder?.id) return;
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${API_BASE}/orders/${trackedOrder.id}`);
        const data = await res.json();
        if (data.success) {
          setTrackedOrder(data.data);
        }
      } catch (err) {
        console.error('Tracking refresh error', err);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isTrackerOpen, trackedOrder?.id]);

  // Filter Items
  const filteredItems = items.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.categoryId === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVeg = vegOnly ? item.isVeg : true;
    return matchesCategory && matchesSearch && matchesVeg;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header section (notification bar, navigation header, search, actions) */}
      <Header
        settings={settings}
        orderType={orderType}
        setOrderType={setOrderType}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        totalCartCount={totalCartCount}
        subtotal={subtotal}
        setIsTrackerOpen={setIsTrackerOpen}
        setIsCartOpen={setIsCartOpen}
        setActiveCategory={setActiveCategory}
      />

      {/* Nav section (category horizontal tabs & veg toggle) */}
      <Nav
        categories={categories}
        items={items}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        vegOnly={vegOnly}
        setVegOnly={setVegOnly}
      />

      {/* Main section (hero banner & menu items grid) */}
      <Main
        items={items}
        filteredItems={filteredItems}
        categories={categories}
        loading={loading}
        handleOpenCustomizer={handleOpenCustomizer}
        onResetFilters={() => {
          setActiveCategory('all');
          setSearchQuery('');
          setVegOnly(false);
        }}
      />

      {/* Item Customizer Modal */}
      <CustomizerModal
        customizingItem={customizingItem}
        setCustomizingItem={setCustomizingItem}
        onAddToCart={handleAddCustomizedToCart}
        calculateCustomizedPrice={calculateCustomizedPrice}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        totalCartCount={totalCartCount}
        subtotal={subtotal}
        tax={tax}
        deliveryFee={deliveryFee}
        couponDiscount={couponDiscount}
        total={total}
        updateCartItemQuantity={updateCartItemQuantity}
        couponInput={couponInput}
        setCouponInput={setCouponInput}
        appliedCoupon={appliedCoupon}
        couponError={couponError}
        handleApplyCoupon={handleApplyCoupon}
        removeCoupon={removeCoupon}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        orderType={orderType}
        setOrderType={setOrderType}
        customerForm={customerForm}
        setCustomerForm={setCustomerForm}
        handlePlaceOrder={handlePlaceOrder}
        isSubmittingOrder={isSubmittingOrder}
        cart={cart}
        total={total}
      />

      {/* Order Tracker Modal */}
      <TrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        trackingQuery={trackingQuery}
        setTrackingQuery={setTrackingQuery}
        handleSearchTracker={handleSearchTracker}
        trackingError={trackingError}
        trackedOrder={trackedOrder}
        orderType={orderType}
      />

      {/* Footer section (location, hours, admin links, copyright) */}
      <Footer settings={settings} />
    </div>
  );
}
