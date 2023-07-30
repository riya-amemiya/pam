import { OpenAIStream } from "ai";
import {
  ChatCompletionRequestMessage,
  Configuration,
  OpenAIApi,
} from "openai-edge";

export const openAIChat = async ({
  apiKey,
  model,
  messages,
  temperature = 0.5,
  max_tokens,
}: {
  apiKey: string;
  model: string;
  temperature: number;
  messages: ChatCompletionRequestMessage[];
  max_tokens: number;
}) => {
  const config = new Configuration({
    apiKey,
  });

  const openai = new OpenAIApi(config);

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model,
    stream: true,
    messages,
    temperature,
    max_tokens,
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  return stream;
};
