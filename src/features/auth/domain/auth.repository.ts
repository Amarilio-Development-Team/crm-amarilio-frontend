import { AuthUser } from './auth.types';

export interface AuthRepository {
  login(email: string, password: string): Promise<AuthUser>;
  //   signUp(name: string, email: string, password: string): Promise<AuthUser>;
  //   logout(): Promise<void>;
  //   getCurrentUser(): Promise<AuthUser | null>;
}
