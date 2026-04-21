import { AuthUser, SignupCredentials, SignUpResponse } from './auth.types';

export interface AuthRepository {
  login(email: string, password: string): Promise<AuthUser>;
  signUp(credentials: SignupCredentials): Promise<SignUpResponse>;
}
