import { ApiGlobalSearchRepository } from './api.global-search.repository';
import { GlobalSearchUseCase } from '../application/search.use-case';
import { SearchResult } from '../domain/global-search.types';

type ActionResponse = { error?: string; results?: SearchResult[]; success?: boolean };

export async function globalSearchAction(query: string): Promise<ActionResponse> {
  try {
    const repository = new ApiGlobalSearchRepository();
    const useCase = new GlobalSearchUseCase(repository);

    const results = await useCase.execute(query);
    return { results, success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { error: errorMessage, success: false };
  }
}
