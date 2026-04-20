import React, { ReactNode } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';

interface AuthLayoutProps {
  id: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  footerText: string;
  footerLink: string;
  footerLabel: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ id, title, subtitle, children, footerText, footerLink, footerLabel }) => {
  return (
    <div id={id} className="container mx-auto flex min-h-screen w-full max-w-[3900px] flex-col lg:flex-row">
      <section className="relative w-full pb-[80px] pt-[120px] lg:w-6/12 xl:w-5/12 2xl:w-4/12">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[40%] w-full bg-white">
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
        linear-gradient(0deg, #fbbf24, #fbbf24),
        linear-gradient(0deg, #fef3c7, #fef3c7)
      `,
              backgroundSize: '48px 48px, 48px 48px, 48px 48px, 48px 48px, 48px 48px, 48px 48px, 48px 48px, 48px 48px, 48px 48px, 48px 48px, 48px 48px, 48px 48px',
              backgroundPosition: '0px 0px, 0px 0px, 144px 0px, 336px 0px, 0px 96px, 288px 96px, 0px 288px, 96px 288px, 336px 288px, 432px 288px, 432px 96px, 384px 240px',
              backgroundRepeat: 'repeat, repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat',
              maskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)',
            }}
          ></div>
        </div>

        <div className="pointer-events-none absolute left-1/2 top-12 z-0 h-48 w-48 -translate-x-1/2 rounded-full bg-yellow-500/10 blur-[60px]"></div>

        <div className="mx-auto flex h-full w-full max-w-[450px] flex-col items-center justify-center gap-6">
          <div className="primary-color-500 z-20 rounded-xl p-2.5 shadow-[5px_5px_10px_10px_#FFC20022]">
            <Icon icon="material-symbols:login" className="size-6" />
          </div>

          <article className="relative z-20 space-y-0.5">
            <h1 className="text-strong text-center text-2xl font-medium">{title}</h1>
            <p className="text-lower text-center font-light">{subtitle}</p>
          </article>

          {children}

          <p className="text-lower mt-8 text-center text-sm font-light">
            {footerText}{' '}
            <Link href={footerLink} className="font-semibold text-primary hover:underline">
              {footerLabel}
            </Link>
          </p>
        </div>
      </section>

      <section className="min-h-full w-full lg:w-6/12 xl:w-7/12 2xl:w-8/12">
        <h2>Hello world</h2>
      </section>
    </div>
  );
};

export default AuthLayout;
