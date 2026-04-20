import { AuthRepository } from '../domain/auth.repository';
import { AuthUser } from '../domain/auth.types';

export class LoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(email: string, password: string): Promise<AuthUser> {
    try {
      if (!email || !password) throw new Error('El email y la contraseña son obligatorios');

      const user = await this.authRepository.login(email, password);

      if (!user) throw new Error('Correo o contraseña incorrectos, por favor inténtalo de nuevo');

      if (user.status !== 'active') throw new Error('Tu cuenta no está activa, por favor contacta al soporte');

      return user;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      throw new Error(`Ups, algo salió mal: ${errorMessage}`);
    }
  }
}
