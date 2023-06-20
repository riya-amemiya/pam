import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getRoleService } from "../service/getRole.service";
import { NextResponse } from "next/server";
import { GetRoleRes } from "types/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  let returnData: GetRoleRes = { statusCode: 401, role: null };
  if (session) {
    const role = await getRoleService(session);
    returnData = { statusCode: 200, role };
  }
  return NextResponse.json(returnData);
}
