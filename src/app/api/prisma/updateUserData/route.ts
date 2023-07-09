import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { updateUserDataService } from "%/api/prisma/service/updateUserData.service";
import {
  UpdateUserDataReq,
  UpdateUserDataRes,
} from "types/prisma/updateUserDataType";

export async function POST(req: Request) {
  const data: UpdateUserDataReq = await req.json();
  const session = await getServerSession(authOptions);
  let returnData: UpdateUserDataRes = { statusCode: 401 };
  if (session) {
    await updateUserDataService(session, data);
    returnData = { statusCode: 200 };
  }
  return NextResponse.json(returnData);
}
