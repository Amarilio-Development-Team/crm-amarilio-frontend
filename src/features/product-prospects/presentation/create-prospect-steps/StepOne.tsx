'use client';

import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useProspectWizardStore } from '../../stores/prospectWizard.store';
import { OptionSelector, BaseOption } from '@/shared/components/form-components/OptionSelector';
import { Icon } from '@iconify/react';
import SearchInput from '@/shared/components/SearchInput';
import { searchClientAction } from '../../actions/prospect-search.action';
import { ClientResult } from '../../../global-search/application/global-search.types';
import { InputField } from '@/shared/components/form-components/InputField';
import { SelectField } from '@/shared/components/form-components/SelectField';
import MEXICO_STATES from '@/shared/data/mexico-states';

interface ClientCardOption extends BaseOption {
  title: string;
  description: string;
  icon: string;
}

const clientOptions: ClientCardOption[] = [
  {
    value: 'cliente_nuevo',
    title: 'Cliente nuevo',
    description: 'Registrar un prospecto para un nuevo cliente desde cero.',
    icon: 'mdi:account-plus-outline',
  },
  {
    value: 'cliente_amarilio',
    title: 'Cliente Amarilio',
    description: 'Seleccionar un cliente que ya existe en el sistema.',
    icon: 'mdi:domain',
  },
];

const Step1Schema = Yup.object().shape({
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

export const Step1ClientSelection: React.FC = () => {
  const { clientData, setClientData, nextStep } = useProspectWizardStore();

  const [searchResults, setSearchResults] = useState<ClientResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    setIsSearching(true);
    setHasSearched(true);
    const results = await searchClientAction(query);
    setSearchResults(results);
    setIsSearching(false);
  };

  return (
    <Formik
      initialValues={{
        clientType: clientData || '',
        selectedClientId: '',
        clientName: '',
        clientRfc: '',
        clientEmail: '',
        clientPhone: '',
      }}
      validationSchema={Step1Schema}
      onSubmit={values => {
        setClientData(values.clientType);
        nextStep();
      }}
    >
      {({ isSubmitting, values, setFieldValue, errors, touched }) => {
        return (
          <article className="flex flex-col gap-6 py-6">
            <div className="text-center sm:text-left">
              <h2 className="text-default text-xl font-bold">¿Para quién es el prospecto?</h2>
              <p className="text-placeholder mt-1 text-sm">Selecciona el tipo de registro que deseas realizar.</p>
            </div>

            <Form className="flex w-full flex-col gap-8">
              <div className="w-full">
                <OptionSelector<ClientCardOption>
                  name="clientType"
                  options={clientOptions}
                  gridClassName="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2"
                  renderOption={({ option, isSelected, hasError, onSelect }) => (
                    <div
                      onClick={() => {
                        onSelect(option.value);

                        if (option.value === 'cliente_nuevo') {
                          setFieldValue('selectedClientId', '', false);
                        } else if (option.value === 'cliente_amarilio') {
                          setFieldValue('clientName', '', false);
                          setFieldValue('clientRfc', '', false);
                          setFieldValue('clientEmail', '', false);
                          setFieldValue('clientPhone', '', false);
                        }
                      }}
                      className={`relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                        isSelected
                          ? 'border-primary bg-primary/10 shadow-md shadow-primary/20'
                          : hasError
                            ? 'border-red-400 bg-red-50 text-red-900'
                            : 'container-color border-main hover:border-primary/50'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute right-4 top-4 text-primary">
                          <Icon icon="mdi:check-circle" className="text-2xl" />
                        </div>
                      )}

                      <div className={`rounded-full p-4 transition-colors duration-300 ${isSelected ? 'bg-primary text-black' : 'text-lower main-container-color'}`}>
                        <Icon icon={option.icon} className="text-4xl" />
                      </div>

                      <div>
                        <h3 className={`mb-1 text-lg font-bold ${isSelected ? 'text-strong' : 'text-low'}`}>{option.title}</h3>
                        <p className="text-lower text-sm leading-relaxed">{option.description}</p>
                      </div>
                    </div>
                  )}
                />
              </div>

              {/* New client */}
              {values.clientType === 'cliente_nuevo' && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="mb-4">
                    <label className="text-low block font-semibold">Datos del Nuevo Cliente</label>
                    <p className="text-placeholder text-sm font-light">Ingresa la información básica para registrar al cliente (después podrás agregar más detalles).</p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <InputField label="Nombre completo o Razón Social" name="clientName" type="text" placeholder="Ej. Empresa SA de CV" />
                    <InputField label="RFC" name="clientRfc" type="text" placeholder="Ej. XEXX010101000" />
                    <InputField label="Correo electrónico (Opcional)" name="clientEmail" type="email" placeholder="Ej. contacto@empresa.com" />
                    <InputField label="Teléfono (Opcional)" name="clientPhone" type="text" placeholder="Ej. 55 1234 5678" />
                    <SelectField name="state" placeholder="Estado" label="Estado de la república" options={MEXICO_STATES} />
                  </div>
                </div>
              )}

              {/* Search Amarilio Client */}
              {values.clientType === 'cliente_amarilio' && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                  <label className="text-strong mb-3 block text-sm font-semibold">Buscar Cliente Existente</label>

                  <SearchInput onSearch={handleSearch} placeholder="Busca por nombre o RFC..." debounceMs={500} />

                  <div className="mt-4">
                    {isSearching ? (
                      <div className="text-placeholder flex items-center justify-center py-4 text-sm">
                        <span className="loading loading-spinner loading-sm mr-2"></span>
                        Buscando clientes...
                      </div>
                    ) : searchResults.length > 0 ? (
                      <ul className="max-h-48 space-y-2 overflow-y-auto">
                        {searchResults.map(client => {
                          const isSelected = values.selectedClientId === client.id;
                          return (
                            <li
                              key={client.id}
                              onClick={() => setFieldValue('selectedClientId', client.id)}
                              className={`container-color cursor-pointer rounded-lg border p-3 transition-all ${
                                isSelected ? 'border-primary bg-primary/10' : 'border-main hover:border-primary/50 hover:bg-black/5 dark:hover:bg-white/5'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className={`font-semibold ${isSelected ? 'text-primary' : 'text-strong'}`}>{client.name}</p>
                                  <p className="text-lower text-xs">RFC: {client.rfc}</p>
                                </div>
                                {isSelected && <Icon icon="mdi:check" className="text-xl text-primary" />}
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    ) : hasSearched ? (
                      <div className="text-placeholder py-4 text-center text-sm">No se encontraron clientes con esa búsqueda.</div>
                    ) : null}
                  </div>

                  {errors.selectedClientId && touched.selectedClientId && <p className="mt-3 text-sm font-medium text-red-500">{errors.selectedClientId}</p>}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full rounded-xl px-6 py-3.5 text-center font-bold text-black shadow-lg transition-all duration-300 active:scale-95 ${
                  isSubmitting ? 'cursor-not-allowed bg-gray-400 opacity-80' : 'bg-primary hover:primary-color-400'
                }`}
              >
                Continuar
              </button>
            </Form>
          </article>
        );
      }}
    </Formik>
  );
};
