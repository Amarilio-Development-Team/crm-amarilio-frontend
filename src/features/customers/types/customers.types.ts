type Address = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

type CustomerType = 'amarilio' | 'coorporate';

export interface CustomerInsert {
  type: CustomerType;
  name: string;
  rfc: string;
  email: string;
  phone: string;
  address: Address;
}

export interface Customer extends CustomerInsert {
  id: string;
}

export interface CustomerFound {
  id: string;
  type: CustomerType;
  name: string;
}

export interface CustomerRepository {
  searchCustomers: (query: string) => Promise<CustomerFound[]>;
  createCustomer: (customerData: CustomerInsert) => Promise<string>;
}
