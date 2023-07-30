import { customAlphabet } from "nanoid/non-secure";

export const randomString = (n: number) =>
  customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    n,
  )();
