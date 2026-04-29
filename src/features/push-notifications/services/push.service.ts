import { PushSubscriptionPayload, NotificationResponse } from '../types/push.types';

const API_BASE_URL = '/api/v1/push';

export const PushService = {
  async subscribe(subscription: PushSubscriptionPayload): Promise<NotificationResponse> {
    console.log('[PushService] subscribe event:', subscription);

    // const response = await fetch(`${API_BASE_URL}/subscribe`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(subscription),
    // });
    // return response.json();

    return Promise.resolve({ success: true, message: 'Suscripción guardada exitosamente' });
  },

  async unsubscribe(endpoint: string): Promise<NotificationResponse> {
    console.log('[PushService] unsubscribe event:', endpoint);

    // const response = await fetch(`${API_BASE_URL}/unsubscribe`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ endpoint }),
    // });
    // return response.json();

    return Promise.resolve({ success: true, message: 'Suscripción eliminada' });
  },

  async sendTest(message: string): Promise<NotificationResponse> {
    console.log('[PushService] sendTest event:', message);

    // const response = await fetch(`${API_BASE_URL}/send`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ message }),
    // });
    // return response.json();

    return Promise.resolve({ success: true, message: 'Notificación de prueba enviada' });
  },
};
