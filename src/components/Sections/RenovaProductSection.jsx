import React from 'react';
import { useRenova } from '../../context/RenovaContext';
import { RenovaProductCard } from '../Product/RenovaProductCard';
import { ProductListItem } from '../Product/ProductListItem';
import { CatalogToolbar } from '../Toolbar/CatalogToolbar';
import { Wrench, ShieldAlert } from 'lucide-react';

export const RenovaProductSection = () => {
  const {
    products,
    selectedCategory,
    searchQuery,
    viewMode,
    maxPrice,
    sortBy,
    inStockOnly,
    wishlist
  } = useRenova();

  // Filter products
  let filteredProducts = products.filter((p) => {
    // 1. Wishlist category filter
    if (selectedCategory === 'wishlist') {
      if (!wishlist.includes(p.id)) return false;
    } else if (selectedCategory !== 'all') {
      // 2. Category filter
      if (p.category !== selectedCategory) return false;
    }

    // 3. Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      const matchSub = p.subcategory.toLowerCase().includes(q);
      if (!matchName && !matchCat && !matchSub) return false;
    }

    // 4. Price slider filter
    if (p.price > maxPrice) return false;

    // 5. In Stock filter
    if (inStockOnly && !p.inStock) return false;

    return true;
  });

  // Sorting logic
  filteredProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0; // default 'popular'
  });

  return (
    <section id="product-catalog" className="py-10 bg-slate-50 min-h-[600px] scroll-mt-6">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Catalog Control Toolbar */}
        <CatalogToolbar totalProductsCount={filteredProducts.length} />

        {/* Products Container */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h3 className="text-base font-extrabold text-slate-800">
              No Machinery Products Match Your Filter
            </h3>
            <p className="text-xs text-slate-500">
              Try adjusting your max price slider, search keyword, or category filter to view Tejas equipment.
            </p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <RenovaProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <ProductListItem key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
