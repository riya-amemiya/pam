import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { setSNSAccountService } from "./service/setSNSAccount.service";
import type { SetSNSAccountReq } from "types/prismaType";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const data: SetSNSAccountReq = JSON.parse(req.body);
	const session = await getServerSession(req, res, authOptions);
	if (session) {
		await setSNSAccountService(session, data);
		res.status(200).json({ statusCode: 200 });
	}
}
