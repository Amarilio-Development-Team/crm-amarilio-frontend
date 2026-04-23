import { AuthRepository } from '../domain/auth.repository';
import { AuthUser, SignupCredentials, SignUpResponse } from '../domain/auth.types';

export class ApiAuthRepository implements AuthRepository {
  async login(email: string, password: string): Promise<AuthUser> {
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    // Mocked response
    // const response = {
    //   ok: true,
    //   json: async () => ({
    //     token: 'mocked-jwt-token',
    //     user: {
    //       id: '123',
    //       name: 'John Doe',
    //       email,
    //       avatarUrl: 'https://example.com/avatar.jpg',
    //       roles: ['admin'],
    //       status: 'active',
    //     },
    //     message: 'Login successful',
    //   }),
    // };

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Ups, algo salió mal');
    }

    const data = await response.json();

    return {
      id: data.user.id,
      firstName: data.user.name,
      paternalLastName: data.user.paternalLastName,
      email: data.user.email,
      avatarUrl: data.user.avatarUrl,
      roles: data.user.roles,
      status: data.user.status,
      token: data.token,
    };
  }

  async signUp(credentials: SignupCredentials): Promise<SignUpResponse> {
    const response = await fetch('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Ups, algo salió mal');
    }

    const data = await response.json();

    return {
      success: true,
      newUserId: data.user.id,
    };
  }

  async logout(): Promise<void> {}
}
