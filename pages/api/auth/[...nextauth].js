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
      // autoCreate: false,
    }),
  ],
  callbacks: {
    async signIn(user) {
      if (user.account.provider === "google") {
        try {
          const existingUser = await prisma.allowUser.findUnique({
            where: { email: user.profile.email },
          });

          if (!existingUser) {
            const AllowUser = await prisma.allowUser.findUnique({
              where: { email: user.profile.email },
            });

            if (!AllowUser) {
              return false;
            }
          }

          return true;
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false;
        }
      }

      return false;
    },

    async session(session, user) {
      // Find the user in the database

      try {
        const dbUser = await prisma.user.findUnique({
          where: {
            email: session.user.email,
          },
        });

        if (!["admin", "moderator"].includes(dbUser.role)) {
          const existingUser = await prisma.allowUser.findUnique({
            where: { email: session.user.email },
          });

          if (existingUser) {
            // Update the User table with the user's name and role
            const updatedUser = await prisma.user.update({
              where: { email: session.user.email },
              data: { name: existingUser.name, role: existingUser.role },
            });
          }
        }
      } catch (error) {
        console.error("Error finding user:", error);
      }

      return session;
    },
  },
  pages: {
    error: "/admin",
  },
};

export default NextAuth(authOptions);
