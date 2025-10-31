import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  console.log("🚀 ~ middleware ~ pathname:", pathname);

  // ⛔️ Bypass NextAuth routes

  if (pathname.startsWith("/api/auth")) return NextResponse.next();

  // Retrieve the token from cookies
  const token =
    req.cookies.get("next-auth.session-token")?.value || // dev
    req.cookies.get("__Secure-next-auth.session-token")?.value; // prod
  console.log("🚀 ~ middleware ~ token:", token);

  if (!token) {
    const loginUrl = new URL("/", req.url);

    return NextResponse.redirect(loginUrl);
  }

  if (token && pathname === "/") {
    const dashboardUrl = new URL("/dashboard", req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/my-trips/:path*", "/globe/:path*", "/dashboard/:path*"],
};
