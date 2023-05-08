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
		const user = await prisma.user.findFirstOrThrow({
			where: { email: session?.user?.email || "" },
		});
		const roleData =
			(await prisma.userRelationRole.findFirst({
				where: {
					userId: user?.id,
				},
			})) ||
			(await prisma.userRelationRole.create({
				data: {
					userId: user.id,
					roleName: "USER",
				},
			}));
		const message = roleData.roleName;
		res.status(200).json({ statusCode: 200, message });
	}
}
export const config = {
	runtime: "edge",
};
