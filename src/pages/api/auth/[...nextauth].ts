import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export const authOptions:NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })],
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default(req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, authOptions)


