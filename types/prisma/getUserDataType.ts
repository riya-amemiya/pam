import { User, UserRelationRole } from "@prisma/client";

export type GetUserDataRes = {
  snsAccount: User;
  role: UserRelationRole;
};
