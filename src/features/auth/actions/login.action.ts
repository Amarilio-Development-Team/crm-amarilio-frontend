'use server';

import { ActionResponse } from '../types/auth.types';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_FASTAPI_URL || 'http://localhost:8000';

export async function loginAction(email: string, password: string): Promise<ActionResponse> {
  try {
    if (!email || !password) {
      return { success: false, error: 'El email y la contraseña son obligatorios' };
    }

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

    const cookieStore = await cookies();
    cookieStore.set('authToken', data.token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    cookieStore.set(
      'user_info',
      JSON.stringify({
        id: data.user.id,
        firstName: data.user.name,
        roles: data.user.roles,
      }),
      { path: '/' }
    );

    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error desconocido';
    return { success: false, error: `Ups, algo salió mal: ${errorMessage}` };
  }
}
