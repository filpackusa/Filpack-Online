// import NextAuth from "next-auth"
// import { authConfig } from "./auth.config"

// export default NextAuth(authConfig).auth

export default function middleware(req: any) {
    // console.log("Middleware running")
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
