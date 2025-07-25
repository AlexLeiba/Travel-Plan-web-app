// import { prisma } from '@/lib/prisma';
// import NextAuth from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';
// import { PrismaAdapter } from '@auth/prisma-adapter';

import { authOptions } from '@/lib/getServerUserSession';

export { authOptions as GET, authOptions as POST };
