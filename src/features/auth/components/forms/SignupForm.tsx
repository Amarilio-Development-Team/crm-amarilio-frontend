'use client';

import { Formik, Form } from 'formik';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { sileo } from 'sileo';
import { signUpAction } from '../../actions/signup.action';
import { UserRole } from '../../types/auth.types';
import { SIGNUP_ROLE_OPTIONS } from '../../constants/signup.constants';
import { SignupModel } from '../../models/signup.model';
import { InputField } from '@/shared/components/form-components/InputField';
import { InputFieldPassword } from '@/shared/components/form-components/InputFieldPassword';
import { OptionSelector } from '@/shared/components/form-components/OptionSelector';
import usePasswordGenerator from '@/shared/hooks/usePasswordGenerator';
import useClipboard from '@/shared/hooks/useClipboard';
import { FlipCard } from '../ui/FlipCard';

interface SignupFormValues {
  firstName: string;
  paternalLastName: string;
  maternalLastName: string;
  email: string;
  password: string;
  roles: UserRole[];
}

export function SignupForm() {
  const [isRedirecting, setIsRedirecting] = useState(false);

  const { generatePassword } = usePasswordGenerator();
  const { copy } = useClipboard();

  return (
    <Formik<SignupFormValues>
      initialValues={{
        firstName: '',
        paternalLastName: '',
        maternalLastName: '',
        email: '',
        password: '',
        roles: [],
      }}
      validationSchema={SignupModel}
      onSubmit={async (values, { setSubmitting }) => {
        const minLoadingTime = new Promise(resolve => setTimeout(resolve, 2500));
        const payload = { ...values };
        const promisesExecution = Promise.all([signUpAction(payload), minLoadingTime]).then(([serverResult]) => {
          if (!serverResult.success) {
            throw new Error(serverResult.error || 'Error al registrar usuario');
          }
          setIsRedirecting(true);
          return serverResult;
        });

        sileo.promise(promisesExecution, {
          loading: { title: 'Registrando nuevo usuario...' },
          success: () => ({ title: 'Usuario registrado exitosamente' }),
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
      {({ isSubmitting, setFieldValue }) => {
        const isDisabled = isSubmitting || isRedirecting;

        const handleGenerateSecurePassword = () => {
          const newPass = generatePassword({ length: 16 });
          setFieldValue('password', newPass);
          copy(newPass);
        };

        return (
          <Form className="mt-6 flex w-full flex-col gap-8">
            <section className="flex flex-col gap-4 xl:relative xl:flex-row xl:gap-10">
              <div className="h-max w-full space-y-4 xl:sticky xl:top-10">
                <InputField label="Nombre" name="firstName" type="text" placeholder="Ej. Juan" />
                <InputField label="Apellido Paterno" name="paternalLastName" type="text" placeholder="Ej. Pérez" />
                <InputField label="Apellido Materno" name="maternalLastName" type="text" placeholder="Ej. Gómez" />
                <InputField label="Correo electrónico" name="email" type="email" placeholder="Ej. correo@amarilio.com" />

                <div className="space-y-2">
                  <InputFieldPassword label="Contraseña" name="password" type="password" placeholder="* * * * * * * *" />

                  <button type="button" onClick={handleGenerateSecurePassword} className="flex items-center gap-1 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700">
                    <Icon icon="tabler:lock" className="size-4" />
                    Generar contraseña
                  </button>
                </div>
              </div>

              <OptionSelector name="role" options={SIGNUP_ROLE_OPTIONS} maxSelections={3} multiple label="Selecciona el perfil profesional" renderOption={props => <FlipCard {...props} />} />
            </section>

            <button
              type="submit"
              disabled={isDisabled}
              className={`font-rns mt-6 w-full rounded-[5px] px-10 py-2.5 text-center font-bold text-black shadow-xl transition-all duration-200 xl:mx-auto xl:w-max ${
                isDisabled ? 'cursor-not-allowed bg-gray-400 opacity-80' : 'primary-color-500 transition-all duration-200 hover:primary-color-400 hover:scale-[103%]'
              } `}
            >
              {isRedirecting ? 'Accediendo...' : isSubmitting ? 'Registrando...' : 'Registrar usuario'}
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
