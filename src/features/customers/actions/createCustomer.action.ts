'use server';

import { createCustomersApiRepository } from '../infrastructure/customer.api.repository';
import { createCustomerUseCase } from '../application/createCustomer.useCase';
import { CustomerInsert } from '../domain/customers.types';

interface ActionResponse {
  error?: string;
  success?: boolean;
  customerId?: string;
}

export async function createCustomerAction(customerData: CustomerInsert): Promise<ActionResponse> {
  try {
    const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;
    const repository = createCustomersApiRepository(endpoint);
    const createCustomer = createCustomerUseCase(repository);

    const customerId = await createCustomer(customerData);

    return { success: true, customerId };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error al crear el cliente';
    return { error: errorMessage, success: false };
  }
}
