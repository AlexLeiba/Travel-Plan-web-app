import NextAuth from 'next-auth';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './lib/prisma';

export const { auth, handlers, signIn, signOut } = NextAuth({
  // auth-> return info about the session ( who is sign-in)
  providers: [
    //   Providers fro OAUth (Facebook, Github, Google, Twitter, Apple)
    Github({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: PrismaAdapter(prisma), //will store authenticated user info into DB. | Here we will pass Prisma client Instance | Sync User data with Prisma and Prisma with DB
});
