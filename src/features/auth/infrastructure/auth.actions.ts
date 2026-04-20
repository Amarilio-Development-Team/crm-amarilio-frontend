'use server';

import { cookies } from 'next/headers';
import { ApiAuthRepository } from './api.auth.repository';
import { LoginUseCase } from '../application/login.use-case';

type LoginActionResult = { error?: string; success?: boolean };
export async function loginAction(email: string, password: string): Promise<LoginActionResult> {
  try {
    const repository = new ApiAuthRepository();
    const useCase = new LoginUseCase(repository);

    const user = await useCase.execute(email, password);

    (await cookies()).set('authToken', user.token, { path: '/', httpOnly: true, secure: true, sameSite: 'lax' });
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { error: errorMessage, success: false };
  }
}
