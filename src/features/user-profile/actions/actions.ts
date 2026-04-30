'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function updatePhoneAction(phoneNumber: string) {
  try {
    const token = (await cookies()).get('authToken')?.value;

    const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/api/v1/users/me/phone`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({ phone: phoneNumber }),
    });

    if (!response.ok) throw new Error('No se pudo actualizar el teléfono');

    revalidatePath('/mi-perfil');

    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return { success: false, error: errorMessage };
  }
}
