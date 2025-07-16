import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// Define routes that need protection
const protectedRoutes = ['/my-trips', '/globe'];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Check if this is a route that needs auth
  const requiresAuth = protectedRoutes.some((path) =>
    pathname.startsWith(path)
  );

  if (!requiresAuth) return NextResponse.next();

  // Retrieve the token from cookies
  const token = req.cookies.get('next-auth.session-token')?.value;

  if (!token) {
    const loginUrl = new URL('/', req.url);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
