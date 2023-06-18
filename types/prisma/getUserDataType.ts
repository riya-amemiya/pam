import { Post, User, UserRelationRole } from "@prisma/client";

export type GetUserDataRes =
  | {
      user: User;
      statusCode: 200;
      role: UserRelationRole[];
      post: Post[];
    }
  | {
      statusCode: 401;
      user: null;
      role: null;
      post: null;
    };
