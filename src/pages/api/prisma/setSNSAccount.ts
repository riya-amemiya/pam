import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const data = JSON.parse(req.body);
	const session = await getServerSession(req, res, authOptions);
	if (session) {
		await prisma.user.update({
			where: { email: session?.user?.email || "" },
			data: {
				GitHub: data.GitHubLink,
			},
		});

		res.status(200).json({ statusCode: 200 });
	}
}

export const config = {
	runtime: "edge",
};
