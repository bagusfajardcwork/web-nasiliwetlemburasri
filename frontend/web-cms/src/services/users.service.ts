import api from './api'

export interface User {
  id: number
  name: string
  email: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  roles: {
    id: number
    name: string
  }[]
}

export interface GetUsersParams {
  page?: number
  perPage?: number
  search?: string
  isActive?: string
  role?: string
}

export interface GetUsersResponse {
  success: boolean
  message: string
  data: User[]
  pagination: {
    page: number
    perPage: number
    total: number
    totalPages: number
  }
}

export async function getUsers(params?: GetUsersParams) {
  const response = await api.get<GetUsersResponse>('/users', {
    params,
  })

  return response.data
}
