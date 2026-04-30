'use server';

import { ActionResponse, SignupCredentials } from '../types/auth.types';

const API_URL = process.env.NEXT_PUBLIC_FASTAPI_URL || 'http://localhost:8000';

export async function signUpAction(credentials: SignupCredentials): Promise<ActionResponse> {
  try {
    const { firstName, paternalLastName, maternalLastName, email, password, roles } = credentials;

    if (!firstName || !paternalLastName || !maternalLastName || !email || !password || !roles?.length) {
      return { success: false, error: 'Todos los campos son obligatorios' };
    }

    const response = await fetch(`${API_URL}/api/v1/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || errorData.detail || 'Ups, algo salió mal en el registro');
    }

    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error desconocido';
    return { success: false, error: `Ups, algo salió mal: ${errorMessage}` };
  }
}
