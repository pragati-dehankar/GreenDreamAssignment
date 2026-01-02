import { create } from "zustand";

const LIMIT = 10;

/**
 * PRODUCTS STORE
 *
 * Caching Strategy:
 * - Cache product lists based on `page + search + category`
 * - Prevents refetching data when filters are reused
 *
 * Why caching is useful:
 * - Improves performance
 * - Reduces API load
 * - Faster navigation between pages
 */
export const useProductsStore = create((set, get) => ({
  products: [],
  categories: [],
  total: 0,
  page: 1,
  loading: false,

  // 🔹 Cache object
  productsCache: {},

  // 🔹 Fetch categories (no caching needed – small static list)
  fetchCategories: async () => {
    if (get().categories.length) return;

    const res = await fetch("https://dummyjson.com/products/categories");
    const data = await res.json();
    set({ categories: data || [] });
  },

  // 🔹 Fetch products with caching
  fetchProducts: async ({ page = 1, search = "", category = "" }) => {
    const cacheKey = `products-${page}-${search}-${category}`;
    const cache = get().productsCache;

    // ✅ Use cached data if available
    if (cache[cacheKey]) {
      set({ ...cache[cacheKey], page });
      return;
    }

    set({ loading: true });

    const skip = (page - 1) * LIMIT;
    let url = `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`;

    if (search) url = `https://dummyjson.com/products/search?q=${search}`;
    if (category) url = `https://dummyjson.com/products/category/${category}`;

    const res = await fetch(url);
    const data = await res.json();

    const result = {
      products: data.products || [],
      total: data.total || 0,
      loading: false,
    };

    // 🔥 Save response to cache
    set((state) => ({
      productsCache: {
        ...state.productsCache,
        [cacheKey]: result,
      },
      ...result,
      page,
    }));
  },
}));
