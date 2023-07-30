import { microcmsClient } from "@/lib/microcmsClient";
import { microcmsCardsType } from "types/microcmsCardsType";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(
  req: Request,
  { params }: { params: { endpoint: string } },
) {
  const { queries } = await req.json();
  const endpoint = params.endpoint;
  const data: microcmsCardsType = await microcmsClient.get({
    endpoint,
    queries,
  });
  return NextResponse.json(data);
}
