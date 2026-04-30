'use server';

import { cookies } from 'next/headers';
import { Prospect } from '../types/prospects.types';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

interface ActionResponse {
  error?: string;
  success?: boolean;
  prospectId?: string;
}

export async function createProspectAction(prospectData: Prospect): Promise<ActionResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('authToken')?.value;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${API_URL}/api/prospects`, {
      method: 'POST',
      headers,
      body: JSON.stringify(prospectData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Error al crear prospecto: ${response.statusText}`;

      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData?.error || errorMessage;
      } catch {}

      throw new Error(errorMessage);
    }

    const data = await response.json();
    return { success: true, prospectId: data.id };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error al crear el prospecto';
    return { success: false, error: errorMessage };
  }
}
