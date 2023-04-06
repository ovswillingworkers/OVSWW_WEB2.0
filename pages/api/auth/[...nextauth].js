import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../prisma/client"

const adapter = PrismaAdapter(prisma)

export const authOptions = {
  adapter : adapter,
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl: undefined // Disables user creation through Google OAuth2 API

    }),

  ],

  callbacks: {
    async signIn(user, account, profile) {
      // Check if the user is in the Prisma database and return true if they are
      const userExists = await prisma.user.findUnique({
        where: { email: user.email }
      })
      return userExists !== null
    },
  },
}



export default NextAuth(authOptions)
