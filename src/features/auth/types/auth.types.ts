export type UserRole = 'designer' | 'writer' | 'marketing' | 'seo' | 'developer' | 'sales' | 'manager' | 'pm' | 'operador_digital' | 'creador_contenido';
export type UserStatus = 'active' | 'inactive' | 'banned';

export interface SignupCredentials {
  firstName: string;
  paternalLastName: string;
  maternalLastName: string;
  email: string;
  password: string;
  avatarUrl?: string;
  roles: UserRole[];
}

export interface User {
  id: string;
  firstName: string;
  paternalLastName: string;
  email: string;
  avatarUrl?: string;
  roles: UserRole[];
  status: UserStatus;
}

export interface AuthUser extends User {
  token: string;
}

export interface SignUpResponse {
  success: boolean;
  newUserId: string;
}

export type ActionResponse = {
  error?: string;
  success?: boolean;
};
