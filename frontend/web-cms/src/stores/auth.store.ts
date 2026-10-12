import { defineStore } from "pinia";
import { Service } from "@/services";
import type {
  AuthUser,
  LoginPayload,
  LoginResponse,
  MeResponse,
} from "@/types/auth";

interface AuthState {
  accessToken: string | null;
  user: AuthUser | null;
  loading: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    accessToken: localStorage.getItem("accessToken"),
    user: null,
    loading: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.accessToken,

    permissions: (state) => state.user?.permissions ?? [],

    roles: (state) => state.user?.roles ?? [],
  },

  actions: {
    async login(payload: LoginPayload) {
      this.loading = true;

      try {
        const response = await Service.post<LoginResponse>(
          "/auth/login",
          payload,
        );

        const token = response.data.data.accessToken;

        this.accessToken = token;

        localStorage.setItem("accessToken", token);

        await this.fetchMe();

        return response.data;
      } finally {
        this.loading = false;
      }
    },

    async fetchMe() {
      const response = await Service.get<MeResponse>("/auth/me");

      this.user = response.data.data;

      return this.user;
    },

    logout() {
      this.accessToken = null;
      this.user = null;

      localStorage.removeItem("accessToken");
    },

    hasPermission(permission: string) {
      return this.permissions.includes(permission);
    },

    hasRole(role: string) {
      return this.roles.some((item) => item.name === role);
    },

    async initializeAuth() {
      if (!this.accessToken) {
        return false;
      }

      try {
        await this.fetchMe();
        return true;
      } catch (error) {
        this.logout();
        return false;
      }
    },

  },
});