import { prisma } from "@/lib/prisma";
import { NewPost } from "types/prismaType";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const data: NewPost = JSON.parse(req.body);
	const session = await getServerSession(req, res, authOptions);
	if (session) {
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
		res.status(200).json({ statusCode: 200, message: "newPost" });
	}
}
