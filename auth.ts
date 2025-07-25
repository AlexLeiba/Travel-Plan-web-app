import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';

export const authOptions = NextAuth({
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 30, //30 days / expire time is stored in seconds in next-auth / when session will expire (and won't return session data of Auth user)
  },
  cookies: {
    //to configure cookies
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        sameSite: 'lax', // to be able to use the session in cross-site requests , only on GET request will be sent cookies
        // secure: process.env.NODE_ENV === 'production', // only send the session cookie over HTTPS if true
        httpOnly: true, // only send the session cookie over HTTP if true
        path: '/', // the path to which the session cookie will be saved
      },
    },
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!
        ? process.env.GOOGLE_CLIENT_ID!
        : '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        ? process.env.GOOGLE_CLIENT_SECRET!
        : '',
    }),
  ],
});
