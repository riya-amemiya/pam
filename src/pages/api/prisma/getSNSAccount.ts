import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { getSNSAccountService } from "./service/getSNSAccount.service";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const session = await getServerSession(req, res, authOptions);
	if (session) {
		const { GitHub } = await getSNSAccountService(session);
		res.status(200).json({ statusCode: 200, github: GitHub });
	}
}
