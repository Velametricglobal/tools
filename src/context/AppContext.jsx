import React, { createContext, useContext, useState } from 'react';
import { PRODUCTS } from '../data/products';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [products] = useState(PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Cart state initialized with 1 item for immediate interactivity
  const [cart, setCart] = useState([
    { product: PRODUCTS[0], quantity: 1 }
  ]);
  
  const [wishlist, setWishlist] = useState(['tv-102']);
  
  // Pincode & location
  const [location, setLocation] = useState({
    pincode: '700001',
    city: 'Kolkata',
    state: 'West Bengal'
  });

  // User state
  const [user, setUser] = useState({
    name: 'Rajesh Sharma',
    phone: '+91 98301 45678',
    loggedIn: true,
    coins: 350,
    gstNo: '19AAACG1234F1Z5'
  });

  // Modals & Drawers state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isVoiceSearchOpen, setIsVoiceSearchOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isBulkInquiryOpen, setIsBulkInquiryOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState({ code: 'TOOLSVILLA10', discountPercent: 10 });
  const [toasts, setToasts] = useState([]);

  // Helper toast notifier
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  // Cart operations
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.name.slice(0, 30)}..." to cart!`);
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Wishlist operation
  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to wishlist!');
        return [...prev, productId];
      }
    });
  };

  // Calculations
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const cartMSRP = cart.reduce(
    (sum, item) => sum + (item.product.originalPrice || item.product.price) * item.quantity,
    0
  );

  const totalDiscount = cartMSRP - cartSubtotal;

  const couponDiscountAmount = appliedCoupon
    ? Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100)
    : 0;

  // 18% GST estimate component included in total
  const estimatedGstCredit = Math.round((cartSubtotal * 0.18) / 1.18);

  const cartTotal = Math.max(0, cartSubtotal - couponDiscountAmount);

  return (
    <AppContext.Provider
      value={{
        products,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        wishlist,
        toggleWishlist,
        location,
        setLocation,
        user,
        setUser,
        selectedProduct,
        setSelectedProduct,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isVoiceSearchOpen,
        setIsVoiceSearchOpen,
        isLocationModalOpen,
        setIsLocationModalOpen,
        isLoginModalOpen,
        setIsLoginModalOpen,
        isBulkInquiryOpen,
        setIsBulkInquiryOpen,
        appliedCoupon,
        setAppliedCoupon,
        cartSubtotal,
        cartMSRP,
        totalDiscount,
        couponDiscountAmount,
        estimatedGstCredit,
        cartTotal,
        toasts,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
