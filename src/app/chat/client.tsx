"use client";

import { Button } from "@/stories/Button";
import { parseMarkdown } from "@/utils/parseMarkdown";
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
      <div className="flex flex-col items-center">
        <div className="w-1/2 md:w-1/3">
          <Select
            className="w-full"
            value={model}
            onChange={(e) => {
              setModel(e.target.value as string);
            }}
          >
            <MenuItem value="gpt-3.5-turbo">gpt-3.5-turbo</MenuItem>
            <MenuItem value="gpt-3.5-turbo-16k">gpt-3.5-turbo-16k</MenuItem>
            <MenuItem value="gpt-4">gpt-4</MenuItem>
          </Select>
        </div>
        <div className="w-1/2 md:w-1/3">
          {messages.map((m) => (
            <div key={m.id}>
              {m.role}: {parseMarkdown(m.content)}
            </div>
          ))}

          <form onSubmit={handleSubmit}>
            <TextField
              multiline={true}
              onChange={handleInputChange}
              placeholder="Say something..."
              value={input}
              className="w-full"
            />
            <Button type="submit" className="w-full">
              Send
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
