import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { authConfig } from "./auth.config"

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                if (
                    credentials.email === process.env.ADMIN_EMAIL &&
                    credentials.password === process.env.ADMIN_PASSWORD
                ) {
                    return { id: "1", name: "Admin", email: process.env.ADMIN_EMAIL }
                }
                return null
            },
        }),
    ],
})
