'use client';
import { ReactNode } from 'react';
import { useField } from 'formik';
import Image, { StaticImageData } from 'next/image';

export interface CardOption {
  value: string;
  title: string;
  description?: string;
  imageSrc?: string | StaticImageData;
  imageAlt?: string;
  icon?: ReactNode;
}

interface CardSelectorProps {
  name: string;
  options: CardOption[];
  label?: string;
}

export function CardSelector({ name, options, label }: CardSelectorProps) {
  const [field, meta, helpers] = useField(name);

  const handleSelectOption = (value: string) => {
    helpers.setTouched(true);
    helpers.setValue(value);
  };

  return (
    <div className="flex w-full flex-col text-start">
      {label && <label className="text-placeholder text-[14.5px] font-medium sm:text-[15px]">{label}</label>}

      <div className="mt-1 grid grid-cols-1 gap-4 mblg:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {options.map(option => {
          const isSelected = field.value === option.value;
          const hasError = meta.error && meta.touched;

          return (
            <article
              key={option.value}
              onClick={() => handleSelectOption(option.value)}
              className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 p-4 text-center transition-all ${
                isSelected ? 'container-color border-primary' : hasError ? 'border-red-500 bg-base-100' : 'border-transparent bg-base-100 hover:border-gray-300'
              }`}
            >
              {option.imageSrc && <Image src={option.imageSrc} alt={option.imageAlt || option.title} className="mb-2 size-20 sm:size-14 lg:size-14" />}
              <h3 className="text-strong text-sm font-semibold leading-tight sm:text-base">{option.title}</h3>
            </article>
          );
        })}
      </div>

      {meta.touched && meta.error ? <span className="font-principal-light mt-1 text-xs text-red-500 lg:text-[13px]">{meta.error}</span> : null}
    </div>
  );
}
