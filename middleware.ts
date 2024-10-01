import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const cookie = req.cookies.get("username-storage")?.value;
  const user = cookie ? JSON.parse(cookie) : null;
  const isAdmin = user?.isAdmin === true;

  if (!isAdmin && pathname.startsWith("/admin")) {
    return new NextResponse("Forbidden: You do not have access to this page.", {
      status: 403,
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
