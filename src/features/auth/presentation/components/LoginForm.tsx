'use client';
import { Formik, Form } from 'formik';
import { useState } from 'react';
import { loginAction } from '../../application/auth.actions';
import { sileo } from 'sileo';
import { useRouter } from 'next/navigation';
import { InputField } from '@/shared/components/form-components/InputField';
import { InputFieldPassword } from '@/shared/components/form-components/InputFieldPassword';
import { LoginSchema } from '../schemas/login.schema';

export function LoginForm() {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const minLoadingTime = new Promise(resolve => setTimeout(resolve, 1500));

        const promisesExecution = Promise.all([loginAction(values.email, values.password), minLoadingTime]).then(([serverResult]) => {
          if (!serverResult.success) {
            throw new Error(serverResult.error || 'Correo o contraseña incorrectos, por favor verifique');
          }
          setIsRedirecting(true);
          return serverResult;
        });

        sileo.promise(promisesExecution, {
          loading: { title: 'Validando credenciales...' },
          success: () => {
            router.replace('/');
            return { title: '¡Bienvenido de nuevo!' };
          },
          error: err => {
            const errorMessage = err instanceof Error ? err.message : 'Ocurrió un error desconocido';
            setSubmitting(false);
            setIsRedirecting(false);
            return { title: 'Error', description: <span className="font-medium! text-red-300">{errorMessage}</span> };
          },
        });

        try {
          await promisesExecution;
        } catch (error) {
          console.log(error);
        }
      }}
    >
      {({ isSubmitting }) => {
        const isDisabled = isSubmitting || isRedirecting;

        return (
          <Form className="flex w-full flex-col gap-8">
            <div className="w-full space-y-4">
              <InputField label="Correo electrónico" name="email" type="email" placeholder="Ej. correo@ejemplo.com" />

              <InputFieldPassword label="Contraseña" name="password" type="password" isSignIn placeholder="* * * * * * * *" />
            </div>

            <button
              type="submit"
              disabled={isDisabled}
              className={`font-rns w-full rounded-[5px] px-6 py-2.5 text-center font-bold text-black shadow-xl transition-all duration-200 ${
                isDisabled ? 'cursor-not-allowed bg-gray-400 opacity-80' : 'primary-color-500 transition-all duration-200 hover:primary-color-400 hover:scale-[103%]'
              } `}
            >
              {isRedirecting ? 'Accediendo...' : isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
