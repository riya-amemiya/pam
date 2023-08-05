import type { Session } from "next-auth";
import { kysely } from "@/kysely";
import { User } from "@prisma/client";
export const getUserDataService = async (session: Session) => {
  const user = (
    await kysely
      .selectFrom("User")
      .where("email", "=", session.user?.email as string)
      .selectAll()
      .limit(1)
      .execute()
  )[0] as User;
  const posts = await kysely
    .selectFrom("Post")
    .where("authorId", "=", user.id)
    .selectAll()
    .execute();
  const role = await kysely
    .selectFrom("UserRelationRole")
    .where("userId", "=", user.id)
    .selectAll()
    .execute();
  return {
    user: {
      ...user,
      role,
      posts,
    },
  };
};
