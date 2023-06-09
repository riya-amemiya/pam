import NextAuth, { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
// import type { NextApiRequest, NextApiResponse } from 'next/types';
import GoogleProvider from 'next-auth/providers/google';
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider( {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    } ) ],
  adapter: PrismaAdapter( prisma ),
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session ( { session, token } )
    {
      return { ...session, ...token }
    }
  }
}
// const authHandler = ( req: NextApiRequest, res: NextApiResponse ) => NextAuth( req, res, authOptions );
// export default authHandler

const handler = NextAuth(authOptions);

export {handler as GET,handler as POST}