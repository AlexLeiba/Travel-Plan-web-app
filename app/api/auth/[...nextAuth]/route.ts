import { prisma } from '@/lib/prisma';
import NextAuth, { getServerSession } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@auth/prisma-adapter';

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
        sameSite: 'lax', // to be able to use the session in cross-site requests
        secure: process.env.NODE_ENV === 'production', // only send the session cookie over HTTPS if true
        httpOnly: true, // only send the session cookie over HTTP if true
        path: '/', // the path to which the session cookie will be saved
      },
    },
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID
        ? process.env.GITHUB_CLIENT_ID
        : '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET
        ? process.env.GITHUB_CLIENT_SECRET
        : '',
    }),
  ],
});

export { authOptions as GET, authOptions as POST };

export async function userSession() {
  const session: { user: { email: string } } | null = await getServerSession(
    authOptions
  );
  if (!session) {
    throw new Error('You must be logged in to access this resource');
  }
  return session;
}
