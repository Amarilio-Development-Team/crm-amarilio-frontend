import { useField } from 'formik';
import React from 'react';

interface Option {
  label: string;
  value: string | number;
}

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  name: string;
  options: Option[];
  placeholder?: string;
}

export function SelectField({ label, options, placeholder, className, ...props }: SelectFieldProps) {
  const [field, meta] = useField(props);

  return (
    <div className="form-control flex w-full flex-col text-start">
      {label && (
        <label className="text-placeholder text-[13px] font-medium sm:text-[14px]" htmlFor={props.id || props.name}>
          {label}
        </label>
      )}

      <div className="relative">
        <select
          className={`text-strong input-bg mt-2 w-full appearance-none rounded-[5px] px-3 py-3 outline-none disabled:cursor-not-allowed disabled:bg-base-200 ${
            meta.error && meta.touched ? 'border border-red-500 ring-1 ring-red-500' : 'focus:border-main focus:ring-2 focus:ring-blue-500/20'
          } ${className || ''}`}
          {...field}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute right-0 top-1/2 flex -translate-y-1/3 items-center px-4 text-gray-500">
          <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>

      {meta.touched && meta.error ? <span className="font-rns mt-1 pl-3 text-sm text-red-500">{meta.error}</span> : null}
    </div>
  );
}
