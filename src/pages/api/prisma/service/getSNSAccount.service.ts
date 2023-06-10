import { prisma } from "@/lib/prisma";
import type { Session } from "next-auth";
export const getSNSAccountService = async (session: Session) => {
  const { GitHub, Facebook, Twitter } = await prisma.user.findFirstOrThrow({
    where: {
      email: session.user.email,
    },
  });
  return {
    GitHub,
    Facebook,
    Twitter,
  };
};
