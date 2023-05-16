import { prisma } from "@/lib/prisma";
import type { Session } from "next-auth";
import type { NewPostReq } from "types/prisma";
export const newPostService = async (session: Session, data: NewPostReq) => {
	const userId = await prisma.user
		.findUnique({
			where: { email: session?.user?.email || "" },
		})
		.then((user) => user?.id);
	const newPost = await prisma.post.create({
		data: {
			title: data.title,
			content: data.content,
			authorId: userId,
		},
	});
	await prisma.postRelationTag.create({
		data: {
			postId: newPost.id,
			tagName: "default",
		},
	});
};
