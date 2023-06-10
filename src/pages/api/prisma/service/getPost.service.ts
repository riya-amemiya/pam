import { prisma } from "@/lib/prisma";
import type { Session } from "next-auth";

export const getPostService = async (session: Session) => {
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email || "" },
  });
  return await prisma.post.findMany({
    where: {
      authorId: user?.id,
    },
  });
};
