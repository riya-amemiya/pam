import { prisma } from "@/lib/prisma";
import type { Session } from "next-auth";
import type { NewPostReq } from "types/prisma";
export const newPostService = async (session: Session, data: NewPostReq) => {
  const userId = await prisma.user
    .findUniqueOrThrow({
      where: { email: session?.user?.email || "" },
    })
    .then((user) => user?.id);
  await prisma.post.create({
    data: {
      title: data.title,
      content: data.content,
      authorId: userId,
      PostRelationTag: {
        create: {
          tagName: "default",
        },
      },
    },
  });
  return true;
};
