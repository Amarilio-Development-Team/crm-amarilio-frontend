'use server';

import webpush from 'web-push';
import { PushSubscriptionPayload, NotificationResponse } from './types/push.types';

const IS_MOCK = process.env.USE_MOCK_PUSH_BACKEND === 'true';

webpush.setVapidDetails('mailto:tu-correo@ejemplo.com', process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '', process.env.VAPID_PRIVATE_KEY || '');

export async function registerPushSubscription(subscription: PushSubscriptionPayload, userId: string): Promise<NotificationResponse> {
  if (IS_MOCK) return { success: true, message: 'Suscripción registrada (Mock)' };

  try {
    const response = await fetch(`${process.env.FASTAPI_INTERNAL_URL}/api/v1/push/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.INTERNAL_SERVICE_TOKEN}`,
      },
      body: JSON.stringify({ userId, subscription }),
    });

    if (!response.ok) throw new Error('Error en FastAPI');
    return { success: true, message: 'Suscripción registrada en DB' };
  } catch (error) {
    console.error('Error enviando suscripción a FastAPI:', error);
    return { success: false, error: 'Fallo al registrar suscripción' };
  }
}

export async function triggerNotification(userId: string, title: string, message: string, mockSubscription?: PushSubscriptionPayload): Promise<NotificationResponse> {
  if (IS_MOCK) {
    if (!mockSubscription) {
      return { success: false, error: 'Falta la suscripción en el cliente' };
    }

    try {
      await webpush.sendNotification(mockSubscription as webpush.PushSubscription, JSON.stringify({ title, body: message, icon: '/icon-192x192.png' }));
      return { success: true, message: 'Notificación enviada (Mock)' };
    } catch (error) {
      console.error('[MOCK] Error enviando push:', error);
      return { success: false, error: 'Fallo al enviar notificación local' };
    }
  }

  try {
    const response = await fetch(`${process.env.FASTAPI_INTERNAL_URL}/api/v1/push/notify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.INTERNAL_SERVICE_TOKEN}`,
      },
      body: JSON.stringify({ userId, title, message }),
    });

    if (!response.ok) throw new Error('Error en FastAPI');
    return { success: true, message: 'Notificación solicitada' };
  } catch (error) {
    console.error('Error solicitando notificación a FastAPI:', error);
    return { success: false, error: 'Fallo al solicitar alerta' };
  }
}
