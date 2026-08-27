import React, { createContext, useContext, useState } from 'react';
import { TEJAS_PRODUCTS } from '../data/tejasProducts';
import { TEJAS_CATEGORIES } from '../data/tejasCategories';
import { brandService } from '../services/brandService';

export const RenovaContext = createContext();

export const RenovaProvider = ({ children }) => {
  const [products, setProducts] = useState(TEJAS_PRODUCTS);
  const [categories, setCategories] = useState(TEJAS_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Branding State (Single Source of Truth)
  const [branding, setBranding] = useState({
    companyProfile: brandService.getCompanyProfile(),
    brandTokens: brandService.getBrandTokens(),
    logos: brandService.getLogos()
  });

  const updateGlobalBranding = (newBranding) => {
    setBranding((prev) => ({ ...prev, ...newBranding }));
    showToast('Applied updated Branding Kit across whole system!');
  };

  // Mobile Drawer State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  // View Mode: 'grid' | 'list'
  const [viewMode, setViewMode] = useState('grid');

  // Product Comparison (Max 3)
  const [compareList, setCompareList] = useState(['tejas-101', 'tejas-105']);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Filters & Sorting
  const [maxPrice, setMaxPrice] = useState(300000);
  const [sortBy, setSortBy] = useState('popular');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Request for Quotation (RFQ) Cart State initialized with 1 item
  const [rfqCart, setRfqCart] = useState([
    { product: TEJAS_PRODUCTS[0], quantity: 1, customNotes: 'Apple Grading and Sorting Line' }
  ]);

  const [wishlist, setWishlist] = useState(['tejas-104', 'tejas-601']);

  // Modals & Overlays state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isRFQDrawerOpen, setIsRFQDrawerOpen] = useState(false);
  const [isQuickQuoteOpen, setIsQuickQuoteOpen] = useState(false);

  // User state
  const [user, setUser] = useState({
    name: 'Tejas Industry Buyer',
    phone: '+91 98765 43210',
    company: 'Tejas Food Processing Unit',
    city: 'Dehradun, Uttarakhand',
    gstin: '05AAACT1234F1Z9'
  });

  const [toasts, setToasts] = useState([]);

  // Toast Helper
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  // Add Product Category
  const addCategory = (categoryObj) => {
    setCategories((prev) => [...prev, categoryObj]);
    showToast(`Added new category "${categoryObj.name}"!`);
  };

  // Add Product
  const addProduct = (productObj) => {
    setProducts((prev) => [productObj, ...prev]);
    setCategories((prev) =>
      prev.map((c) => (c.id === productObj.category ? { ...c, count: c.count + 1 } : c))
    );
    showToast(`Added new product "${productObj.name}"!`);
  };

  // Delete Product
  const deleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Product removed from catalog', 'info');
  };

  // Compare Toggle
  const toggleCompare = (productId) => {
    setCompareList((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed machine from comparison matrix', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        if (prev.length >= 3) {
          showToast('Comparison limit reached! Max 3 machines can be compared.', 'error');
          return prev;
        }
        showToast('Added machine to side-by-side comparison!');
        return [...prev, productId];
      }
    });
  };

  const clearCompare = () => {
    setCompareList([]);
    showToast('Comparison list cleared', 'info');
  };

  // RFQ Cart Methods
  const addToRFQ = (product, quantity = 1, customNotes = '') => {
    setRfqCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity, customNotes: customNotes || item.customNotes }
            : item
        );
      }
      return [...prev, { product, quantity, customNotes }];
    });
    showToast(`Added "${product.name.slice(0, 30)}..." to RFQ Quote List!`);
  };

  const removeFromRFQ = (productId) => {
    setRfqCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from quotation list', 'info');
  };

  const updateRFQQuantity = (productId, delta) => {
    setRfqCart((prev) =>
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

  // Wishlist toggle
  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from saved items', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added to saved machines!');
        return [...prev, productId];
      }
    });
  };

  const rfqSubtotal = rfqCart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <RenovaContext.Provider
      value={{
        products,
        categories,
        branding,
        updateGlobalBranding,
        addProduct,
        addCategory,
        deleteProduct,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        isMobileSearchOpen,
        setIsMobileSearchOpen,
        viewMode,
        setViewMode,
        compareList,
        toggleCompare,
        clearCompare,
        isCompareOpen,
        setIsCompareOpen,
        maxPrice,
        setMaxPrice,
        sortBy,
        setSortBy,
        inStockOnly,
        setInStockOnly,
        rfqCart,
        addToRFQ,
        removeFromRFQ,
        updateRFQQuantity,
        wishlist,
        toggleWishlist,
        selectedProduct,
        setSelectedProduct,
        isRFQDrawerOpen,
        setIsRFQDrawerOpen,
        isQuickQuoteOpen,
        setIsQuickQuoteOpen,
        user,
        setUser,
        rfqSubtotal,
        toasts,
        showToast
      }}
    >
      {children}
    </RenovaContext.Provider>
  );
};

export const useRenova = () => useContext(RenovaContext);
