import React from 'react';
import { Icon } from '@iconify/react';
import { SignupForm } from '@/features/auth/presentation/components/SignupForm';

const RegistroUsuarioPage: React.FC = () => {
  return (
    <section id="registro-usuario" className="container flex min-h-screen w-full max-w-[600px] flex-col py-8 xl:max-w-[1600px]">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[20%] w-full bg-white">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
        linear-gradient(to right, #f1f5f9 1px, transparent 1px), 
        linear-gradient(to bottom, #f1f5f9 1px, transparent 1px),         
        linear-gradient(0deg, #fbbf24, #fbbf24), 
        linear-gradient(0deg, #fef3c7, #fef3c7), 
        linear-gradient(0deg, #fef3c7, #fef3c7), 
        linear-gradient(0deg, #fde047, #fde047), 
        linear-gradient(0deg, #fde047, #fde047), 
        linear-gradient(0deg, #fde047, #fde047), 
        linear-gradient(0deg, #fef3c7, #fef3c7), 
        linear-gradient(0deg, #fbbf24, #fbbf24),
        linear-gradient(0deg, #fef3c7, #fef3c7),
        linear-gradient(0deg, #fbbf24, #fbbf24),
        linear-gradient(0deg, #fef3c7, #fef3c7),
        linear-gradient(0deg, #fde047, #fde047) 
      `,
            backgroundSize: '48px 48px, 48px 48px, 48px 48px, 48px 48px, 48px 48px, 48px 48px, 48px 48px, 48px 48px, 48px 48px, 48px 48px, 48px 48px, 48px 48px, 48px 48px, 48px 48px',
            backgroundPosition: '0px 0px, 0px 0px, 144px 0px, 336px 0px, 0px 96px, 288px 96px, 0px 288px, 96px 288px, 336px 288px, 432px 288px, 528px 48px, 672px 96px, 480px 192px, 576px 288px',
            backgroundRepeat: 'repeat, repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat',
            maskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)',
          }}
        ></div>
      </div>

      <div className="pointer-events-none absolute left-1/2 top-12 z-0 h-48 w-48 -translate-x-1/2 rounded-full bg-yellow-500/10 blur-[60px]"></div>

      <div className="mx-auto flex h-full w-full max-w-[1200px] flex-col items-center justify-center gap-6">
        <div className="primary-color-500 z-20 rounded-xl p-2.5 shadow-[5px_5px_10px_10px_#FFC20022]">
          <Icon icon="material-symbols:login" className="size-6" />
        </div>

        <article className="relative z-20 space-y-0.5">
          <h1 className="text-strong text-center text-2xl font-semibold">Registro de Usuario</h1>
          <p className="text-lower text-center font-light">Ingresa la información solicitada para crear la cuenta.</p>
        </article>

        <SignupForm />
      </div>
    </section>
  );
};

export default RegistroUsuarioPage;
