import { NewPostReq, NewPostRes } from "types/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { newPostService } from "%/api/prisma/service/newPost.service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data: NewPostReq = await req.json();
  const session = await getServerSession(authOptions);
  let returnData: NewPostRes = { statusCode: 401, message: "error" };
  if (session) {
    await newPostService(session, data);
    returnData = { statusCode: 200, message: "newPost" };
  }
  return NextResponse.json(returnData);
}
