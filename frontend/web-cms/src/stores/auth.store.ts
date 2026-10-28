
import { defineStore } from "pinia";
import { Service } from "@/services";
import type {
  ApiAuthUser,
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

function mapApiUser(apiUser: ApiAuthUser): AuthUser {
  return {
    id: apiUser.id,
    name: apiUser.name,
    email: apiUser.email,
    isActive: apiUser.is_active,
    roles: apiUser.roles,
    permissions: apiUser.permissions.map(
      (permission) => permission.name,
    ),
  };
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

        const token = response.data.accessToken;

        this.accessToken = token;
        localStorage.setItem("accessToken", token);

        // Ambil profil terbaru dari Laravel.
        await this.fetchMe();

        return response.data;
      } catch (error) {
        this.accessToken = null;
        this.user = null;
        localStorage.removeItem("accessToken");
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchMe() {
      const response = await Service.get<MeResponse>("/auth/me");

      this.user = mapApiUser(response.data.user);

      return this.user;
    },

    async logout() {
      try {
        if (this.accessToken) {
          await Service.post("/auth/logout");
        }
      } finally {
        // Tetap bersihkan sesi lokal jika request logout gagal.
        this.accessToken = null;
        this.user = null;
        localStorage.removeItem("accessToken");
      }
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
      } catch {
        this.accessToken = null;
        this.user = null;
        localStorage.removeItem("accessToken");
        return false;
      }
    },
  },
});
