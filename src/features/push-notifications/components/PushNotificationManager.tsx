'use client';

import { useState, useEffect } from 'react';
import { urlBase64ToUint8Array } from '../utils/push.utils';
import { registerPushSubscription, triggerNotification } from '../actions';
import { PushSubscriptionPayload } from '../types/push.types';

interface Props {
  currentUserId: string;
}

export function PushNotificationManager({ currentUserId }: Props) {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function initializePush() {
      const supported = 'serviceWorker' in navigator && 'PushManager' in window;

      if (!supported) {
        if (isMounted) setIsSupported(false);
        return;
      }

      if (isMounted) setIsSupported(true);

      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        const sub = await registration.pushManager.getSubscription();

        if (sub && isMounted) {
          setSubscription(sub);
          const payload: PushSubscriptionPayload = JSON.parse(JSON.stringify(sub));

          await registerPushSubscription(payload, currentUserId);
        }
      } catch (error) {
        console.error('Error al revisar suscripciones existentes:', error);
      }
    }

    initializePush();

    return () => {
      isMounted = false;
    };
  }, [currentUserId]);

  async function handleSubscribe() {
    setIsLoading(true);
    try {
      const registration = await navigator.serviceWorker.ready;

      const applicationKey = urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!) as BufferSource;

      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationKey,
      });

      const payload: PushSubscriptionPayload = JSON.parse(JSON.stringify(sub));
      const res = await registerPushSubscription(payload, currentUserId);

      if (res && res.success) {
        setSubscription(sub);
      }
    } catch (error) {
      console.error('Error al suscribir:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSendTest() {
    if (!message.trim() || !subscription) return;

    setIsLoading(true);
    try {
      const payload: PushSubscriptionPayload = JSON.parse(JSON.stringify(subscription));

      const res = await triggerNotification(currentUserId, 'Alerta de Amarilio', message, payload);

      if (!res) {
        console.error('El servidor no respondió.');
        alert('Error: No hubo respuesta del servidor.');
        return;
      }

      if (!res.success) {
        alert(`Error: ${res.error}`);
      } else {
        setMessage('');
      }
    } catch (error) {
      console.error('Error al enviar prueba:', error);
    } finally {
      setIsLoading(false);
    }
  }

  if (!isSupported) {
    return <p className="text-sm text-gray-500">Notificaciones no soportadas.</p>;
  }

  return (
    <div className="max-w-sm rounded-xl border border-gray-200 bg-white p-5">
      {subscription ? (
        <div className="flex flex-col gap-3">
          <div className="mt-2 flex flex-col gap-2">
            <input
              type="text"
              placeholder="Mensaje de prueba..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              onClick={handleSendTest}
              disabled={isLoading || !message.trim()}
              className="rounded-lg bg-yellow-400 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-yellow-500 disabled:opacity-50"
            >
              {isLoading ? 'Enviando...' : 'Enviar notificación'}
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={handleSubscribe}
          disabled={isLoading}
          className="w-full rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
        >
          {isLoading ? 'Conectando...' : 'Vincular Dispositivo'}
        </button>
      )}
    </div>
  );
}
