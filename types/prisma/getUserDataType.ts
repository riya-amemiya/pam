import { Post, User, UserRelationRole } from "@prisma/client";

export type GetUserDataRes = User & { role: UserRelationRole[]; post: Post[] };
