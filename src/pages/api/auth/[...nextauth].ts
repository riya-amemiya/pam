import NextAuth, { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next/types';
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
      try {
      const user = await prisma.user.findUniqueOrThrow( {
        where: { email: session?.user?.email || "" },
      } );
      const data = await prisma.userRelationRole.findFirst( {
        where: {
          userId: user?.id,
        }
      } ) || await prisma.userRelationRole.create( {
        data: {
          userId: user?.id,
          roleName: 'USER'
        }
      } )
      let role = await prisma.role.findFirstOrThrow( {
        where: {
          name: data.roleName
        }
      } )
      session.user.role = role?.name || 'USER'}
      catch ( e )
      {
        console.log( e )
      }
      return { ...session, ...token }
    }
  }
}
const authHandler = ( req: NextApiRequest, res: NextApiResponse ) => NextAuth( req, res, authOptions );
export default authHandler


