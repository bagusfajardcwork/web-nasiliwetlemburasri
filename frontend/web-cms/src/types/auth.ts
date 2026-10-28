
export interface AuthRole {
  id: number;
  name: string;
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
  roles: AuthRole[];
  permissions: string[];
}

// Format user yang dikembalikan API Laravel.
export interface ApiAuthUser {
  id: number;
  name: string;
  email: string;
  is_active: boolean;
  roles: AuthRole[];
  permissions: {
    id: number;
    name: string;
  }[];
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  accessToken: string;
  token_type: string;
  user: ApiAuthUser;
}

export interface MeResponse {
  user: ApiAuthUser;
}
