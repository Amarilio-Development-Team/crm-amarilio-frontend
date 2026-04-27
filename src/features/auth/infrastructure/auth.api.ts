import { AuthUser, SignupCredentials, SignUpResponse } from '../application/auth.types';

const API_URL = process.env.NEXT_PUBLIC_FASTAPI_URL || 'http://localhost:8000';

export const login = async (email: string, password: string): Promise<AuthUser> => {
  const response = await fetch(`${API_URL}/api/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || errorData.detail || 'Ups, algo salió mal al iniciar sesión');
  }

  const data = await response.json();

  return {
    id: data.user.id,
    firstName: data.user.name,
    paternalLastName: data.user.paternalLastName,
    email: data.user.email,
    avatarUrl: data.user.avatarUrl,
    roles: data.user.roles,
    status: data.user.status,
    token: data.token,
  };
};

export const signUp = async (credentials: SignupCredentials): Promise<SignUpResponse> => {
  const response = await fetch(`${API_URL}/api/v1/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || errorData.detail || 'Ups, algo salió mal en el registro');
  }

  const data = await response.json();

  return {
    success: true,
    newUserId: data.user.id,
  };
};
