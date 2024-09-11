import NextAuth from "next-auth"
import { DefaultSession } from "next-auth"
declare module "next-auth" {
  interface Session {
    id: string
    accessToken: string
    error?: string | undefined
    user:
      | ({
          displayName: string
          username: string
        } & DefaultSession["user"])
      | null
  }
}
