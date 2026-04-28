import { createProspectApiRepository } from '../infrastructure/prospect.api.repository';
import { createProspectUseCase } from '../application/createProspect.useCase';
import { Prospect } from '../domain/product-prospects.types';

interface ActionResponse {
  error?: string;
  success?: boolean;
  prospectId?: string;
}

export async function createProspectAction(prospectData: Prospect): Promise<ActionResponse> {
  try {
    const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;
    const repository = createProspectApiRepository(endpoint);
    const createProspect = createProspectUseCase(repository);

    const prospectId = await createProspect(prospectData);

    return { success: true, prospectId };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error al crear el prospecto';
    return { error: errorMessage, success: false };
  }
}
