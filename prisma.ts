// import { PrismaClient } from '@prisma/client';
// the generated folder is created after the command: npx prisma generate (Generate is used to have Client Prisma up to date with the Prisma Schema)
// This generates Client version of Our Prisma Models. So we will import PrismaClient from Generated Folder

import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

//The Instance of Prisma client to handle database operations
// Will create a type safety for handling DB data
