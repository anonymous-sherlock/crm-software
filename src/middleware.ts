import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname; // relative path

    // Manage route protection
    const token = await getToken({ req });

    const isAuth = !!token;

    const isLoginPage = req.nextUrl.pathname.startsWith("/login");
    const isRegisterPage = req.nextUrl.pathname.startsWith("/register");
    const sensitiveRoutes = ["/dashboard", "/app/"];

    if (isAuth && (isLoginPage || isRegisterPage)) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (
      !isAuth &&
      sensitiveRoutes.some((route) => pathname.startsWith(route))
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/app/:path*",
    "/login",
    "/register",
    "/dashboard/:path*",
    "/api/:path*",
  ],
};
