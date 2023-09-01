import { StreamingTextResponse } from "ai";

import { openAIChat } from "./openai";

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(
  req: Request,
  { params }: { params: { model: string } },
) {
  const model = params.model;

  // Extract the `messages` from the body of the request
  const { messages, apiKey, temperature, max_tokens } = await req.json();

  if (model.indexOf("gpt") !== -1) {
    return new StreamingTextResponse(
      await openAIChat({ apiKey, model, messages, temperature, max_tokens }),
    );
  } else {
    throw new Error("Model not supported");
  }
}
