import { create } from "zustand";

const LIMIT = 10;

/**
 * USERS STORE
 *
 * Caching Strategy:
 * - Cache users list based on `page + search`
 * - Avoids repeated API calls when user revisits same page/search
 *
 * Why caching is useful:
 * - Faster UI response
 * - Reduced network requests
 * - Better user experience
 */
export const useUsersStore = create((set, get) => ({
  users: [],
  total: 0,
  page: 1,
  loading: false,

  // 🔹 Cache object
  usersCache: {},

  // 🔹 Fetch users with caching
  fetchUsers: async ({ page = 1, search = "" }) => {
    const cacheKey = `users-${page}-${search}`;
    const cache = get().usersCache;

    // ✅ Use cached data if available
    if (cache[cacheKey]) {
      set({ ...cache[cacheKey], page });
      return;
    }

    set({ loading: true });

    const skip = (page - 1) * LIMIT;
    const url = search
      ? `https://dummyjson.com/users/search?q=${search}`
      : `https://dummyjson.com/users?limit=${LIMIT}&skip=${skip}`;

    const res = await fetch(url);
    const data = await res.json();

    const result = {
      users: data.users || [],
      total: data.total || 0,
      loading: false,
    };

    // 🔥 Save response to cache
    set((state) => ({
      usersCache: {
        ...state.usersCache,
        [cacheKey]: result,
      },
      ...result,
      page,
    }));
  },
}));
