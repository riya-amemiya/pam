import { NextResponse } from "next/server";

import { microcmsClient } from "@/lib/microcmsClient";
import { microcmsCardsType } from "types/microcmsCardsType";

export const runtime = "edge";

export async function POST(
  request: Request,
  { params }: { params: { endpoint: string } },
) {
  const { queries } = await request.json();
  const endpoint = params.endpoint;
  const data: microcmsCardsType = await microcmsClient.get({
    endpoint,
    queries,
  });
  return NextResponse.json(data);
}
