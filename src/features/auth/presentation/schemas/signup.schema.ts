import * as Yup from 'yup';

export const SignupSchema = Yup.object({
  firstName: Yup.string().required('El nombre es requerido'),
  paternalLastName: Yup.string().required('El apellido paterno es requerido'),
  maternalLastName: Yup.string().required('El apellido materno es requerido'),
  email: Yup.string().email('Debe ser un correo válido').required('El correo es requerido'),
  password: Yup.string().required('La contraseña es requerida'),
  role: Yup.string()
    .oneOf(['designer', 'content-creator', 'marketing', 'digital-operator', 'developer', 'sales-representative', 'salesperson', 'manager', 'pm', 'seo'])
    .required('Por favor selecciona un rol'),
});
