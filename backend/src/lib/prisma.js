import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

const backendRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
dotenv.config({ path: path.join(backendRoot, '.env'), quiet: true });

const globalForPrisma = globalThis;

// PrismaClient connects lazily on first query, so importing this module does not open a connection.
export const prisma = globalForPrisma.__humancarePrisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.__humancarePrisma = prisma;
}
