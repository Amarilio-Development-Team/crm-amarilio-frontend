import * as Yup from 'yup';

export const LoginModel = Yup.object({
  email: Yup.string().email('Debe ser un correo válido').required('El correo es requerido'),
  password: Yup.string().required('La contraseña es requerida'),
});
