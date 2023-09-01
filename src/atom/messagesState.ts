import type { Message } from "ai/react";
import { atom } from "recoil";

export const messagesState = atom<Message[]>({
  key: "messagesState",
  default: [],
});
