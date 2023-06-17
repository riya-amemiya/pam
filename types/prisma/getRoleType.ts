import type { UserRelationRole } from "@prisma/client";

export type GetRoleRes = {
  statusCode: number;
  role: UserRelationRole[];
};
