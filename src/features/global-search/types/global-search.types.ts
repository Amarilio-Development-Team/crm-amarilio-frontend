export type UserResult = {
  id: string;
  firstName: string;
  paternalLastName: string;
  maternalLastName: string;
  email: string;
  avatarUrl?: string;
  roles: string[];
  status: string;
};

export type ClientResult = {
  id: string;
  name: string;
  rfc: string;
};

export type ProjectResult = {
  id: string;
  name: string;
  client: {
    id: string;
    name: string;
  };
};

export type SearchResult = UserResult | ClientResult | ProjectResult;
