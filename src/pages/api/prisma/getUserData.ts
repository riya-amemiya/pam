import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { getUserDataService } from "./service/getUserData.service";
import { GetUserDataRes } from "types/prisma/getUserDataType";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const data: GetUserDataRes = await getUserDataService(session);
    res.status(200).json(data);
  }
}
