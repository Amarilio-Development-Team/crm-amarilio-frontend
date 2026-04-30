// import { cookies } from 'next/headers';
import { UserProfileData } from './types/user-profile.types';

// const API_URL = process.env.NEXT_PUBLIC_FASTAPI_URL || 'http://localhost:8000';

export async function getUserProfile(): Promise<UserProfileData> {
  await new Promise(resolve => setTimeout(resolve, 800));

  return {
    id: 'usr_01H9X',
    name: 'Carlos',
    paternalName: 'Gómez',
    maternalName: 'López',
    email: 'carlos.gomez@agenciamarketing.com',
    phoneNumber: '5512345678',
    avatarUrl: 'https://ui-avatars.com/api/?name=Carlos+Gomez&background=0D8ABC&color=fff',
    state: 'Morelos',
  };

  /*
  const cookieStore = await cookies();
  const token = cookieStore.get('authToken')?.value;

  const response = await fetch(`${API_URL}/api/v1/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    throw new Error('No se pudo obtener el perfil del usuario');
  }

  return response.json();
  */
}
