import axios from "axios"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import getConfig from "next/config"
const { serverRuntimeConfig } = getConfig()

const options = {
  providers: [
    CredentialsProvider({
      id: "app",
      credentials: {},
      async authorize(credentials: any) {
        try {
          const loginResponse = await axios.post(
            `${serverRuntimeConfig.apiBaseUrl}/api/admin/login`,
            {
              username: credentials.username,
              password: credentials.password,
            }
          )
          if (loginResponse.status === 200 && loginResponse.data) {
            const _data = loginResponse.data.data
            const _user = _data.user
            const _res = {
              id: _user._id,
              user: {
                displayName: _user.displayName,
                username: _user.username,
              },
              accessToken: _data.accessToken,
            }
            return _res
          } else {
            console.log("%c[...nextauth].ts line:25 error", "color: #007acc;")
            return null
          }
        } catch (error: any) {
          throw new Error(
            error.response?.data?.message ?? "An unknown error occurred."
          )
        }
      },
    }),
  ],
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn() {
      return true
    },
    async session({ session, token }: any) {
      if (token.user) {
        session = { ...session, ...token.user }
      }
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      return session
    },
    async jwt({ token, user, trigger, session }: any) {
      if (user) {
        token.user = user
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
      }

      if (trigger === "update" && session) {
        token.user.user = {
          ...token.user.user,
          ...session.user,
        }
      }

      return token
    },
    async redirect({
      url,
      baseUrl,
    }: {
      url: string
      baseUrl: string
    }): Promise<string> {
      return url.startsWith(baseUrl) ? url : baseUrl
    },
  },
  pages: {
    error: "/login",
    signIn: "/login",
  },
}

const handler = NextAuth(options)

export { handler as GET, handler as POST }
