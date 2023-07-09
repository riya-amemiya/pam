import { User } from "@prisma/client";

export type UpdateUserDataReq = Partial<User>;

export type UpdateUserDataRes = {
  statusCode: 200 | 401;
};
