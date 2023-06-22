import type { Session } from "next-auth";
import { prisma } from "@/lib/prisma";
export const getUserDataService = async (session: Session) => {
  const user = await prisma.user.findFirstOrThrow({
    where: {
      email: session.user?.email,
    },
    include: {
      Post: true,
      UserRelationRole: true,
    },
  });
  return {
    user: {
      ...user,
      role: user.UserRelationRole,
      post: user.Post,
    },
  };
};
