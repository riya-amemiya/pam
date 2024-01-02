"use client";
import { Box, Flex } from "@kuma-ui/core";
import Avatar from "@mui/material/Avatar";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import z from "zod";

import { updateUserData } from "%/actions/updateUserData";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";

export const DashboardClient = ({
  data: userData,
}: {
  data: {
    user: {
      EDEN_AI_API_KEY: string | null;
      GitHub: string | null;
      OPENAI_API_KEY: string | null;
      avatar_url: string | null;
      name: string | null;
      id: string;
    };
  };
}) => {
  const router = useRouter();
  return (
    <div>
      <Box alignItems={"center"} display={"flex"}>
        <div>
          <Avatar
            src={userData.user?.avatar_url || ""}
            sx={{
              width: 100,
              height: 100,
            }}
          />
        </div>
        <div>
          <h1 className="text-4xl">{userData.user?.name}</h1>
        </div>
      </Box>
      <AutoForm
        fieldConfig={{
          GitHub: {
            description: "GitHubのユーザー名を入力してください",
            inputProps: {
              defaultValue: userData.user?.GitHub || "",
            },
          },
          OPENAI_API_KEY: {
            description: "sk-から始まるAPIキーを入力してください",
            inputProps: {
              type: "password",
              defaultValue: userData.user?.OPENAI_API_KEY
                ? decodeURIComponent(atob(userData.user?.OPENAI_API_KEY))
                : "",
            },
          },
          EDEN_AI_API_KEY: {
            description: "edenaiのapiキーを入力してください",
            inputProps: {
              type: "password",
              autoComplete: "new-password",
              defaultValue: userData.user?.EDEN_AI_API_KEY
                ? decodeURIComponent(atob(userData.user?.EDEN_AI_API_KEY))
                : "",
            },
          },
        }}
        formSchema={z.object({
          GitHub: z.string().optional().describe("GitHub"),
          OPENAI_API_KEY: z.string().optional().describe("OPENAI_API_KEY"),
          EDEN_AI_API_KEY: z.string().optional().describe("EDEN_AI_API_KEY"),
        })}
        onSubmit={(event) => {
          const callback = async () => {
            await updateUserData({
              id: userData.user.id,
              GitHub: event.GitHub,
              OPENAI_API_KEY:
                event.OPENAI_API_KEY &&
                btoa(encodeURIComponent(event.OPENAI_API_KEY)),
              EDEN_AI_API_KEY:
                event.EDEN_AI_API_KEY &&
                btoa(encodeURIComponent(event.EDEN_AI_API_KEY)),
            });
            router.refresh();
          };
          toast.promise(callback(), {
            loading: "送信中...",
            success: "送信しました",
            error: "送信に失敗しました",
          });
        }}
      >
        <div>
          <Flex justify="center">
            <AutoFormSubmit>Submit</AutoFormSubmit>
          </Flex>
        </div>
      </AutoForm>
      <Toaster />
    </div>
  );
};
