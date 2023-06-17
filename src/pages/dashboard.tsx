import Layout from "@/components/Layout";
import {
  NewPostReq,
  NewPostRes,
  SetSNSAccountReq,
  SetSNSAccountRes,
} from "types/prisma";
import { useSession } from "next-auth/react";
import { NextPage } from "next/types";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { fetcherPost } from "@/lib/fetcherPost";
import { fetcherGet } from "@/lib/fetcherGet";
import { DateWrapper } from "umt/module/Date/DateWrapper";
import TextField from "@mui/material/TextField";
import { Button } from "@/stories/Button";
import useSWR from "swr";
import { GetUserDataRes } from "types/prisma/getUserDataType";

const Dashboard: NextPage = () => {
  const { data: session, status } = useSession();
  const { trigger: newPost } = useSWRMutation(
    "/api/prisma/newPost",
    fetcherPost<NewPostReq, NewPostRes>,
  );
  const { trigger: setSNSAccount, isMutating: isSetSNSAccountLoading } =
    useSWRMutation(
      "/api/prisma/setSNSAccount",
      fetcherPost<SetSNSAccountReq, SetSNSAccountRes>,
    );
  const { data: user, isLoading: isGetUserDataLoading } = useSWR(
    "/api/prisma/getUserData",
    fetcherGet<GetUserDataRes>,
  );
  const [count, setCount] = useState(0);
  const now = new DateWrapper().getDateObj();
  return (
    <Layout
      looding={isSetSNSAccountLoading || isGetUserDataLoading}
      title="ダッシュボード"
    >
      <h1 className="animate__animated animate__backInLeft">Dashboard</h1>
      <p>ようこそ, {session ? session?.user?.email : "loading.."}</p>
      <Button
        onClick={() => {
          setCount(count + 1);
          newPost({ title: "Test", content: "Test" });
        }}
      >
        newPost
      </Button>
      <p>カウント: {count}</p>
      <p>ロール: {user?.role[0]?.roleName || "loading..."}</p>
      <p>ステータス: {status}</p>
      <p>ユーザー: {session?.user?.name || "loading..."}</p>
      <p>
        {now.year}年{now.month}月{now.day}日 {now.hour}:{now.minute}
      </p>
      <form
        onSubmit={(e) => {
          const target = e.target as typeof e.target & {
            GitHub?: { value: string };
          };
          setSNSAccount({
            GitHubLink: target.GitHub?.value || "",
          });
        }}
      >
        {user?.GitHub && (
          <TextField
            className="text-blue-500"
            defaultValue={user?.GitHub || ""}
            name="GitHub"
            placeholder="GitHub Account Name"
            type="text"
          />
        )}

        <Button size="large" type="submit">
          Submit
        </Button>
      </form>
    </Layout>
  );
};

export default Dashboard;
