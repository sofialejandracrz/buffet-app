import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from "jwt-decode";

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.next();
  }

  let user;
  try {
    user = jwtDecode<{ rol: string }>(token);
  } catch {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/dashboard') && user.rol !== 'Administrador') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (pathname.startsWith('/perfil') && user.rol !== 'Cliente') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (pathname.startsWith('/area-de-trabajo') && user.rol !== 'Abogado') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/perfil/:path*', '/area-de-trabajo/:path*'],
};
