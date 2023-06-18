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
  const { data: userData, isLoading: isGetUserDataLoading } = useSWR(
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
      <p>ようこそ, {session ? session?.user?.email : "loading.."}</p>
      <Button
        onClick={() => {
          setCount(count + 1);
          newPost({ title: "Test", content: "Test" });
        }}
      >
        newPost
      </Button>
      <ul>
        <li>カウント: {count}</li>
        <li>
          ロール:{" "}
          {(userData &&
            userData?.statusCode === 200 &&
            userData?.user.role[0]?.roleName) ||
            "loading..."}
        </li>
        <li>ステータス: {status}</li>
        <li>ユーザー: {session?.user?.name || "loading..."}</li>
        <li>
          {now.year}年{now.month}月{now.day}日 {now.hour}:{now.minute}
        </li>
      </ul>

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
        {userData && userData?.statusCode === 200 && userData.user.GitHub && (
          <TextField
            className="text-blue-500"
            defaultValue={userData.user?.GitHub || ""}
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
