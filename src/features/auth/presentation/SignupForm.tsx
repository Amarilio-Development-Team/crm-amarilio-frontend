'use client';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { signUpAction } from '../infrastructure/auth.actions';
import { sileo } from 'sileo';
import { InputField } from '@/shared/components/form-components/InputField';
import { InputFieldPassword } from '@/shared/components/form-components/InputFieldPassword';
import { CardSelector, CardOption } from '@/shared/components/form-components/CardSelector';
import { UserRole } from '../domain/auth.types';
import { PM_IMAGE, MANAGER_IMAGE, SALESPERSON_IMAGE, DEVELOPER_IMAGE, DESIGNER_IMAGE, WRITER_IMAGE, MARKETING_IMAGE } from '@/assets/auth/index';

interface SignupFormValues {
  firstName: string;
  paternalLastName: string;
  maternalLastName: string;
  email: string;
  password: string;
  role: UserRole | '';
}

const roleOptions: CardOption[] = [
  { value: 'designer', title: 'Diseñador', imageSrc: DESIGNER_IMAGE },
  { value: 'writer', title: 'Contenido', imageSrc: WRITER_IMAGE },
  { value: 'seo', title: 'SEO', imageSrc: MARKETING_IMAGE },
  { value: 'marketing', title: 'Marketing digital', imageSrc: MARKETING_IMAGE },
  { value: 'developer', title: 'Desarrollo Técnico', imageSrc: DEVELOPER_IMAGE },
  { value: 'sales', title: 'Implementador', imageSrc: SALESPERSON_IMAGE },
  { value: 'manager', title: 'Gerente', imageSrc: MANAGER_IMAGE },
  { value: 'pm', title: 'Product Manager', imageSrc: PM_IMAGE },
];

export function SignupForm() {
  const [isRedirecting, setIsRedirecting] = useState(false);

  return (
    <Formik<SignupFormValues>
      initialValues={{
        firstName: '',
        paternalLastName: '',
        maternalLastName: '',
        email: '',
        password: '',
        role: '',
      }}
      validationSchema={Yup.object({
        firstName: Yup.string().required('El nombre es requerido'),
        paternalLastName: Yup.string().required('El apellido paterno es requerido'),
        maternalLastName: Yup.string().required('El apellido materno es requerido'),
        email: Yup.string().email('Debe ser un correo válido').required('El correo es requerido'),
        password: Yup.string().required('La contraseña es requerida'),
        role: Yup.string().oneOf(['designer', 'writer', 'marketing', 'developer', 'sales', 'manager', 'pm', 'seo']).required('Por favor selecciona un rol'),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        const minLoadingTime = new Promise(resolve => setTimeout(resolve, 2500));

        const payload = { ...values, roles: [values.role as UserRole] };

        const promisesExecution = Promise.all([signUpAction(payload), minLoadingTime]).then(([serverResult]) => {
          if (!serverResult.success) {
            throw new Error(serverResult.error || 'Error al registrar usuario');
          }
          setIsRedirecting(true);
          return serverResult;
        });

        sileo.promise(promisesExecution, {
          loading: { title: 'Registrando nuevo usuario...' },
          success: () => {
            return { title: 'Usuario registrado exitosamente' };
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
              <InputField label="Nombre" name="firstName" type="text" placeholder="Ej. Juan" />
              <InputField label="Apellido Paterno" name="paternalLastName" type="text" placeholder="Ej. Pérez" />
              <InputField label="Apellido Materno" name="maternalLastName" type="text" placeholder="Ej. Gómez" />
              <InputField label="Correo electrónico" name="email" type="email" placeholder="Ej. correo@ejemplo.com" />
              <InputFieldPassword label="Contraseña" name="password" type="password" placeholder="* * * * * * * *" />
            </div>

            <CardSelector name="role" options={roleOptions} label="Selecciona tu perfil profesional" />

            <button
              type="submit"
              disabled={isDisabled}
              className={`font-rns w-full rounded-[5px] px-6 py-2.5 text-center font-bold text-black shadow-xl transition-all duration-200 ${
                isDisabled ? 'cursor-not-allowed bg-gray-400 opacity-80' : 'primary-color-500 hover:primary-color-400'
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
