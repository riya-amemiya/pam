import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { getRoleService } from "./service/getRole.service";
import type { GetRoleRes } from "types/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const { roleName } = await getRoleService(session);
    const returnData: GetRoleRes = { statusCode: 200, roleName };
    res.status(200).json(returnData);
  }
}
