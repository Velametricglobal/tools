import { TEJAS_CATEGORIES } from '../data/tejasCategories';
import { TEJAS_PRODUCTS } from '../data/tejasProducts';

export const serviceService = {
  getCategories() {
    return TEJAS_CATEGORIES;
  },

  getAllServices() {
    return TEJAS_CATEGORIES.map((cat) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      productCount: cat.count,
      subcategories: cat.subcategories,
      icon: cat.icon
    }));
  },

  getProductsByCategory(categorySlug) {
    if (!categorySlug || categorySlug === 'all') return TEJAS_PRODUCTS;
    return TEJAS_PRODUCTS.filter((p) => p.category === categorySlug);
  },

  getProductBySlug(slugOrId) {
    return TEJAS_PRODUCTS.find((p) => p.id === slugOrId || p.subcategory.toLowerCase().includes(slugOrId.toLowerCase()));
  }
};
