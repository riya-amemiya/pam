import { prisma } from "@/lib/prisma";
import type { Session } from "next-auth";
import { UpdateUserDataReq } from "types/prisma/updateUserDataType";

export const updateUserDataService = async (
  session: Session,
  data: UpdateUserDataReq,
) => {
  return await prisma.user.update({
    where: { email: session?.user?.email || "" },
    data,
  });
};
