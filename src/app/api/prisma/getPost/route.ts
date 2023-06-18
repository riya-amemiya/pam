import { getServerSession } from "next-auth";

import { getPostService } from "../service/getPost.service";
import type { GetPostRes } from "types/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  let returnData: GetPostRes = { statusCode: 401, post: null };
  if (session) {
    const post = await getPostService(session);
    returnData = { statusCode: 200, post };
  }
  return NextResponse.json(returnData);
}
