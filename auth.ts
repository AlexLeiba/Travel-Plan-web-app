import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/prisma';

// export const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(prisma),
//   session: {
//     strategy: 'jwt',
//     maxAge: 60 * 60 * 24 * 30,
//   },
//   cookies: {
//     sessionToken: {
//       name: 'next-auth.session-token',
//       options: {
//         sameSite: 'lax',
//         secure: process.env.NODE_ENV === 'production',
//         httpOnly: true,
//         path: '/',
//       },
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET || '',
//   providers: [
//     GoogleProvider({
//       clientId: process.env.AUTH_GOOGLE_ID || '',
//       clientSecret: process.env.AUTH_GOOGLE_SECRET || '',
//     }),
//   ],
// };

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 30,
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        path: '/',
      },
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID || '',
      clientSecret: process.env.AUTH_GOOGLE_SECRET || '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});

export async function getServerSession() {
  const token = await auth();

  return token; // Contains the user's session data if authenticated
}
