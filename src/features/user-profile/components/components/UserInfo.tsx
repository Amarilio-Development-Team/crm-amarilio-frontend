'use client';

import React from 'react';
import { Formik, Form, Field } from 'formik';
import { sileo } from 'sileo';
import * as Yup from 'yup';
import { UserProfileData } from '../../types/user-profile.types';
import { updatePhoneAction } from '../../actions/actions';
import { Icon } from '@iconify/react';

const PhoneSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, 'Debe contener exactamente 10 dígitos numéricos')
    .required('El número de teléfono es obligatorio'),
});

const UserInfo: React.FC<UserProfileData> = ({ id, name, paternalName, maternalName, email, phoneNumber, state }) => {
  const fullName = `${name} ${paternalName} ${maternalName}`.trim();

  return (
    <article className="container-color flex w-full flex-col gap-6 rounded-md p-6 lg:p-8">
      <div className="flex flex-col gap-1">
        <h3 className="text-medium text-lg font-semibold">Información Personal</h3>
        <p className="text-low text-sm font-light">Visualiza tus datos de identidad corporativa. Por motivos de seguridad y auditoría, solo puedes actualizar tu número de contacto.</p>
        <span className="text-low mt-2 text-xs">ID de usuario: {id}</span>
      </div>

      <Formik
        initialValues={{ phoneNumber: phoneNumber || '' }}
        validationSchema={PhoneSchema}
        enableReinitialize
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const result = await updatePhoneAction(values.phoneNumber);

          if (result.success) {
            sileo.success({ title: 'Teléfono actualizado correctamente' });
            resetForm({ values });
          } else {
            sileo.error({ title: 'Error al actualizar el teléfono', description: result.error || 'Ocurrió un error al actualizar el teléfono' });
          }

          setSubmitting(false);
        }}
      >
        {({ isSubmitting, dirty, isValid, errors, touched }) => (
          <Form className="flex w-full flex-col gap-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Readonly fields */}
              <div className="flex flex-col gap-1.5">
                <label className="text-medium text-sm font-medium">Nombre Completo</label>
                <input type="text" disabled className="input input-bordered w-full cursor-not-allowed opacity-60" value={fullName} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-medium text-sm font-medium">Correo Electrónico</label>
                <input type="email" disabled className="input input-bordered w-full cursor-not-allowed opacity-60" value={email} />
              </div>

              {state && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-medium text-sm font-medium">Estado de Residencia</label>
                  <input type="text" disabled className="input input-bordered w-full cursor-not-allowed opacity-60" value={state} />
                </div>
              )}

              {/* Editable field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-medium text-sm font-semibold">
                  Teléfono Móvil <span className="text-red-500">*</span>
                </label>
                <Field
                  name="phoneNumber"
                  type="tel"
                  maxLength={10}
                  placeholder="Ej. 5512345678"
                  className={`input input-bordered w-full bg-transparent transition-colors ${
                    errors.phoneNumber && touched.phoneNumber
                      ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                      : 'border-primary focus:border-primary focus:ring-1 focus:ring-primary'
                  }`}
                />
                {errors.phoneNumber && touched.phoneNumber && <span className="text-xs text-red-500">{errors.phoneNumber}</span>}
              </div>
            </div>

            <div className="mt-2 flex items-center justify-end border-t border-white/10 pt-5">
              <button
                type="submit"
                disabled={!dirty || !isValid || isSubmitting}
                className="primary-color-500 btn flex items-center gap-2 rounded-md border-none px-6 text-black transition-all hover:primary-color-400 disabled:main-container-color disabled:text-gray-500"
              >
                {isSubmitting ? <Icon icon="codex:loader" /> : <Icon icon="ci:save" />}
                Guardar cambios
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </article>
  );
};

export default UserInfo;
