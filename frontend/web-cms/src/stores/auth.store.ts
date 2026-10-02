import { defineStore } from 'pinia'

import { getMe, login as loginService } from '../services/auth.service'

import type { AuthUserDetail, LoginPayload } from '../types/auth'

interface AuthState {
  accessToken: string | null
  user: AuthUserDetail | null
  loading: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    accessToken: localStorage.getItem('accessToken'),
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
      this.loading = true

      try {
        const response = await loginService(payload)

        this.accessToken = response.data.accessToken

        localStorage.setItem('accessToken', response.data.accessToken)

        await this.fetchMe()

        return response
      } finally {
        this.loading = false
      }
    },

    async fetchMe() {
      const response = await getMe()

      this.user = response.data

      return response
    },

    logout() {
      this.accessToken = null
      this.user = null

      localStorage.removeItem('accessToken')
    },

    hasPermission(permission: string) {
      return this.permissions.includes(permission)
    },

    hasRole(role: string) {
      return this.roles.some((item) => item.name === role)
    },
  },
})
