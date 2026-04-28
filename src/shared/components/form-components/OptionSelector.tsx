'use client';
import { useField } from 'formik';
import React, { ReactNode } from 'react';

export interface BaseOption {
  value: string;
}

export interface RenderOptionProps<T extends BaseOption> {
  option: T;
  isSelected: boolean;
  hasError: boolean;
  onSelect: (value: string) => void;
}

interface OptionSelectorProps<T extends BaseOption> {
  name: string;
  options: T[];
  label?: string;
  renderOption: (props: RenderOptionProps<T>) => ReactNode;
  gridClassName?: string;
  multiple?: boolean;
  maxSelections?: number;
}

export function OptionSelector<T extends BaseOption>({
  name,
  options,
  label,
  renderOption,
  gridClassName = 'mt-2 grid grid-cols-1 gap-4 mblg:grid-cols-2 md:grid-cols-2 xl:grid-cols-3',
  multiple = false,
  maxSelections,
}: OptionSelectorProps<T>) {
  const [field, meta, helpers] = useField(name);

  const handleSelectOption = (value: string) => {
    helpers.setTouched(true);

    if (multiple) {
      const currentValue = Array.isArray(field.value) ? field.value : [];
      const isAlreadySelected = currentValue.includes(value);

      if (isAlreadySelected) {
        helpers.setValue(currentValue.filter((v: string) => v !== value));
      } else {
        if (maxSelections && currentValue.length >= maxSelections) {
          return;
        }
        helpers.setValue([...currentValue, value]);
      }
    } else {
      helpers.setValue(value);
    }
  };

  const hasError = Boolean(meta.error && meta.touched);

  return (
    <div className="flex w-full flex-col text-start">
      {label && <label className="text-placeholder text-[14.5px] font-medium sm:text-[15px]">{label}</label>}

      <div className={gridClassName}>
        {options.map(option => {
          const isSelected = multiple ? Array.isArray(field.value) && field.value.includes(option.value) : field.value === option.value;

          return (
            <React.Fragment key={option.value}>
              {renderOption({
                option,
                isSelected,
                hasError,
                onSelect: handleSelectOption,
              })}
            </React.Fragment>
          );
        })}
      </div>

      {hasError && meta.error ? <span className="font-principal-light mt-1.5 text-xs text-red-500 lg:text-[13px]">{meta.error}</span> : null}
    </div>
  );
}
