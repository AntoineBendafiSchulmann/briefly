import { PrismaAdapter } from '@auth/prisma-adapter';
import { type AuthOptions } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { prisma } from '@/lib/db';

//console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET);

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
    async session({ session, token }) {
      console.log("session callback", session, token);
      return session;
    },
    async jwt({ token, account, user }) {
      console.log("jwt callback", { token, account, user });
      return token;
    },
  },
};