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
    <div id={id} className="flex min-h-screen w-full max-w-[3900px] flex-col lg:flex-row">
      <section className="container w-full pb-[80px] pt-[120px] lg:w-6/12 xl:w-5/12 2xl:w-4/12">
        <div className="mx-auto flex h-full w-full max-w-[450px] flex-col items-center justify-center gap-6">
          <div className="primary-color-500 rounded-xl p-2.5 shadow-xl">
            <Icon icon="material-symbols:login" className="size-6" />
          </div>

          <article className="space-y-0.5">
            <h1 className="text-strong text-center text-2xl font-medium">{title}</h1>
            <p className="text-lower text-center font-light">{subtitle}</p>
          </article>

          {children}

          <p className="text-lower text-center font-light">
            {footerText}{' '}
            <Link href={footerLink} className="font-medium text-primary hover:underline">
              {footerLabel}
            </Link>
          </p>
        </div>
      </section>

      <section className="container min-h-full w-full lg:w-6/12 xl:w-7/12 2xl:w-8/12">
        <h2>Hello world</h2>
      </section>
    </div>
  );
};

export default AuthLayout;
