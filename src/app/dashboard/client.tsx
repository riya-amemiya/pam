"use client";
import useSWRMutation from "swr/mutation";
import { fetcherPost } from "@/lib/fetcherPost";
import Avatar from "@mui/material/Avatar";
import { GetUserDataRes } from "types/prisma/getUserDataType";
import {
  UpdateUserDataReq,
  UpdateUserDataRes,
} from "types/prisma/updateUserDataType";
import { useRouter } from "next/navigation";
import { Box } from "@kuma-ui/core";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import * as z from "zod";

export const DashboardClient = ({
  data: userData,
}: { data: GetUserDataRes }) => {
  const { trigger: updateUserData } = useSWRMutation(
    "/api/prisma/updateUserData",
    fetcherPost<UpdateUserDataReq, UpdateUserDataRes>,
  );
  const router = useRouter();
  return (
    <div>
      <Box alignItems={"center"} display={"flex"}>
        <div>
          <Avatar
            src={userData.user?.image as string}
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
            description: "OpenAIのAPIキーを入力してください",
            inputProps: {
              type: "password",
              defaultValue: userData.user?.OPENAI_API_KEY
                ? decodeURIComponent(atob(userData.user?.OPENAI_API_KEY))
                : "",
            },
          },
        }}
        formSchema={z.object({
          GitHub: z.string().optional(),
          OPENAI_API_KEY: z.string().optional(),
        })}
        onSubmit={async (e) => {
          await updateUserData({
            GitHub: e.GitHub,
            OPENAI_API_KEY:
              e.OPENAI_API_KEY && btoa(encodeURIComponent(e.OPENAI_API_KEY)),
          });
          router.refresh();
        }}
      >
        <div>
          <div className="flex justify-center">
            <AutoFormSubmit>Submit</AutoFormSubmit>
          </div>
        </div>
      </AutoForm>
    </div>
  );
};
