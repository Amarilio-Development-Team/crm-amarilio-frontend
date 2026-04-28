import { CustomerRepository, CustomerFound, CustomerInsert } from '../domain/customers.types';

export const createCustomersApiRepository = (baseUrl: string, token?: string): CustomerRepository => {
  const getHeaders = () => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  };

  const searchCustomers = async (query: string): Promise<CustomerFound[]> => {
    const response = await fetch(`${baseUrl}/customers/search?q=${encodeURIComponent(query)}`, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Error del servidor: ${response.statusText}`;
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData?.error || errorMessage;
      } catch {}
      throw new Error(errorMessage);
    }

    return await response.json();
  };

  const createCustomer = async (customerData: CustomerInsert): Promise<string> => {
    const response = await fetch(`${baseUrl}/customers`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(customerData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Error al crear cliente: ${response.statusText}`;
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
    searchCustomers,
    createCustomer,
  };
};
