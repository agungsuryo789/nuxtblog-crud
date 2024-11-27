import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isAuth: false,
  }),
  actions: {
    async login(username: string, password: string) {
      if (username === "" || password === "") return;

      this.isAuth = true;
    },
    logout() {
      this.user = null;
      this.isAuth = false;
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuth,
  },
});
