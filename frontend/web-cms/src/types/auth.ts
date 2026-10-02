export interface AuthUser {
  id: number
  name: string
  email: string
  role: string | null
}

export interface AuthRole {
  id: number
  name: string
}

export interface AuthUserDetail {
  id: number
  name: string
  email: string
  isActive: boolean
  roles: AuthRole[]
  permissions: string[]
}

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  success: boolean
  message: string
  data: {
    user: AuthUser
    accessToken: string
  }
}

export interface MeResponse {
  success: boolean
  message: string
  data: AuthUserDetail
}
