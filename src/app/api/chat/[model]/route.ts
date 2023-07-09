import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(
  req: Request,
  { params }: { params: { model: string } },
) {
  const model = params.model;
  // Extract the `messages` from the body of the request
  const { messages, apiKey } = await req.json();

  const config = new Configuration({
    apiKey,
  });

  const openai = new OpenAIApi(config);
  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model,
    stream: true,
    messages,
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
