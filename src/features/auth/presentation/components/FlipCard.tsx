'use client';
import { Icon } from '@iconify/react';

export interface FlipCardData {
  value: string;
  title: string;
  description?: string;
  icon?: string;
}

interface FlipCardProps {
  option: FlipCardData;
  isSelected: boolean;
  hasError: boolean;
  onSelect: (value: string) => void;
}

export function FlipCard({ option, isSelected, hasError, onSelect }: FlipCardProps) {
  return (
    <article onClick={() => onSelect(option.value)} className="group relative h-56 w-full cursor-pointer rounded-xl bg-transparent outline-none [perspective:1000px]">
      <div className={`relative h-full w-full rounded-xl transition-all duration-500 [transform-style:preserve-3d] ${!isSelected ? 'group-hover:[transform:rotateY(180deg)]' : ''}`}>
        <div
          className={`absolute inset-0 flex h-full w-full flex-col items-center justify-center rounded-xl border-2 p-5 text-center transition-all duration-200 [backface-visibility:hidden] ${
            isSelected ? 'border-green-500 bg-base-100 shadow-sm' : hasError ? 'border-red-500 bg-base-100' : 'border-gray-200 bg-base-100 group-hover:border-primary/50'
          }`}
        >
          <div
            className={`absolute right-3 top-3 flex size-5 items-center justify-center rounded-full transition-all duration-300 ${
              isSelected ? 'scale-100 bg-green-600 text-white opacity-100' : 'scale-75 bg-transparent text-transparent opacity-0'
            }`}
          >
            <Icon icon="lucide:check" strokeWidth={3} className="size-3" />
          </div>

          {option.icon && <Icon icon={option.icon} className={`mb-3 size-8 transition-colors duration-200 ${isSelected ? 'text-green-500' : 'text-gray-400'}`} />}

          <h3 className="text-strong text-sm font-semibold leading-tight transition-colors duration-200 sm:text-base">{option.title}</h3>
        </div>

        <div
          className={`absolute inset-0 flex h-full w-full flex-col items-center justify-center rounded-xl border-2 p-5 text-center transition-all duration-200 [backface-visibility:hidden] [transform:rotateY(180deg)] ${
            hasError ? 'border-red-500 bg-red-50/30' : 'border-gray-200 bg-gray-50'
          }`}
        >
          <h4 className="text-strong mb-2 text-[15px] font-bold">{option.title}</h4>
          <p className="text-xs leading-relaxed text-gray-600 sm:text-[13px]">{option.description}</p>
        </div>
      </div>
    </article>
  );
}
