import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CRM Amarilio | Inicio de sesión',
  description: 'Inicia sesión en tu cuenta de CRM Amarilio para gestionar tus actividades',
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
