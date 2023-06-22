"use client";

import { Button } from "@/stories/Button";
import { parseMarkdown } from "@/utils/parseMarkdown";
import TextField from "@mui/material/TextField";
import { useChat } from "ai/react";
import { useEffect, useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.min.css";

export default function Chat() {
  const [model, _setModel] = useState("gpt-3.5-turbo-16k");
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: `/api/chat/${model}`,
  });
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <div>
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
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
}
