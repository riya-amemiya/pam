import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { getRoleService } from "./service/getRole.service";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const session = await getServerSession(req, res, authOptions);
	if (session) {
		const { roleName } = await getRoleService(session);
		res.status(200).json({ statusCode: 200, message: roleName });
	}
}
