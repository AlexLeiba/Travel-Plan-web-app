import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';

console.log(
  'first\n\n\n\n\n\n',
  process.env.NEXTAUTH_SECRET,
  '\n\n\n',
  process.env.AUTH_GOOGLE_ID,
  '\n\n\n\n',
  process.env.AUTH_GOOGLE_SECRET,
  '\n\n\n\n\n\n',
  process.env.NODE_ENV
);
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 30,
  },
  // cookies: {
  //   sessionToken: {
  //     name: 'next-auth.session-token',
  //     options: {
  //       sameSite: 'lax',
  //       secure: process.env.NODE_ENV === 'production',
  //       httpOnly: true,
  //       path: '/',
  //     },
  //   },
  // },
  secret: process.env.NEXTAUTH_SECRET || '',
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID || '',
      clientSecret: process.env.AUTH_GOOGLE_SECRET || '',
    }),
  ],
};
