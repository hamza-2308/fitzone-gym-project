import { NextResponse } from "next/server";

const ADMIN_COOKIE_NAME = "fitzone_admin_session";
const ADMIN_SESSION_VALUE = "authenticated";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const session = request.cookies.get(ADMIN_COOKIE_NAME);
    if (!session || session.value !== ADMIN_SESSION_VALUE) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
