'use server';

import { cookies } from 'next/headers';
import { ApiAuthRepository } from './api.auth.repository';
import { LoginUseCase } from '../application/login.use-case';
import { SignupCredentials } from '../domain/auth.types';
import { SignupUseCase } from '../application/signup.use-case';
import { LogoutUseCase } from '../application/logout.use-case';

type ActionResponse = { error?: string; success?: boolean };

export async function loginAction(email: string, password: string): Promise<ActionResponse> {
  try {
    const repository = new ApiAuthRepository();
    const useCase = new LoginUseCase(repository);

    const user = await useCase.execute(email, password);

    (await cookies()).set('authToken', user.token, { path: '/', httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' });
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { error: errorMessage, success: false };
  }
}

export async function signUpAction(credentials: SignupCredentials): Promise<ActionResponse> {
  try {
    const repository = new ApiAuthRepository();
    const useCase = new SignupUseCase(repository);

    await useCase.execute(credentials);

    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { error: errorMessage, success: false };
  }
}

export async function logoutAction(): Promise<ActionResponse> {
  try {
    const repository = new ApiAuthRepository();
    const useCase = new LogoutUseCase(repository);
    await useCase.execute();
  } catch (error) {
    console.error('Error cerrando sesión:', error);
  }

  const cookieStore = await cookies();
  cookieStore.delete('authToken');
  cookieStore.delete('user_info');

  return { success: true };
}
