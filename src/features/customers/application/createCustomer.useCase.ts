import { CustomerRepository, CustomerInsert } from '../domain/customers.types';

const standardizeCustomerData = (data: CustomerInsert): CustomerInsert => {
  return {
    ...data,
    name: data.name.trim(),
    rfc: data.rfc.toUpperCase().trim(),
    email: data.email.toLowerCase().trim(),
    phone: data.phone.trim(),
  };
};

export const createCustomerUseCase = (repository: CustomerRepository) => {
  return async (data: CustomerInsert): Promise<string> => {
    const payloadForBackend = standardizeCustomerData(data);

    return await repository.createCustomer(payloadForBackend);
  };
};
