import * as Yup from 'yup';

export const StepOneSchema = Yup.object().shape({
  clientType: Yup.string().required('Debes seleccionar un tipo de cliente para continuar'),

  selectedClientId: Yup.string().when('clientType', {
    is: (val: string) => val === 'cliente_amarilio',
    then: schema => schema.required('Por favor, busca y selecciona un cliente de la lista'),
    otherwise: schema => schema.notRequired(),
  }),

  clientName: Yup.string().when('clientType', {
    is: (val: string) => val === 'cliente_nuevo',
    then: schema => schema.required('El nombre o razón social es obligatorio'),
    otherwise: schema => schema.notRequired(),
  }),
  clientRfc: Yup.string().when('clientType', {
    is: (val: string) => val === 'cliente_nuevo',
    then: schema => schema.required('El RFC es obligatorio'),
    otherwise: schema => schema.notRequired(),
  }),
  clientEmail: Yup.string().email('Ingresa un correo electrónico válido'),
  clientPhone: Yup.string(),
});
