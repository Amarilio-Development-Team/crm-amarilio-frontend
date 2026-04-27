import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ROLE_ACCESS_MAP: Record<string, string[]> = {
  '/ventas': ['manager', 'pm', 'sales'],
  '/operacion': ['manager', 'developer', 'pm', 'operador-digital', 'creador-contenido'],
  '/equipo': ['manager', 'pm'],
  '/reportes': ['manager'],
  '/configuracion': ['manager', 'admin'],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const routePrefix = Object.keys(ROLE_ACCESS_MAP).find(route => pathname.startsWith(route));

  if (!routePrefix) {
    return NextResponse.next();
  }

  const token = request.cookies.get('authToken')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const tokenPayload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(tokenPayload));
    const userRole = decodedPayload.role;

    const allowedRoles = ROLE_ACCESS_MAP[routePrefix];

    if (!allowedRoles.includes(userRole)) {
      return NextResponse.redirect(new URL('/acceso-denegado', request.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};
