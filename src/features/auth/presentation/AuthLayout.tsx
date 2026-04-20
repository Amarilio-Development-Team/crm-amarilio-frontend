import React, { ReactNode } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { PM_IMAGE, MANAGER_IMAGE, SALESPERSON_IMAGE, DEVELOPER_IMAGE, DESIGNER_IMAGE, WRITER_IMAGE, MARKETING_IMAGE } from '@/assets/auth/index';
import AMARILIO_LOGO from '@/assets/amarilio.svg';
import Image from 'next/image';

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
    <div id={id} className="container mx-auto flex min-h-screen w-full max-w-[3900px] flex-col py-8 lg:flex-row">
      <section className="relative w-full pb-[80px] pt-[120px] lg:w-6/12">
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

        <div className="mx-auto flex h-full w-full max-w-[450px] flex-col items-center justify-center gap-6">
          <div className="primary-color-500 z-20 rounded-xl p-2.5 shadow-[5px_5px_10px_10px_#FFC20022]">
            <Icon icon="material-symbols:login" className="size-6" />
          </div>

          <article className="relative z-20 space-y-0.5">
            <h1 className="text-strong text-center text-2xl font-semibold">{title}</h1>
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

      <section className="relative hidden min-h-[700px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-white sm:flex lg:w-6/12 [[data-theme=black]_&]:bg-transparent">
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,#FFDE4Bcc_0%,#FFEA8566_40%,#FFFDEA_70%)] [[data-theme=black]_&]:bg-[radial-gradient(circle_at_center,#FFDE4B4d_0%,transparent_100%)]"></div>

        <div className="relative z-20 mb-12 text-center">
          <h2 className="text-2xl font-bold">
            Gestión <span className="text-yellow-600 [[data-theme=black]_&]:text-yellow-400">Estratégica</span>
          </h2>
        </div>

        <div className="relative z-10 flex aspect-square w-full max-w-[400px] items-center justify-center">
          <div className="absolute h-full w-full rounded-full border border-yellow-500/20">
            <div className="absolute left-1/2 top-0 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white p-2 shadow-lg">
              <Image src={DESIGNER_IMAGE} alt="Diseñadores" title="Diseñadores" className="object-contain" />
            </div>

            <div className="absolute bottom-[15%] right-[5%] flex h-14 w-14 translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-white p-1 shadow-lg">
              <Image src={WRITER_IMAGE} alt="Contenido" title="Escritores y creadores de contenido" className="object-contain" />
            </div>

            <div className="absolute left-[5%] top-[25%] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white p-1 shadow-lg">
              <Image src={MARKETING_IMAGE} alt="SEO y Marketing" title="SEO y Marketing Digital" className="object-contain" />
            </div>
          </div>

          <div className="absolute h-[70%] w-[70%] rounded-full border border-yellow-500/30">
            <div className="absolute bottom-[15%] left-[5%] flex h-14 w-14 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-white p-1 shadow-lg">
              <Image src={DEVELOPER_IMAGE} alt="Desarrollador" title="Desarrolladores y equipo técnico" className="object-contain" />
            </div>

            <div className="absolute right-[-5%] top-[40%] flex h-14 w-14 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-white p-1 shadow-lg">
              <Image src={SALESPERSON_IMAGE} alt="Implementador/vendedor" title="Implementadores y vendedores" className="object-contain" />
            </div>
          </div>

          <div className="absolute h-[40%] w-[40%] rounded-full border border-yellow-500/40">
            <div className="absolute bottom-[-10%] left-[40%] flex h-14 w-14 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-white p-1 shadow-lg">
              <Image src={MANAGER_IMAGE} alt="Gerente (imagen)" title="Gerentes" className="object-contain" />
            </div>

            <div className="absolute left-[20%] top-0 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white p-1 shadow-lg">
              <Image src={PM_IMAGE} alt="Product Manager" title="Product Managers" className="object-contain" />
            </div>
          </div>

          <div className="relative z-20 flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-white/70 p-1 shadow-[0_0_50px_rgba(234,179,8,0.6)] [[data-theme=black]_&]:border-gray-900">
            <Image src={AMARILIO_LOGO} alt="Amarilio Logo" title="Amarilio" className="object-scale-down" />
          </div>
        </div>

        <div className="relative z-20 mt-16 max-w-sm px-4 text-center">
          <p className="text-sm text-gray-600 [[data-theme=black]_&]:text-gray-400">
            Gestión interna: <strong className="">Proyectos, Clientes, Operaciones y Desarrollos.</strong> Todo en una plataforma
          </p>
        </div>
      </section>
    </div>
  );
};

export default AuthLayout;
