import { atom } from "recoil";

export const openaiConfigState = atom<{
  temperature: number;
  max_tokens: number;
}>({
  key: "openaiConfigState",
  default: {
    temperature: 0.5,
    max_tokens: 500,
  },
});
