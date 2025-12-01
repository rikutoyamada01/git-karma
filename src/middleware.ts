import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard")
  const isOnLogin = req.nextUrl.pathname.startsWith("/login")

  if (isOnDashboard) {
    if (isLoggedIn) return
    return NextResponse.redirect(new URL("/login", req.nextUrl))
  }

  if (isOnLogin) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl))
    }
    return
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
