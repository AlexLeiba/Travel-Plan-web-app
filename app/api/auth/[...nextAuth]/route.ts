// import { prisma } from '@/lib/prisma';
// import NextAuth, {  NextAuthOptions } from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';

// import { PrismaAdapter } from '@auth/prisma-adapter';

// export const authOptions: NextAuthOptions = NextAuth({
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
// });

// export { authOptions as GET, authOptions as POST };

import { handlers } from '@/auth'; // Referring to the auth.ts we just created
export const { GET, POST } = handlers;
