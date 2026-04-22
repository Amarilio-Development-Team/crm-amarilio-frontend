import { useState, useCallback } from 'react';
import { sileo } from 'sileo';

const useClipboard = () => {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    if (!text) {
      sileo.warning({ title: 'No hay nada que copiar' });
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      sileo.success({ title: 'Copiado al portapapeles' });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      sileo.error({ title: 'Error al copiar' });
    }
  }, []);

  return { copied, copy };
};

export default useClipboard;
