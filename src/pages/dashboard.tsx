import Layout from "@/components/Layout";
import {
  NewPostReq,
  NewPostRes,
  SetSNSAccountReq,
  SetSNSAccountRes,
} from "types/prisma";
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { fetcherPost } from "@/lib/fetcherPost";
import { DateWrapper } from "umt/module/Date/DateWrapper";
import TextField from "@mui/material/TextField";
import { Button } from "@/stories/Button";
import { useSWRConfig } from "swr";
import { GetUserDataRes } from "types/prisma/getUserDataType";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

const Dashboard = ({
  data: userData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { trigger: newPost } = useSWRMutation(
    "/api/prisma/newPost",
    fetcherPost<NewPostReq, NewPostRes>,
  );
  const { trigger: setSNSAccount, isMutating: isSetSNSAccountLoading } =
    useSWRMutation(
      "/api/prisma/setSNSAccount",
      fetcherPost<SetSNSAccountReq, SetSNSAccountRes>,
    );
  const { mutate: mutateGetUserData } = useSWRConfig();
  const [count, setCount] = useState(0);
  const now = new DateWrapper().getDateObj();
  return (
    <Layout loading={isSetSNSAccountLoading} title="ダッシュボード">
      <p>ようこそ, {userData.user?.email}</p>
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
        <li>ユーザー: {userData.user?.name}</li>
        <li>
          {now.year}年{now.month}月{now.day}日 {now.hour}:{now.minute}
        </li>
      </ul>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const target = e.target as typeof e.target & {
            GitHub?: { value: string };
          };
          await setSNSAccount({
            GitHubLink: target.GitHub?.value || "",
          });
          await mutateGetUserData("/api/prisma/getUserData");
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

export const getServerSideProps: GetServerSideProps<{ data: GetUserDataRes }> =
  async ({ res, req }) => {
    const session = await getServerSession(req, res, authOptions);
    let returnData: GetUserDataRes = {
      statusCode: 401,
      user: null,
    };
    if (session) {
      const user = await prisma.user.findFirstOrThrow({
        where: {
          email: session.user?.email,
        },
        include: {
          Post: true,
          UserRelationRole: true,
        },
      });

      if (session) {
        returnData = {
          ...{
            user: {
              ...user,
              role: user.UserRelationRole,
              post: user.Post,
            },
          },
          statusCode: 200,
        };
      }
    }
    return {
      props: {
        data: {
          ...JSON.parse(JSON.stringify(returnData)),
        },
      },
    };
  };
