'use server';

import { cookies } from 'next/headers';
import { ActionResponse } from '../types/auth.types';

export async function logoutAction(): Promise<ActionResponse> {
  const cookieStore = await cookies();
  cookieStore.delete('authToken');
  cookieStore.delete('user_info');

  return { success: true };
}
