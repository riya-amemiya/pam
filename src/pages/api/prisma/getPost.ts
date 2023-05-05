import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const session = await getServerSession(req, res, authOptions);
	if (session) {
		const user = await prisma.user.findUnique({
			where: { email: session?.user?.email || "" },
		});
		const posts = await prisma.post.findMany({
			where: {
				authorId: user?.id,
			},
		});
		const message = posts;
		res.status(200).json({ statusCode: 200, message });
	}
}