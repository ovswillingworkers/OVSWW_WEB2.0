import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../prisma/client";

const adapter = PrismaAdapter(prisma);

export const authOptions = {
  adapter: adapter,
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl: undefined, // Disables user creation through Google OAuth2 API
    }),
  ],
  async signIn(user, account, profile) {
    console.log(user, " SIGNIN this is signin fuction.")
    const userExists = await prisma.user.findUnique({
      where: { email: user.email },
    });
    return userExists !== null;
  },
  async redirect(url, baseUrl) {
    if (url === "/") {
      // Redirect users who are authorized to '/dashboard'
      return "/dashboard";
    } else {
      // Redirect users who are not authorized to '/admin'
      return "/admin";
    }
  },
};

export default NextAuth(authOptions);
