import { ProspectRepository, Prospect } from '../domain/product-prospects.types';

export const createProspectUseCase = (repository: ProspectRepository) => {
  return async (data: Prospect): Promise<string> => {
    return await repository.createProspect(data);
  };
};
