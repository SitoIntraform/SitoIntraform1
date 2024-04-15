import { PrismaClient } from "@prisma/client";

declare global {
  var prismaGlobal: PrismaClient | undefined;
}

const prismadb = globalThis.prismaGlobal ?? new PrismaClient();

export default prismadb;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prismadb;