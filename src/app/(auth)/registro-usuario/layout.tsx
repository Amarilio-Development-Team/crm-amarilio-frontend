import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CRM Amarilio | Registro de usuario',
  description: 'Regístrate en CRM Amarilio para gestionar tus actividades',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
