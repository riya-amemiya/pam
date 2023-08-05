import { prisma } from "@/lib/prisma";
import { Post } from "@prisma/client";
import type { Session } from "next-auth";

export const getPostService = async (session: Session) => {
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email || "" },
    include: {
      Post: true,
    },
  });
  return user?.Post as unknown as Post[];
};
