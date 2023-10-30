import { StreamingTextResponse } from "ai";

import { openAIChat } from "./openai";

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(
  request: Request,
  { params }: { params: { model: string } },
) {
  const model = params.model;
  const apiKey = request.headers.get("authorization") || "";
  // Extract the `messages` from the body of the request
  const { messages, temperature, max_tokens } = await request.json();

  if (model.includes("gpt")) {
    return new StreamingTextResponse(
      await openAIChat({ apiKey, model, messages, temperature, max_tokens }),
    );
  }
  throw new Error("Model not supported");
}
