import { SignupCredentials, SignUpResponse } from '../domain/auth.types';
import { AuthRepository } from '../domain/auth.repository';

export class SignupUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(credentials: SignupCredentials): Promise<SignUpResponse> {
    try {
      const { firstName, paternalLastName, maternalLastName, email, password, roles } = credentials;

      if (!firstName || !paternalLastName || !maternalLastName || !email || !password || !roles.length) throw new Error('Todos los campos son obligatorios');
      const newUser = await this.authRepository.signUp(credentials);

      return newUser;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error';
      throw new Error(`Ups, algo salió mal: ${errorMessage}`);
    }
  }
}
