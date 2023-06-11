import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { getPostService } from "./service/getPost.service";
import type { GetPostRes } from "types/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const data = await getPostService(session);
    const returnData: GetPostRes = { statusCode: 200, data };
    res.status(200).json(returnData);
  }
}
