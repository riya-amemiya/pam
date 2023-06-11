import type { RoleName } from "@prisma/client";

export type GetRoleRes = {
  statusCode: number;
  roleName: RoleName;
};
