import { GetRoleRes } from "./getRoleType";

export type PrismaResDefault =
  | {
      statusCode: 200;
      message: string;
    }
  | {
      statusCode: 401;
      message: string;
    };

export type { GetRoleRes };
