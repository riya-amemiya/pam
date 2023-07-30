import { atom } from "recoil";
import type { Message } from "ai/react";

export const messagesState = atom<Message[]>({
  key: "messagesState",
  default: [],
});
