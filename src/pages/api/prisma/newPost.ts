import { NewPostReq, NewPostRes } from "types/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { newPostService } from "./service/newPost.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const data: NewPostReq = JSON.parse(req.body);
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    await newPostService(session, data);
    const returnData: NewPostRes = { statusCode: 200, message: "newPost" };
    res.status(200).json(returnData);
  }
}
