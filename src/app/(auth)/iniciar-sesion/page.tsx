import React from 'react';
import AuthLayout from '@/features/auth/components/ui/LoginLayout';
import { LoginForm } from '@/features/auth/components/forms/LoginForm';

const InicioSesionPage: React.FC = () => {
  return (
    <AuthLayout
      id="inicio-sesion"
      title="¡Bienvenido de nuevo!"
      subtitle="Inicia sesión en tu cuenta con tus credenciales para poder continuar"
      footerText="¿No tienes una cuenta?"
      footerLink="/registro-usuario"
      footerLabel="Ponte en contacto con nosotros"
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default InicioSesionPage;
