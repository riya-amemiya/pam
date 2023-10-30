"use client";
import { Box, Flex } from "@kuma-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import TuneIcon from "@mui/icons-material/Tune";
import MuiBox from "@mui/material/Box";
import MuiButton from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { SxProps, Theme } from "@mui/material/styles";
import { useChat } from "ai/react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRecoilState } from "recoil";
import useSWRMutation from "swr/mutation";
import z from "zod";

import { messagesState } from "@/atom/messagesState";
import { openaiConfigState } from "@/atom/openaiConfigState";
import AutoForm from "@/components/ui/auto-form";
import { Button } from "@/stories/atoms/Button";
import { parseMarkdown } from "@/utils/parseMarkdown";
import { randomString } from "@/utils/randomString";

const style: SxProps<Theme> = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const fetcher = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      apiKey: string;
      text: string;
      target_language?: string | undefined;
      source_language?: string | null | undefined;
    };
  },
): Promise<{ status: "success" | "fail"; text: string }> =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: arg.apiKey,
    },
    body: JSON.stringify({
      text: arg.text,
      target_language: arg.target_language,
      source_language: arg.source_language,
    }),
  }).then((response) => response.json());

export default function ChatClient({
  OPENAI_API_KEY,
  EDEN_AI_API_KEY,
}: { OPENAI_API_KEY: string | null; EDEN_AI_API_KEY: string | null }) {
  const [model, setModel] = useState("none");
  const [messages, setMessages] = useRecoilState(messagesState);
  const [openaiConfig, setOpenaiConfig] = useRecoilState(openaiConfigState);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { trigger: callDeepl } = useSWRMutation("/api/deepl", fetcher);
  const {
    messages: messagesResponse,
    input,
    handleInputChange,
    handleSubmit,
    setMessages: setMessagesResponse,
  } = useChat({
    api: `/api/chat/${model}`,
    body: {
      temperature: openaiConfig.temperature,
      max_tokens: openaiConfig.max_tokens,
    },
    headers: {
      Authorization: OPENAI_API_KEY || "",
    },
  });
  useEffect(() => {
    setMessagesResponse(messages);
  }, [model]);
  useEffect(() => {
    setMessages(messagesResponse);
  }, [messagesResponse]);
  return (
    <>
      <Flex alignItems={"center"} flexDir={"column"}>
        <div className="w-3/4 md:w-1/2">
          <Select
            className="w-full"
            onChange={(event) => {
              setModel(event.target.value as string);
            }}
            value={model}
          >
            <MenuItem value="none">選択してください</MenuItem>
            {["gpt-3.5-turbo", "gpt-3.5-turbo-16k", "gpt-4", "deepl"].map(
              (m) => (
                <MenuItem key={m} value={m}>
                  {m}
                </MenuItem>
              ),
            )}
          </Select>
        </div>
        <div className="w-3/4 md:w-1/2">
          {messagesResponse.map((m) => (
            <div key={m.id}>
              {m.role}: {parseMarkdown(m.content)}
            </div>
          ))}

          <form
            onSubmit={async (event): Promise<false | void> => {
              event.preventDefault();
              if (model === "none") {
                toast.error("モデルを選択してください");
                return false;
              }
              if (model === "deepl") {
                if (!EDEN_AI_API_KEY) {
                  toast.error("deeplは現在使用できません");
                  return;
                }
                const callback = async () => {
                  const response = await callDeepl({
                    apiKey: EDEN_AI_API_KEY,
                    text: input,
                  });
                  if (response.status === "success") {
                    setMessagesResponse([
                      ...messagesResponse,
                      { id: randomString(7), role: "user", content: input },
                      {
                        id: randomString(7),
                        role: "assistant",
                        content: response.text,
                      },
                    ]);
                  }
                };
                toast.promise(callback(), {
                  loading: "翻訳中...",
                  success: "翻訳しました",
                  error: "翻訳に失敗しました",
                });

                return false;
              }
              handleSubmit(event);
            }}
          >
            <Flex>
              <Box height="3.5rem" width="85%">
                <TextField
                  className="w-full h-full"
                  multiline={true}
                  onChange={handleInputChange}
                  placeholder="Say something..."
                  value={input}
                />
              </Box>
              <Box height="3.5rem" width="15%">
                <Flex
                  alignItems="center"
                  height="100%"
                  justify="center"
                  width="100%"
                >
                  <MuiButton
                    className="w-full h-full text-white bg-blue-500 hover:bg-blue-700"
                    type="submit"
                  >
                    <SendIcon />
                  </MuiButton>
                </Flex>
              </Box>
            </Flex>
          </form>
          <Flex alignItems="center" justify="center" mt="0.5rem">
            <Button
              className="w-1/2 bg-blue-500 hover:bg-blue-700"
              onClick={handleOpen}
            >
              <TuneIcon />
            </Button>
            <Button
              className="w-1/2 bg-blue-500 hover:bg-blue-700"
              onClick={() => {
                setMessages([]);
                setMessagesResponse([]);
              }}
            >
              <DeleteIcon />
            </Button>
          </Flex>
        </div>
      </Flex>
      <Modal onClose={handleClose} open={open}>
        <MuiBox sx={style}>
          <AutoForm
            fieldConfig={{
              temperature: {
                description: "0.0から1.0の間で入力してください",
                inputProps: {
                  type: "range",
                  step: 0.1,
                  defaultValue: openaiConfig.temperature,
                  value: openaiConfig.temperature,
                  onChange: (event) => {
                    setOpenaiConfig((previous) => {
                      return {
                        ...previous,
                        temperature: Number(event.target.value),
                      };
                    });
                  },
                  min: 0.1,
                  max: 1,
                },
              },
              max_tokens: {
                description: "最大トークン数を入力してください",
                inputProps: {
                  type: "number",
                  defaultValue: openaiConfig.max_tokens,
                  value: openaiConfig.max_tokens,
                  onChange: (event) => {
                    setOpenaiConfig((previous) => {
                      return {
                        ...previous,
                        max_tokens: Number(event.target.value),
                      };
                    });
                  },
                },
              },
            }}
            formSchema={z.object({
              temperature: z
                .number()
                .min(0.1)
                .max(1)
                .step(0.1)
                .optional()
                .default(0.5)
                .describe(`Temperature: ${openaiConfig.temperature}`),
              max_tokens: z.number().optional().describe("max_tokens"),
            })}
            onSubmit={async (event) => {
              setOpenaiConfig((previous) => {
                return {
                  ...previous,
                  temperature: event.temperature,
                };
              });
              toast.success("保存しました");
            }}
          />
          <Button
            className="bg-blue-500 hover:bg-blue-700 w-full"
            onClick={handleClose}
          >
            閉じる
          </Button>
        </MuiBox>
      </Modal>
      <Toaster />
    </>
  );
}
