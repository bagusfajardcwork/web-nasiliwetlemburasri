import api from './api'

import type { LoginPayload, LoginResponse, MeResponse } from '../types/auth'

export async function login(payload: LoginPayload) {
  const response = await api.post<LoginResponse>('/auth/login', payload)

  return response.data
}

export async function getMe() {
  const response = await api.get<MeResponse>('/auth/me')

  return response.data
}
