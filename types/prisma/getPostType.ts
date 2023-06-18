import { Post } from "@prisma/client";

export type GetPostRes =
  | {
      statusCode: 401;
      post: null;
    }
  | {
      statusCode: 200;
      post: Post[];
    };
