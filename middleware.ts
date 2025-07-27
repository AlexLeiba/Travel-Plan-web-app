import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// Define routes that need protection
// const protectedRoutes = ['/my-trips', '/globe', '/dashboard'];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // ⛔️ Bypass NextAuth routes
  if (pathname.startsWith('/api/auth')) return NextResponse.next();

  // // Check if this is a route that needs auth
  // const requiresAuth = protectedRoutes.some((path) =>
  //   pathname.startsWith(path)
  // );

  // if (!requiresAuth) return NextResponse.next();

  // Retrieve the token from cookies
  const token =
    req.cookies.get('next-auth.session-token')?.value || // dev
    req.cookies.get('__Secure-next-auth.session-token')?.value; // prod

  if (!token) {
    const loginUrl = new URL('/', req.url);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/my-trips/:path*', '/globe/:path*', '/dashboard/:path*'],
};

// export { auth as middleware } from '@/auth';
