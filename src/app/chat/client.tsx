"use client";
import { Button } from "@/stories/Button";
import { parseMarkdown } from "@/utils/parseMarkdown";
import { Flex } from "@kuma-ui/core";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useChat } from "ai/react";
import { useState } from "react";

export default function ChatClient({ apiKey }: { apiKey: string | null }) {
  const [model, setModel] = useState("gpt-3.5-turbo-16k");
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: `/api/chat/${model}`,
    body: {
      apiKey,
    },
  });

  return (
    <>
      <Flex alignItems={"center"} flexDir={"column"}>
        <div className="w-3/4 md:w-1/2">
          <Select
            className="w-full"
            onChange={(e) => {
              setModel(e.target.value as string);
            }}
            value={model}
          >
            <MenuItem value="gpt-3.5-turbo">gpt-3.5-turbo</MenuItem>
            <MenuItem value="gpt-3.5-turbo-16k">gpt-3.5-turbo-16k</MenuItem>
            <MenuItem value="gpt-4">gpt-4</MenuItem>
          </Select>
        </div>
        <div className="w-3/4 md:w-1/2">
          {messages.map((m) => (
            <div key={m.id}>
              {m.role}: {parseMarkdown(m.content)}
            </div>
          ))}

          <form onSubmit={handleSubmit}>
            <TextField
              className="w-full"
              multiline={true}
              onChange={handleInputChange}
              placeholder="Say something..."
              value={input}
            />
            <Button className="w-full" type="submit">
              Send
            </Button>
          </form>
        </div>
      </Flex>
    </>
  );
}
