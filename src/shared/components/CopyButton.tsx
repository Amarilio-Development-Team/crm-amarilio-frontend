import React from 'react';
import useClipboard from '../hooks/useClipboard';
import { Icon } from '@iconify/react';

interface CopyButtonProfs {
  textToCopy: string;
  className?: string;
}

const CopyButton: React.FC<CopyButtonProfs> = ({ textToCopy, className = '' }) => {
  const { copied, copy } = useClipboard();
  const baseClasses = 'absolute z-10 p-2 text-gray-400 transition-colors hover:text-primary';
  const positionClasses = className || 'top-10 right-2';

  return (
    <button type="button" onClick={() => copy(textToCopy)} className={`${baseClasses} ${positionClasses}`} title="Copiar contenido">
      {copied ? <Icon icon="material-symbols:check" /> : <Icon icon="tabler:copy" />}
    </button>
  );
};

export default CopyButton;
