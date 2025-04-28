import { NextResponse, NextRequest } from "next/server";

const publicRoutes = [{ path: "/auth", whenAuthenticated: "redirect" }];

const REDIRECT_WHEN_NOT_AUTHENTICATED = "/auth";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);
  const authToken = req.cookies.get("@nextauth.token");
  const isLoggingOut = req.nextUrl.searchParams.get("logout") === "true";

  if (isLoggingOut && path === "/auth") {
    return NextResponse.next();
  }

  // Se não há token e a rota é pública, permita o acesso
  if (!authToken && !publicRoute) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;
    return NextResponse.redirect(redirectUrl);
  }

  // Se há token e a rota não é pública, permita o acesso
  if (authToken && !publicRoute) {
    return NextResponse.next();
  }

  // Se há token e a rota é pública com redirecionamento, redirecione para /
  if (
    authToken &&
    publicRoute &&
    publicRoute.path === "/auth" &&
    publicRoute.whenAuthenticated === "redirect"
  ) {
    console.log(`Rota /auth com token, redirecionando para /`);
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/";
    return NextResponse.redirect(redirectUrl);
  }

  // Caso padrão: permita o acesso
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
