import type { Session } from "next-auth";
import { getRoleService } from "./getRole.service";
import { prisma } from "@/lib/prisma";
import { getPostService } from "./getPost.service";
export const getUserDataService = async (session: Session) => {
  const user = await prisma.user.findFirstOrThrow({
    where: {
      email: session.user?.email,
    },
  });
  const role = await getRoleService(session);
  const post = await getPostService(session);
  return {
    user,
    role,
    post,
  };
};
