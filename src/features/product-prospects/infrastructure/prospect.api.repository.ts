import { ProspectRepository, Prospect } from '../domain/product-prospects.types';

export const createProspectApiRepository = (baseUrl: string, token?: string): ProspectRepository => {
  const getHeaders = () => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  };

  const createProspect = async (proposalData: Prospect): Promise<string> => {
    const response = await fetch(`${baseUrl}/prospects`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(proposalData),
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
    return data.id;
  };

  return {
    createProspect,
  };
};
