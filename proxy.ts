import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./Actions/auth.action";
import { UserRoles } from "./types&enums&interfaces/enums";
import { SessionResponse } from "./types&enums&interfaces/auth.types";
import { ApiResponse } from "./types&enums&interfaces/api.types";

export async function proxy(request: NextRequest) {
  const reqPath = request.nextUrl.pathname;
  const session = (await getSession()) as ApiResponse<SessionResponse>;

  const authRoutes = ["/signup", "/login"];
  const isAuthenticated = session.success;
  const role = session.data.user.role as string;
  let isAdmin = false;
  let isMember = false;

  if (role === UserRoles.ADMIN) {
    isAdmin = true;
  }
  if (role === UserRoles.MEMBER) {
    isMember = true;
  }
  if (authRoutes.includes(reqPath) && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }


  

  if (
    (reqPath.startsWith("/admin") || reqPath.startsWith("/dashboard")) &&
    !isAuthenticated
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (reqPath.startsWith("/admin") && !isAdmin) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (reqPath.startsWith("/dashboard") && !isMember) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }
}
export const config = {
  matcher: [
    "/signup",
    "/login",
    "/dashboard",
    "/admin",
    "/admin/:path*",
    "/dashboard/:path*",
  ],
};
