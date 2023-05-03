import NextAuth, { NextAuthOptions } from 'next-auth';
const { PrismaAdapter } = await import( '@next-auth/prisma-adapter' );
const { prisma } = await import( '@/lib/prisma' );
import { NextApiRequest, NextApiResponse } from 'next/types';
const GoogleProvider = await import( 'next-auth/providers/google' ).then( ( mod ) => mod.default );
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
}
const authHandler = ( req: NextApiRequest, res: NextApiResponse ) => NextAuth( req, res, authOptions );
export default authHandler


