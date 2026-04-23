import { cookies } from 'next/headers';
import { decodeJwt, JWTPayload } from 'jose';

export interface UserInfo {
  name: string;
  role: string;
}

export interface Session extends JWTPayload {
  sub: string;
  role: string;
  user?: UserInfo;
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('session_token')?.value;
  const userInfoCookie = cookieStore.get('user_info')?.value;

  if (!token) {
    return null;
  }

  try {
    const payload = decodeJwt(token) as Session;

    if (payload.exp) {
      const expDate = new Date(payload.exp * 1000);
      const now = new Date();

      if (now >= expDate) {
        return null;
      }
    }

    let user: UserInfo | undefined = undefined;

    if (userInfoCookie) {
      try {
        user = JSON.parse(userInfoCookie);
      } catch (e) {
        console.error('Error al leer user_info', e);
      }
    }

    return {
      ...payload,
      user,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}
