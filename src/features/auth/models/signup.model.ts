import * as Yup from 'yup';

export const SignupModel = Yup.object({
  firstName: Yup.string().required('El nombre es requerido'),
  paternalLastName: Yup.string().required('El apellido paterno es requerido'),
  maternalLastName: Yup.string().required('El apellido materno es requerido'),
  email: Yup.string().email('Debe ser un correo válido').required('El correo es requerido'),
  password: Yup.string().required('La contraseña es requerida'),
  roles: Yup.array().of(Yup.string()).min(1, 'Debes seleccionar al menos un perfil').max(3, 'Puedes seleccionar un máximo de 3 perfiles').required('Requerido'),
});
