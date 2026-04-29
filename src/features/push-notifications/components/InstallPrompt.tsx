'use client';

import { useState, useEffect } from 'react';

export function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const detectEnvironment = () => {
      const userAgent = window.navigator.userAgent;
      const isAppleDevice = /iPad|iPhone|iPod/.test(userAgent);

      const isMSStream = 'MSStream' in window;

      setIsIOS(isAppleDevice && !isMSStream);
      setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);
    };

    detectEnvironment();

    // Listen the install event in real time
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleChange = (e: MediaQueryListEvent) => setIsStandalone(e.matches);

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  if (isStandalone || !isIOS) {
    return null;
  }

  return (
    <div className="mt-4 rounded-lg border bg-gray-50 p-4 text-sm text-gray-700 shadow-sm">
      <h3 className="mb-2 font-semibold text-gray-900">Instalar Aplicación</h3>
      <p>
        Para instalar esta app en tu dispositivo iOS, toca el botón de compartir
        <span role="img" aria-label="share icon" className="mx-1 text-lg text-blue-500">
          ⎋
        </span>
        y luego selecciona <strong>Agregar a Inicio</strong>.
      </p>
    </div>
  );
}
