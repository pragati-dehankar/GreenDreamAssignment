import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  loading: false,

  // set user after login
  setAuth: (user, token) =>
    set({
      user,
      token,
      loading: false,
    }),

  // clear auth on logout
  logout: () =>
    set({
      user: null,
      token: null,
    }),
}));
