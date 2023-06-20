import { Post, User, UserRelationRole } from "@prisma/client";

export type GetUserDataRes =
  | {
      user: User & {
        role: UserRelationRole[];
        post: Post[];
      };
      statusCode: 200;
    }
  | {
      statusCode: 401;
      user: null;
    };
