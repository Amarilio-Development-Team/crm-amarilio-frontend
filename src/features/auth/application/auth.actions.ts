'use server';

import { cookies } from 'next/headers';
import { login, signUp } from '../infrastructure/auth.api';
import { SignupCredentials, ActionResponse } from './auth.types';

export async function loginAction(email: string, password: string): Promise<ActionResponse> {
  try {
    if (!email || !password) {
      return { success: false, error: 'El email y la contraseña son obligatorios' };
    }

    const user = await login(email, password);

    (await cookies()).set('authToken', user.token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error desconocido';
    return { success: false, error: `Ups, algo salió mal: ${errorMessage}` };
  }
}

export async function signUpAction(credentials: SignupCredentials): Promise<ActionResponse> {
  try {
    const { firstName, paternalLastName, maternalLastName, email, password, roles } = credentials;

    if (!firstName || !paternalLastName || !maternalLastName || !email || !password || !roles.length) {
      return { success: false, error: 'Todos los campos son obligatorios' };
    }

    await signUp(credentials);

    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error desconocido';
    return { success: false, error: `Ups, algo salió mal: ${errorMessage}` };
  }
}

export async function logoutAction(): Promise<ActionResponse> {
  const cookieStore = await cookies();
  cookieStore.delete('authToken');
  cookieStore.delete('user_info');

  return { success: true };
}
